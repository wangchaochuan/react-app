import { Outlet } from 'react-router-dom';
import Header from '@routes/entry/header';
import styles from './layout.module.scss';
const Layout = () => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
