import { FC, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@constants/route';
import styles from './header.module.scss';

const Header: FC = () => {
  const routes = [
    { path: `/${ROUTES.Home}`, name: '主页' },
    { path: `/${ROUTES.Product}`, name: '产品' },
  ];
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
