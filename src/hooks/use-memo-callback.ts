import { useEffect, useRef } from 'react';

const callbacks: { [key: string]: (...args: any[]) => any } = {};
const wraps: { [key: string]: (...args: any[]) => any } = {};
function useMemoCallback<T extends (...args: any[]) => any>(cb: T): T {
  const hasUnmountRef = useRef(false);
  const keyRef = useRef<string>();

  keyRef.current = keyRef.current || Math.random().toString(36).slice(2);

  useEffect(() => {
    return () => {
      hasUnmountRef.current = true;

      if (keyRef.current) {
        delete wraps[keyRef.current];
        delete callbacks[keyRef.current];
      }
    };
  }, []);

  callbacks[keyRef.current] = cb;

  if (!wraps[keyRef.current]) {
    wraps[keyRef.current] = function (...args: any) {
      // 组件卸载后不要再执行了
      if (hasUnmountRef.current) return;

      return callbacks[keyRef.current!](...args);
    };
  }

  return wraps[keyRef.current] as T;
}

export default useMemoCallback;
