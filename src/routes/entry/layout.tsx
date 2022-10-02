import { Outlet } from 'react-router-dom';
import classnames from 'classnames';
import Header from '@routes/entry/header';
import { isInMicroApp } from '@/utils';
import styles from './layout.module.scss';
const Layout = () => {
  return (
    <div className={classnames(styles.main, isInMicroApp && styles['in-micro'])}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
