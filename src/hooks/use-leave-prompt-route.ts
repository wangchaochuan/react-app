import { useCallback } from 'react';
import { confirm } from '@/components/modal';

import useBlocker from '@/hooks/use-blocker';

interface Props {
  when: boolean;
  confirmFn?: (...rest: any) => void;
  cancelFn?: (...rest: any) => void;
  quitFn?: (...rest: any) => void;
}

const useLeavePromptRoute = ({ when, confirmFn, cancelFn, quitFn }: Props) => {
  const handleBlockedNavigation = useCallback(
    (tx: any) => {
      confirm({
        width: 415,
        okText: '保存',
        quitText: '取消',
        cancelText: '不保存',
        text: '是否保存当前修改?',
        async onEnsure() {
          if (confirmFn) {
            await confirmFn(tx.retry);
          }
        },
        async onCancel() {
          if (cancelFn) {
            await cancelFn(tx.retry);
          }
        },
        async onQuit() {
          if (quitFn) {
            await quitFn(tx.retry);
          }
        },
      });
    },
    [confirmFn, cancelFn, quitFn]
  );

  useBlocker(handleBlockedNavigation, when);
};

export default useLeavePromptRoute;
