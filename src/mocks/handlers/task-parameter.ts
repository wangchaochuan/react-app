/* 权限相关接口 */
import { rest } from 'msw';
import Mock from 'mockjs';

// const obj =   {
//   defaultValue: 42,
//   tags: () => Mock.mock("@csentence(5)"),
//   nameEn: () => Mock.mock("@name()"),
//   age: () => Mock.mock("@increment()"),
//   unit: Mock.mock("@tld()"),
//   name: () => Mock.mock("@cname()"),
//   key: () => Mock.mock("@guid()"),
//   description: () => Mock.mock("@cparagraph(1, 3)"),
//   enable: () => Mock.mock("@boolean()"),
//   level: () => Mock.mock("@integer(1, 3)"),
// },

let data = [] as Array<any>;

const handlers = [
  rest.post('/rule/queryTaskParamsList', (req, res, ctx) => {
    const { projectId, taskId } = req.params;
    const response = Mock.mock({
      projectId: projectId,
      taskId: taskId,
      data,
    });
    return res(ctx.status(200), ctx.json(response));
  }),

  rest.post('/rule/saveTaskParams', (req, res, ctx) => {
    const param = req.body as any;
    data = param.map((item: any) => ({
      ...item,
      key: () => Mock.mock('@guid()'),
    }));

    return res(ctx.status(200), ctx.json({ data }));
  }),
  rest.post('/rule/deleteTaskParams', (req, res, ctx) => {
    const { paramsEnglishKey, projectNo } = req.body as any;
    data = data.filter(item => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ projectNo }));
  }),
];

export default handlers;
