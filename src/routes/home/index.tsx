import { FC } from 'react';
import { Button, Input, Select } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { dayOfYear, byteSize, isBrowser } from 'wangcc-utils';

const Home: FC = () => {
  const navigate = useNavigate();
  const jump = () => {
    navigate('/product');
  };
  console.log(dayOfYear(), byteSize('wang'), isBrowser());
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
      <Button size="large" onClick={jump}>
        跳转
      </Button>
    </div>
  );
};

export default Home;
