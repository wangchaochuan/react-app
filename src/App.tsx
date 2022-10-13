import { memo, FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/es/locale/zh_CN';
import Main from '@/routes/entry';
import 'moment/locale/zh-cn'; // 手动引入中文语言包
moment.locale('zh-cn');

/* mock */
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('@mocks/browser');
  worker.start();
}

const App: FC<{ basename?: string }> = ({ basename = '/' }) => {
  return (
    <ConfigProvider locale={zh_CN} virtual={false}>
      <BrowserRouter basename={basename}>
        <Suspense fallback={null}>
          <Main />
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default memo(App);
