import { FC } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();
  const jump = () => {
    navigate('/product');
  };
  return (
    <div className={styles.home}>
      <div className={styles.header}>react app home</div>
      <Button size="large" onClick={jump}>
        跳转
      </Button>
    </div>
  );
};

export default Home;
