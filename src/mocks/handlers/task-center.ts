// src/mocks/handlers.js
import { rest } from 'msw';
import Mock from 'mockjs';

const handlers = [
  // 获取菜单列表；
  rest.post('/project/queryProjectList', (req, res, ctx) => {
    const { id } = req.params;
    const response = Mock.mock({
      'data|20': [
        {
          name: () => Mock.mock('@ctitle(5)'),
          id: () => Mock.mock('@id()'),
          projectId: id,
        },
      ],
    });
    return res(ctx.delay(5000), ctx.status(200), ctx.json(response));
  }),

  // 添加
  rest.post('/app', (req, res, ctx) => {
    const { name, projectId } = req.body as any;
    return res(ctx.status(200), ctx.json({ name, projectId }));
  }),

  // 获取任务列表
  rest.get('/subapp/:project/list/all', (req, res, ctx) => {
    const { project } = req.params;
    const response = Mock.mock({
      'data|20': [
        {
          name: () => Mock.mock('@ctitle(8)'),
          key: () => Mock.mock("@string('number',5)"),
          id: () => Mock.mock('@id()'),
          project,
          createTime: () => Mock.mock('@datetime()'),
          creator: () => Mock.mock('@cname()'),
          'status|-1-1': 0,
        },
      ],
    });

    return res(ctx.status(200), ctx.json(response));
  }),
];

export default handlers;
