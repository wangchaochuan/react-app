import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from 'antd';
import { dayOfYear, byteSize, isBrowser } from 'wangcc-utils';
import { fetchAuthInfo } from '@/services/user';
import styles from './index.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();
  const jump = () => {
    navigate('/product');
  };
  useEffect(() => {
    console.log(1111222);
    console.log(dayOfYear(), byteSize('wang'), isBrowser());
    fetchAuthInfo().then(res => {
      console.info(res.data);
    });
  }, []);
  return (
    <div className={styles.home}>
      <Select size="large" placeholder="请选择" style={{ width: '200px', marginBottom: '8px' }}>
        <Select.Option value={1}>北京市</Select.Option>
        <Select.Option value={2}>上海市</Select.Option>
        <Select.Option value={3}>广州市</Select.Option>
        <Select.Option value={4}>深圳市</Select.Option>
      </Select>
      <Input size="large" placeholder="请输入" />
      <div className={styles.header}>react app home</div>
      <Button size="large" onClick={jump.bind(null)}>
        跳转
      </Button>
    </div>
  );
};

export default Home;
