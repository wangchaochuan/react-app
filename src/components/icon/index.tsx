import { memo, FC, MouseEvent, CSSProperties } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?(event: MouseEvent): void;
  style?: CSSProperties;
}

const { search } = window.location;
const params = new URLSearchParams(search.slice(1));
const theme = params.get('theme') || 'light';
// 因为有黑白两套字体图标库，故需要根据主题区分
const scriptUrl =
  theme === 'dark' ? '//at.alicdn.com/t/font_3203447_mimth1ok5im.js' : '//at.alicdn.com/t/font_2473458_p6im5mk2e0m.js';
const IconFont = createFromIconfontCN({
  scriptUrl,
});

const MyIcon: FC<IconProps> = ({ type, className, title, onClick, style }) => {
  return (
    <IconFont
      type={theme === 'dark' ? `icon-${type}` : `custom-icon-${type}`}
      className={className ? className : ''}
      title={title}
      onClick={onClick}
      style={style}
    />
  );
};
export default memo(MyIcon);
