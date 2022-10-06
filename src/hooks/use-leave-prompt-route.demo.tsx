import { Input } from 'antd';
import { useCallback, useState } from 'react';
import useLeavePromptRoute from './use-leave-prompt-route';

const UseLeavePromptRouteDemo = () => {
  const [dirty, setDirty] = useState(false);
  const handleSave = useCallback((go: any) => {
    // Todo something；if everything is normal，then go；
    console.log('todothing');
    go();
  }, []);

  const handleChange = useCallback((event: any) => {
    const { value } = event.target;
    if (value) {
      setDirty(true);
    } else {
      setDirty(false);
    }
  }, []);

  // 数据dirty时,离开提示保存
  useLeavePromptRoute({
    when: dirty,
    confirmFn: go => {
      handleSave(go);
    },
    cancelFn: go => {
      go();
    },
    quitFn: () => {
      console.log('quit');
    },
  });
  return (
    <>
      Input输入(输入框有值就会被拦截)：
      <Input style={{ width: '150px' }} onChange={handleChange} />
    </>
  );
};

export default UseLeavePromptRouteDemo;
