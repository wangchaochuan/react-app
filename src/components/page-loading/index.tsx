import { Spin } from 'antd';
import { memo } from 'react';
import styles from './index.module.scss';

const PageLoading = () => (
  <>
    <Spin spinning={true}>
      <div className={styles['whole']}></div>
    </Spin>
  </>
);

export default memo(PageLoading);
