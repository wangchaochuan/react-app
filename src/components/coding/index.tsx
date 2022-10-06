import { memo, FC } from 'react';
import codingImage from '@assets/images/coding.png';
import styles from './index.module.scss';

const Coding: FC<{ title?: string }> = ({ title }) => {
  return (
    <div className={styles['coding-container']}>
      <div className={styles['image-container']}>
        <img src={codingImage} alt="coding" className={styles.image} />
        <div className={styles.title}>{title}</div>
        <div className={styles.coding}>正在开发中…</div>
      </div>
    </div>
  );
};

export default memo(Coding);
