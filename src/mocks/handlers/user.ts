// src/mocks/handlers.js
import { rest } from 'msw';
import Mock from 'mockjs';

const handlers = [
  // 获取菜单列表；
  rest.get('/auth/current', (req, res, ctx) => {
    const response = Mock.mock({
      data: {
        user: {
          avatar: null,
          id: 7,
          loginName: 'wangcc',
          userName: '王朝传',
        },
        project: {
          code: '14646228941248',
          createTime: 1648888927000,
          id: 14646228941248,
          name: '开发专用',
          status: 1,
        },
      },
    });
    return res(ctx.status(200), ctx.json(response));
  }),
];

export default handlers;
