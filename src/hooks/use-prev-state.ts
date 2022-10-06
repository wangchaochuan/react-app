import { useRef, useEffect } from 'react';
const usePrevState = function (value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevState;
