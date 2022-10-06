import React, {
  useCallback,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { Popover, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AbstractTooltipProps } from 'antd/lib/tooltip';
import AsyncButton from '@components/async-button';
import styles from '@components/popover-confirm/index.module.scss';
import classnames from 'classnames';

interface PopoverProps {
  title: string;
  visible?: boolean;
  overlayClassName?: string;
  children: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  placement?: AbstractTooltipProps['placement'];
  trigger?: AbstractTooltipProps['trigger'];
  getPopupContainer?: AbstractTooltipProps['getTooltipContainer'];
  onVisibleChange?(visible: boolean): void;
  onConfirm?(): Promise<void> | void;
  onCancel?(): void;
  arrowPointAtCenter?: boolean;
}

const defaultGetPopupContainer: AbstractTooltipProps['getTooltipContainer'] = c => c;

function ReactPopover(props: PopoverProps, ref: React.Ref<unknown> | undefined) {
  const {
    overlayClassName,
    title,
    children,
    okText = '确认',
    onConfirm,
    content,
    placement,
    trigger = 'click',
    onVisibleChange,
    onCancel,
    visible,
    arrowPointAtCenter,
    getPopupContainer = defaultGetPopupContainer,
  } = props;
  const [showPopover, setShowPopover] = useState(false);
  const hasUnmounted = useRef(false);

  useEffect(() => {
    return () => {
      hasUnmounted.current = true;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      cancel: () => {
        onVisibleChange && onVisibleChange(false);
      },
    }),
    [onVisibleChange]
  );

  const handleCancel = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (onVisibleChange) {
        onVisibleChange(false);
      } else {
        setShowPopover(false);
      }
      onCancel && onCancel();
    },
    [onCancel, onVisibleChange]
  );

  const handleClickOk = useMemo(() => {
    if (onConfirm) {
      return async () => {
        const confirmReturn = onConfirm();
        if (hasUnmounted.current || !confirmReturn || typeof confirmReturn.then !== 'function') {
          return;
        }
        if (onVisibleChange) {
          onVisibleChange(false);
        } else {
          setShowPopover(false);
        }
      };
    } else {
      return undefined;
    }
  }, [onConfirm, onVisibleChange]);

  const popoverContent = useMemo(() => {
    return (
      <div className={styles.container} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className={styles.header}>
          <ExclamationCircleFilled className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {content}
          </div>
        </div>
        <div className={styles.footer}>
          <Button className={styles.cancel} type="text" size="middle" onClick={handleCancel}>
            取消
          </Button>
          <AsyncButton type="primary" size="middle" onClick={handleClickOk}>
            {okText}
          </AsyncButton>
        </div>
      </div>
    );
  }, [content, handleCancel, okText, handleClickOk, title]);

  // 受控模式下由外层接管
  const isControlled = typeof onVisibleChange === 'function';

  return (
    <Popover
      trigger={trigger}
      visible={isControlled ? visible : showPopover}
      getPopupContainer={getPopupContainer}
      onVisibleChange={isControlled ? onVisibleChange : setShowPopover}
      content={popoverContent}
      overlayClassName={overlayClassName}
      destroyTooltipOnHide
      placement={placement}
      className={classnames(styles.popover)}
      arrowPointAtCenter={arrowPointAtCenter}
    >
      {children}
    </Popover>
  );
}

export default React.memo(forwardRef(ReactPopover));
