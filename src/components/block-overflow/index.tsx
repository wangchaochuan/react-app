import { ComponentType, ReactNode, memo } from 'react';
import Overflow, { OverflowProps } from 'rc-overflow';
import { Dropdown } from 'antd';
import styles from './index.module.scss';

type Props = OverflowProps<object[]> & {
  isShowAll: boolean;
  list: object[];
  renderItem: (item: object) => ReactNode;
  Overlay: ComponentType<{ data: object[] }>;
  Icon: ReactNode;
};
type RestProps = {
  rests: object[];
} & Pick<Props, 'Overlay' | 'Icon'>;
export const Rest = (props: RestProps) => {
  const { Overlay, rests, Icon } = props;
  return (
    <Dropdown
      trigger={['hover']}
      overlay={<Overlay data={rests} />}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
    >
      <div className="icon-wrap" onClick={e => e.stopPropagation()}>
        {Icon}
      </div>
    </Dropdown>
  );
};

const BlockOverflow = (props: Props) => {
  const { list, renderItem, Overlay, Icon, maxCount, isShowAll } = props;
  return (
    <Overflow
      className={styles.container}
      data={list}
      renderItem={renderItem}
      renderRest={resProps => {
        const data = isShowAll ? list : resProps;
        return <Rest Icon={Icon} rests={data} Overlay={Overlay} />;
      }}
      maxCount={maxCount}
    ></Overflow>
  );
};

export default memo(BlockOverflow);
