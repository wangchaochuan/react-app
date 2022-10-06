import { rest } from 'msw';
import Mock from 'mockjs';

const handlers = [
  // 获取分类规则；
  rest.post('/rule/queryRule', (req, res, ctx) => {
    // const { id } = req.params;
    const response = Mock.mock({
      'data|20': [
        {
          eventName: () => Mock.mock('@ctitle(3)'),
          id: () => Mock.mock('@id()'),
          sort: () => Mock.mock('@range(1, 10)'),
          // taskCode
          'assReqRules|2': {
            'groupDetailDTOList|3': [
              {
                'ruleType|1': ['0', '1'],
                'assertRuleDetailDTOList|2': [
                  {
                    chineseElement: '姓名',
                    dataType: '1',
                    englishElement: 'name',
                    operatorType: '==',
                    operatorTypeEnmus: '3',
                    parameter: '11',
                    parameterKey: null,
                    parameterType: '0',
                  },
                  {
                    chineseElement: '事件名称',
                    dataType: '1',
                    englishElement: 'event_name',
                    operatorType: null,
                    operatorTypeEnmus: null,
                    parameter: '11',
                    parameterKey: null,
                    parameterType: '0',
                  },
                ],
              },
            ],
            'ruleStatus|1': ['0', '1'],
            ruleCode: () => Mock.mock('@id(6)'),
            processId: () => Mock.mock('@id(8)'),
          },
          exceptRule: {
            'ruleStatus|1': ['0', '1'],
            'groupDetailDTOList|2': [
              {
                'ruleType|1': ['0', '1'],
                'assertRuleDetailDTOList|2': [
                  {
                    chineseElement: null,
                    dataType: null,
                    englishElement: null,
                    operatorType: null,
                    operatorTypeEnmus: null,
                    parameter: null,
                    parameterKey: null,
                    parameterType: null,
                  },
                ],
              },
            ],
          },
          inhibRule: {
            'ruleStatus|1': ['0', '1'],
            'inhiRuleDetailReqDTOList|2': [
              {
                startTime: '00:00:00',
                endTime: '09:00:00',
              },
            ],
          },
          repeatRule: {
            'repeatRuleDetailDTOS|2': [
              {
                chineseElement: Mock.mock('@cname()'),
                englishElement: Mock.mock('@name()'),
              },
            ],
            ruleStatus: '1',
            time: '10',
            timeUnit: '分钟',
          },
        },
      ],
    });
    return res(ctx.status(200), ctx.json(response));
  }),
];

export default handlers;
