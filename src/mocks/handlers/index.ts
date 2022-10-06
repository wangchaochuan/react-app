import taskCenter from '@mocks/handlers/task-center';
import taskDetails from '@mocks/handlers/task-details';
import taskParameter from '@mocks/handlers/task-parameter';
import taskRule from '@mocks/handlers/task-rule';
import user from '@mocks/handlers/user';
import persionGroup from '@mocks/handlers/person-group';
import application from '@mocks/handlers/application';

const handles = [
  ...taskCenter,
  ...taskDetails,
  ...taskParameter,
  ...taskRule,
  ...user,
  ...persionGroup,
  ...application,
];

export default handles;
