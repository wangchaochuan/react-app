import { memo, FC } from 'react';
import Text from '@components/text';

const TextDemo: FC = () => {
  return (
    <div style={{ width: '100px' }}>
      <Text text="这是一段很长很长很长的文字这是一段很长很长很长的文字这是一段很长很长很长的文字" />
    </div>
  );
};

export default memo(TextDemo);
