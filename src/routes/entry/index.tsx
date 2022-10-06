import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from '@constants/route';
import Layout from '@routes/entry/layout';
import SuspenseWrap from '@components/suspense-wrap';

const Home = lazy(() => import('@routes/home'));
const Product = lazy(() => import('@routes/product'));
const CommonDemo = lazy(() => import('@routes/common-demo'));
const ThemeDemo = lazy(() => import('@routes/theme-demo'));

const Main = () => {
  return (
    <Routes>
      <Route path={`${ROUTES.INDEX}*`} element={<SuspenseWrap render={<Layout />}></SuspenseWrap>}>
        <Route path={`${ROUTES.HOME}`} element={<SuspenseWrap render={<Home />} />}></Route>
        <Route path={`${ROUTES.PRODUCT}`} element={<SuspenseWrap render={<Product />} />}></Route>
        <Route path={`${ROUTES.COMMON_DEMO}/*`} element={<SuspenseWrap render={<CommonDemo />} />} />
        <Route path={`${ROUTES.THEME_DEMO}/*`} element={<SuspenseWrap render={<ThemeDemo />} />}></Route>
        <Route index element={<Navigate to={ROUTES.HOME} replace />}></Route>
      </Route>
    </Routes>
  );
};

export default Main;
