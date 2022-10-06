import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface AsyncButtonProps extends ButtonProps {
  onClick?(): Promise<void> | void;
}

function AsyncButton(props: AsyncButtonProps) {
  const { loading: outLoading, onClick, ...others } = props;
  const [loading, setLoading] = useState(outLoading || false);
  const hasUnmountedRef = useRef(false);
  const isControlled = outLoading !== undefined;

  useEffect(() => {
    return () => {
      hasUnmountedRef.current = true;
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (typeof onClick !== 'function') return;

    const clickReturn = onClick();

    // loading状态由外部空坠或者点击按钮后卸载了此组件不往下处理
    if (isControlled || hasUnmountedRef.current) return;

    if (clickReturn && typeof clickReturn.then === 'function') {
      setLoading(true);

      try {
        await clickReturn;
      } finally {
        if (!hasUnmountedRef.current) {
          setLoading(false);
        }
      }
    }
  }, [onClick, isControlled]);

  return <Button loading={isControlled ? outLoading : loading} onClick={handleClick} {...others} />;
}

export default React.memo(AsyncButton);
