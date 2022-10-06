import React, { memo, useState, useEffect, useMemo, isValidElement } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface ImageProps {
  placeholder?: string | React.ReactNode;
  src?: string;
  size?: number;
  className?: string;
  round?: boolean;
  alt?: string;
}

function CustomImage(props: ImageProps) {
  const { placeholder, src, size, className, round, alt = 'image' } = props;
  const [imgUrl, setImgUrl] = useState<string>(typeof placeholder === 'string' ? placeholder : '');

  useEffect(() => {
    if (!src) return;

    const tmpImg = new window.Image();

    tmpImg.src = src;

    tmpImg.onload = function () {
      setImgUrl(src);
    };
  }, [src]);

  const style = useMemo(() => {
    if (size !== undefined) {
      return {
        width: `${size}px`,
        height: `${size}px`,
      };
    }
  }, [size]);

  if (imgUrl) {
    return (
      <img
        src={imgUrl}
        alt={alt}
        style={style}
        className={classnames(styles.image, className, { [styles.round]: round })}
      />
    );
  }

  if (isValidElement(placeholder)) {
    return React.cloneElement(placeholder, { style } as any);
  }

  return null;
}

export default memo(CustomImage);
