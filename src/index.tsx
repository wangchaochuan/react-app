import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import reportWebVitals from '@/reportWebVitals';
import { isInMicroApp } from '@/utils';
import 'moment/locale/zh-cn';
import '@/index.scss';
import '@/public-path';

function render(root: ReactDOM.Root, basename: string) {
  root.render(
    <React.StrictMode>
      <App basename={basename} />
    </React.StrictMode>
  );
}

// 独立运行时
if (!isInMicroApp) {
  const root = ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement);
  render(root, '/');

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

type TMicroAppProps = {
  entry: string;
  name: string;
  basename: string;
  container: HTMLDivElement;
  appName: string;
};

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react-app bootstrap');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: TMicroAppProps) {
  const { container, basename } = props;
  console.log('react-app mounted', props, basename);
  const el = container ? container.querySelector('#react-root') : document.getElementById('react-root');
  if (el) {
    const root = ReactDOM.createRoot(el);
    render(root, basename);
  }
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount({ container }: TMicroAppProps) {
  console.log('react-app unmount');
  const el = container ? container.querySelector('#root') : document.getElementById('root');
  if (el) {
    const root = ReactDOM.createRoot(el!);
    root.unmount();
  }
}
