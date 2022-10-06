/* 权限相关接口 */
import { rest } from 'msw';
import Mock from 'mockjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const obj = {
  orderNum: () => Mock.mock('@increment()'),
  groupName: () => Mock.mock('@cname()'),
  groupCode: () => Mock.mock('@guid()'),
  parentCode: () => Mock.mock('@guid()'),
  descrip: () => Mock.mock('@cparagraph(1, 3)'),
  groupLevel: () => Mock.mock('@integer(1, 3)'),
};

let data: any[] = [
  {
    groupCode: 'cc4f140306',
    groupLevel: 0,
    parentCode: null,
    groupName: '总指挥',
    orderNum: 1,
    descrip: '虚拟组根目录',
    createTime: '2022-04-13 21:57:27',
    updateTime: '2022-04-13 21:57:27',
    createBy: 1,
    updateBy: 1,
  },
];

const handlers = [
  rest.get('/userVirtualGroup/query', (req, res, ctx) => {
    const response = Mock.mock({
      resultCode: 0,
      resultMessage: '成功',
      data,
    });
    return res(ctx.status(200), ctx.json(response));
  }),

  rest.post('/userVirtualGroup/insert', (req: any, res, ctx) => {
    const { descrip, groupName, parentCode }: { [key: string]: any } = req.body;
    const parentNode = data.find(item => item.groupCode === parentCode);
    const groupLevel = parentNode ? parentNode?.groupLevel + 1 : 0;
    const groupCode = Mock.mock('@id()');
    data.push({
      groupCode,
      groupLevel,
      descrip,
      groupName,
      parentCode,
    });

    return res(ctx.status(200), ctx.json({ resultCode: 0, data: groupCode, resultMessage: '成功' }));
  }),
  rest.post('/userVirtualGroup/update', (req: any, res, ctx) => {
    const { descrip, groupCode, groupName, parentCode }: { [key: string]: any } = req.body;
    // const newData = cloneDeep(data);
    const index = data.findIndex(item => item.groupCode === groupCode);
    if (index > -1) {
      const obj = data[index];
      const parentNode = data.find(item => item.groupCode === parentCode);
      const groupLevel = parentNode ? parentNode?.groupLevel + 1 : 0;
      data.splice(index, 1, { ...obj, descrip, groupCode, groupName, parentCode, groupLevel });
    }
    return res(ctx.status(200), ctx.json({ resultCode: 0, data, resultMessage: '成功' }));
  }),

  rest.post('/userVirtualGroup/delete', (req: any, res, ctx) => {
    const { groupCode }: { [key: string]: any } = req.body;

    data = [...data].filter(item => !(item.groupCode === groupCode || item.parentCode === groupCode));
    return res(ctx.status(200), ctx.json({ resultCode: 0, data: null, resultMessage: '成功' }));
  }),
  rest.get('/userVirtualGroup/queryUsers', (req, res, ctx) => {
    const { projectId, taskId } = req.params;
    const response = Mock.mock({
      projectId: projectId,
      taskId: taskId,
      data,
    });
    return res(ctx.status(200), ctx.json({ resultCode: 0, data: response, resultMessage: '成功' }));
  }),
  rest.post('/userVirtualGroup/saveUsers', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
  rest.get('/userVirtualGroup/getDepts', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
  rest.get('/userVirtualGroup/getDeptsByDeptIds', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
  rest.post('/userVirtualGroup/sortUserVirtualGroups', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
  rest.post('/userVirtualGroup/deleteUsers', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
  rest.post('/userVirtualGroup/queryUserIds', (req, res, ctx) => {
    // const { paramsEnglishKey, projectNo } = req.body as any;
    // // data = data.filter((item) => item.englishName === paramsEnglishKey);

    return res(ctx.status(200), ctx.json({ resultCode: 0, resultMessage: '成功' }));
  }),
];

export default handlers;
