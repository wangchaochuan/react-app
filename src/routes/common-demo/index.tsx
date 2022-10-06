import { useRoutes } from 'react-router-dom';
import { transformToRoutes } from '@routes/common-demo/index.helpers';
import CommonDemoLayout, { modules } from './layout';

// 暂时把路由只有一层；
const CommonDemo = () => {
  const childrenRoutes = transformToRoutes(modules);
  const element = useRoutes([
    {
      path: '/',
      element: <CommonDemoLayout />,
      children: childrenRoutes,
    },
  ]);

  return element;
};

export default CommonDemo;
