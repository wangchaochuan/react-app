// src/mocks/handlers.js
import { rest } from 'msw';
import Mock from 'mockjs';

const handlers = [
  // 获取菜单列表；
  rest.post('/apply/batchUpload?controlType=1', (req, res, ctx) => {
    const response = Mock.mock({
      data: [
        {
          fileUuid: 'FILE_15298108260032',
          name: 'both-nav.png',
          size: 634,
          mimeType: 'image/png',
          createTime: null,
        },
      ],
      resultCode: 0,
      resultMessage: '成功',
    });
    return res(ctx.status(200), ctx.json(response));
  }),
  // 获取已发布工单列表；
  rest.post(`/menu/resources`, (req, res, ctx) => {
    const response = Mock.mock({
      data: [
        {
          id: 15259320485312,
          name: '测试流程',
          type: 2,
          status: 1,
          createTime: 1658468483000,
          openVisit: true,
          version: {
            id: 15259323811712,
            version: 'V 0.1',
            remark: '',
          },
        },
      ],
      resultCode: 0,
      resultMessage: '成功',
    });
    return res(ctx.status(200), ctx.json(response));
  }),
  // 应用详情查询；
  rest.get(`/apply/getApplyInfo/:id`, (req, res, ctx) => {
    const response = Mock.mock({
      resultCode: 0,
      data: {
        id: null,
        name: 'mock数据测试',
        status: null,
        descripe: 'mock数据测试的描述',
        projectNo: '2f12b9b7-d2c0-406c-900e-3e9e91861c42',
        menuList: [
          {
            menuId: 'cbb5decb-c7a3-4e67-992f-3e355043b259',
            name: '一级菜单',
            parentId: null,
            depth: 1,
            form: {
              name: '一级菜单',
              icon: 'wukongjian',
              mode: 'current',
              asset: 'custom',
              assetConfig: {
                subAppType: 5,
                url: 'http://www.baidu.com',
              },
            },
            children: [
              {
                menuId: '6b3ef941-1c30-4b5e-9e89-e62d2a811cf2',
                parentId: 'cbb5decb-c7a3-4e67-992f-3e355043b259',
                name: '二级菜单',
                depth: 2,
                form: {
                  name: '二级菜单',
                  icon: 'yingyongsheji6',
                  mode: 'current',
                  asset: 'custom',
                  assetConfig: {
                    subAppType: 5,
                    url: 'http://www.baidu.com',
                  },
                },
                children: [],
              },
            ],
          },
        ],
        icon: 'FILE_15298108260032',
        topic: 'light',
      },
      resultMessage: '成功',
    });
    return res(ctx.status(200), ctx.json(response));
  }),
];

export default handlers;
