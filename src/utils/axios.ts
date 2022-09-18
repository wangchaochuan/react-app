import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { message } from 'antd';

const createAxios = (config?: AxiosRequestConfig) => {
  const instance: AxiosInstance = Axios.create({
    ...config,
    headers: {
      auth: localStorage.getItem('token') ?? '',
      ...(config ? config.headers : {}),
    },
  });
  instance.interceptors.response.use(
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
};

export default createAxios;

// baseurl
const SERVICE_ENDPOINT = 'http://localhost:8080'; // 实际使用过程中为后端接口地址
const baseURL = `${SERVICE_ENDPOINT}/api/ioc-main/v1`;

export const baseAxios = createAxios({ baseURL, timeout: 1000 * 10 });
