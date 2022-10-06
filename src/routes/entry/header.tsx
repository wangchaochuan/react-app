import { FC, Fragment, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/route';
import { isInMicroApp } from '@/utils';
import styles from './header.module.scss';

const Header: FC = () => {
  const location = useLocation();
  const routes = [
    { path: `/${ROUTES.HOME}`, name: '主页' },
    { path: `/${ROUTES.PRODUCT}`, name: '产品' },
  ];
  const shouldHideHeader = useMemo<boolean>(() => {
    const pathname = location.pathname;
    if (pathname.includes(ROUTES.COMMON_DEMO) || pathname.includes(ROUTES.THEME_DEMO)) {
      return true;
    }
    return false;
  }, [location.pathname]);
  if (isInMicroApp || shouldHideHeader) {
    return null;
  }
  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.nav}>
        {routes.map(({ path, name }) => {
          return (
            <Fragment key={path}>
              <NavLink to={path} className={({ isActive }) => (isActive ? styles.active : '')}>
                {name}
              </NavLink>
            </Fragment>
          );
        })}
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Header;
