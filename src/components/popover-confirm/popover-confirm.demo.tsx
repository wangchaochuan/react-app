import { Button } from 'antd';
import Popconfirm from '@components/popover-confirm/index';
import * as React from 'react';

const PopoverConfirmDemo = () => {
  return (
    <Popconfirm title="提示" content="删除后不可恢复,请确认是否删除该任务?" placement="bottom">
      <Button>删除</Button>
    </Popconfirm>
  );
};

export default PopoverConfirmDemo;
