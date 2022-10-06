import { Checkbox as AntdCheckbox } from 'antd';
import classNames from 'classnames';
import { memo } from 'react';
import styles from './index.module.scss';

const CheckboxGroup = ({ className, ...props }: any) => {
  return <AntdCheckbox.Group className={classNames(styles['checkbox'], className)} {...props} />;
};

export default memo(CheckboxGroup);
