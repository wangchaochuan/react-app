import { ReactNode, memo, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalProps, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import classnames from 'classnames';
import AsyncButton from '@components/async-button';
import Icon from '@components/icon';
import styles from './index.module.scss';

interface CommonProps extends ModalProps {
  onClose?(): void;
  onOk?(): Promise<void> | void;
  onQuit?(): void | Promise<any>;
  quitText?: string;
  quitButtonProps?: any;
  children: ReactNode;
}

function ModalCom(props: CommonProps) {
  const {
    onClose,
    onCancel,
    onQuit,
    onOk,
    okButtonProps,
    quitButtonProps,
    okText,
    footer,
    cancelText,
    cancelButtonProps,
    quitText,
    children,
    ...others
  } = props;
  const closeIcon = useMemo(() => {
    return <Icon className={styles.close} type="guanbi" onClick={onClose || onCancel} />;
  }, [onClose, onCancel]);

  const mFooter = useMemo(() => {
    if (footer === null) return null;

    if (footer) return footer;

    const okBtnProps = okButtonProps || { size: 'large', type: 'primary' };
    const cancelBtnProps = cancelButtonProps || { size: 'large', type: 'text' };
    const quitBtnProps = quitButtonProps || { size: 'large', type: 'text' };

    return (
      <div className={styles.btns}>
        {quitText && (
          <Button className={classnames(styles.quit, quitBtnProps.className)} {...quitBtnProps} onClick={onQuit}>
            {quitText}
          </Button>
        )}
        {cancelText && (
          <Button
            className={classnames(styles.cancel, cancelBtnProps.className)}
            {...cancelBtnProps}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        <AsyncButton {...okBtnProps} onClick={onOk}>
          {okText}
        </AsyncButton>
      </div>
    );
  }, [footer, quitText, onQuit, quitButtonProps, okButtonProps, okText, cancelButtonProps, cancelText, onOk, onCancel]);

  return (
    <Modal closeIcon={closeIcon} footer={mFooter} {...others}>
      {children}
    </Modal>
  );
}

const ModalConfirm = memo(function Confirm(props: CommonProps) {
  const { title, children, ...others } = props;
  const mTtile = useMemo(() => {
    return (
      <div className={styles.title}>
        <ExclamationCircleFilled className={styles.confirm} />
        {title}
      </div>
    );
  }, [title]);

  return (
    <ModalCom {...others} title={mTtile}>
      {children}
    </ModalCom>
  );
});

export default ModalConfirm;

interface ConfirmParams extends ModalProps {
  title?: string;
  text: string;
  onClose?(): void;
  onCancel?(): void;
  onEnsure?(): void | Promise<any>;
  onQuit?(): void | Promise<any>;
  width?: number;
  okText?: string;
  cancelText?: string;
  quitText?: string;
  quitButtonProps?: any;
}

export const confirm = function (params: ConfirmParams, container?: HTMLElement) {
  let domContainer = container;

  if (!domContainer) {
    const div = document.createElement('div');

    domContainer = div;
    document.body.appendChild(div);
  }

  const {
    title = '提示',
    text,
    onClose,
    onCancel,
    onEnsure,
    width,
    okText,
    cancelText,
    onQuit,
    quitText,
    ...otherprops
  } = params;

  const closeModal = () => {
    render(false);

    setTimeout(close, 50);
  };

  const hanldeCancel = async () => {
    if (onCancel) onCancel();

    closeModal();
  };

  const handleClose = async () => {
    if (onClose) onClose();

    closeModal();
  };

  const handleEnsure = async () => {
    if (onEnsure) {
      await onEnsure();
    }

    closeModal();
  };

  const handleQuit = async () => {
    if (onQuit) {
      await onQuit();
    }
    closeModal();
  };

  const render = (visible: boolean) => {
    ReactDOM.render(
      <ModalConfirm
        {...otherprops}
        wrapClassName={styles['modal-warn']}
        title={title}
        visible={visible}
        onClose={handleClose}
        onCancel={hanldeCancel}
        onOk={handleEnsure}
        onQuit={handleQuit}
        children={text}
        width={width}
        okText={okText}
        cancelText={cancelText}
        quitText={quitText}
      />,
      domContainer!
    );
  };

  render(true);

  const close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(domContainer!);

    if (unmountResult && domContainer?.parentNode) {
      domContainer.parentNode.removeChild(domContainer);
    }
  };

  return close;
};
