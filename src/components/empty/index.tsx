import { ReactNode, memo } from 'react';
import classnames from 'classnames';
import Image from '@/components/image';
import styles from '@components/empty/index.module.scss';
import EmptyBlockPng from '@assets/images/empty-small.png';
import EmptyPagePng from '@assets/images/empty-large.png';

export type EmptyProps = {
  className?: string;
  src?: string;
  children?: ReactNode;
};

const EmptyPage = memo(({ className, src, children }: EmptyProps) => {
  return (
    <div className={classnames(styles['empty-page'], className)}>
      <div className="image-wrapper">
        <Image src={src || EmptyPagePng} />
      </div>
      <div className="content-wrapper">{children || '空文件'}</div>
    </div>
  );
});

const EmptyBlock = memo(({ className, src, children }: EmptyProps) => {
  return (
    <div className={classnames(styles['empty-block'], className)}>
      <div className="image-wrapper">
        <Image src={src || EmptyBlockPng} />
      </div>
      <div className="content-wrapper">{children || '无匹配结果'}</div>
    </div>
  );
});

export { EmptyPage as default, EmptyBlock };
