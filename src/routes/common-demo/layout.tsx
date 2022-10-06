import { Menu } from 'antd';
import { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { importAll } from '@routes/common-demo/index.helpers';
import styles from '@routes/common-demo/index.module.scss';

// @types/webpack-env  require.context
const componentsDemos = importAll((require as any).context('@components', true, /\.*\.demo\.tsx$/));
const hooksDemos = importAll((require as any).context('@hooks', true, /\.*\.demo\.tsx$/));
// const storiesDemos = importAll(require.context('@/stories', true, /\.*\.demo\.tsx$/));
// export const modules = componentsDemos.concat(hooksDemos, storiesDemos);
export const modules = componentsDemos.concat(hooksDemos);
// export const modules = componentsDemos;

// console.log({ hooksDemos, componentsDemos, storiesDemos });

const CommonDemoLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const menuList = [
    { title: 'components', key: 'components', children: componentsDemos },
    { title: 'hooks', key: 'hooks', children: hooksDemos },
    // { title: 'stories', key: 'stories', children: storiesDemos },
  ];

  return (
    <div className={styles['common-demo-layout']}>
      <div className="layou-list">
        <Menu selectedKeys={[pathname]} mode="inline" theme="dark">
          {/* {modules.map(({ name, path }: any, index: number) => (
            <Menu.Item key={`/common-demo${!!index ? path : ""}`} onClick={handleClick.bind(null, !!index ? name : "")}>
              {name}
            </Menu.Item>
          ))} */}
          {menuList.map(item => (
            <Menu.SubMenu title={item.title} key={item.key}>
              {item.children.map(({ name, path }: any, index: number) => (
                <Menu.Item key={`/${item.key}/${name}`} onClick={() => handleClick(name)}>
                  {name}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default CommonDemoLayout;
