import { FC } from 'react';
import { Button, Input } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { dayOfYear } from 'wangcc-utils';

const Home: FC = () => {
  const navigate = useNavigate();
  const jump = () => {
    navigate('/product');
  };
  console.log(dayOfYear());
  return (
    <div className={styles.home}>
      <Input size="large" placeholder="请输入" />
      <div className={styles.header}>react app home</div>
      <Button size="large" onClick={jump}>
        跳转
      </Button>
    </div>
  );
};

export default Home;
