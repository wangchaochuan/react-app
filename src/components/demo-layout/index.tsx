import { Fragment, ReactNode, memo } from 'react';
import styles from './index.module.scss';

export const ObjectToArrayJSX = (item: { [key: string]: string | number | number | null | undefined }) =>
  Object.entries(item).map(([key, value]: any, index: number) => {
    return (
      <Fragment key={index}>
        <b>{key}:</b>&nbsp;
        <i>{value};</i> &nbsp;&nbsp;&nbsp;
      </Fragment>
    );
  });

const Layout = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className={styles['layout']}>
      <h1>
        <strong>{title}</strong>
      </h1>
      <h4>
        <pre>{children}</pre>
      </h4>
    </div>
  );
};

export default memo(Layout);
