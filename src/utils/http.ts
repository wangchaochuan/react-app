import axios from 'axios';
import { message } from 'antd';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfig, RequestInterceptors } from '@/types/http';

/* 
这里将其封装为一个类，而不是一个函数的原因是因为类可以创建多个实例，适用范围更广，封装性更强一些。 
我们的拦截器的执行顺序为实例请求→类请求→实例响应→类响应；这样我们就可以在实例拦截上做出一些不同的拦截，
*/
class Http {
  // axios实例
  instance: AxiosInstance;
  // 实例拦截器对象
  interceptorsObj?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        const token = localStorage.getItem('token') ?? '';
        request.headers = {
          token,
          ...(request?.headers ?? {}),
        };
        return request;
      },
      (error: AxiosRequestConfig) => {
        console.error(error);
      }
    );
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 状态值为200
      (response: AxiosResponse) => {
        const { data, config } = response;
        // 非正常的返回值
        if (data?.resultCode && data.resultCode !== 0) {
          const errorMsg = data?.resultMessage || '服务异常';
          if (!(config as { silence: boolean })?.silence) {
            message.error(errorMsg);
          }
          return Promise.reject({
            code: -1,
            resultMessage: errorMsg,
          });
        }
        return data;
      },
      // 状态值为其他
      async ({ config, message: errMsg, response }) => {
        const { status, data } = response || {};
        let errorMsg: string = errMsg;
        if (status === 500) {
          errorMsg = '服务异常';
        } else if (status === 401) {
          errorMsg = '暂无权限';
        } else if (status === 403) {
          errorMsg = '未登录';
        } else if (status === 404) {
          errorMsg = '请求的资源不存在';
        } else if (data && data.resultMessage) {
          // 后端统一错误信息字段
          errorMsg = data.resultMessage;
        }
        // 如果没有配置静默模式,则弹出报错信息
        if (!config?.silence) {
          message.error(errorMsg);
        }

        return Promise.reject({
          code: -1,
          data: null,
          resultMessage: errorMsg,
        });
      }
    );
  }
  request(config: AxiosRequestConfig) {
    this.instance.request(config);
  }
}

export default Http;
// 一般情况下,全局拦截器就已经够用了
export const baseAxios = new Http({ baseURL: 'http://localhost:8000', timeout: 1000 * 10 });
