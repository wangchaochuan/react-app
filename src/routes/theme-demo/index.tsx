/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo } from 'react';
import {
  Drawer,
  Cascader,
  Tag,
  Empty,
  message,
  Progress,
  Tooltip,
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
  Menu,
  Spin,
  Upload,
  Alert,
  Tabs,
  Select,
  Radio,
  Switch,
  InputNumber,
  DatePicker,
  Space,
  Table,
  Popover,
  TimePicker,
} from 'antd';
import {
  ExclamationCircleOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  UploadOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';

const ModelRule = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {
        console.log(111);
      },
    });
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const { SubMenu } = Menu;
  const [current, setCurrnt] = useState<string>('mail');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleClick = (e: any) => {
    setCurrnt(e.key);
  };
  const infoMessage = () => {
    message.info('This is a info message', 10);
  };
  const success = () => {
    message.success('This is a success message', 10);
  };
  const error = () => {
    message.error('This is an error message', 10);
  };
  const warning = () => {
    message.warning('This is a warning message', 10);
  };
  const loading = () => {
    message.loading('This is a loading message', 10);
  };
  function log(e: any) {
    console.log(e);
  }
  function preventDefault(e: any) {
    e.preventDefault();
  }
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      disabled: true,
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  function onChange(value: any) {
    console.log(value);
  }
  const { TabPane } = Tabs;
  const { TextArea } = Input;
  const { Option } = Select;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  const [tabPosition, setTabPosition] = useState<any>('left');
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Redcsad</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const [spinLoading, setSpinLoading] = useState<any>(false);
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Popover</div>
      <div>
        <Popover content={content} placement="right" title="Title" trigger="click">
          <Button>Click me</Button>
        </Popover>
      </div>
      <div className={styles.title}>datepicker</div>
      <div>
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
          <DatePicker onChange={onChange} picker="week" />
          <DatePicker onChange={onChange} picker="month" />
          <DatePicker onChange={onChange} picker="quarter" />
          <DatePicker onChange={onChange} picker="year" />
        </Space>
      </div>
      <div className={styles.title}>datepicker</div>
      <div>
        <Space direction="vertical">
          <TimePicker />
        </Space>
      </div>
      <div className={styles.title}>ToolTip</div>
      <div>
        <Tooltip title="prompt text" visible={true}>
          <div className={styles.inlineBlock}>Tooltip will sadasdsadasdasdasshow on mouse enter.</div>
        </Tooltip>
      </div>
      <div className={styles.title}>Popover</div>
      <div>
        <Popover content={content} title="Title" trigger="click">
          <Button>Click me</Button>
        </Popover>
      </div>
      <div className={styles.title}>Button</div>
      <div>
        <Space direction="vertical">
          <Space>
            <Button type="primary">Primary Button</Button>
            <Button type="primary" disabled>
              Primary Button
            </Button>
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <Button type="primary" icon={<SearchOutlined />} disabled>
              Search
            </Button>
          </Space>
        </Space>
        <Space direction="vertical">
          <Space>
            <Button type="primary" ghost icon={<SearchOutlined />}>
              primary ghost Button
            </Button>
            <Button type="primary" ghost icon={<SearchOutlined />} disabled>
              primary ghost Button
            </Button>
          </Space>
        </Space>
        <Space direction="vertical">
          <Space>
            <Button icon={<SearchOutlined />}>Default Button</Button>
            <Button icon={<SearchOutlined />} disabled>
              Default Button
            </Button>
          </Space>
        </Space>
        <Space direction="vertical">
          <Space>
            <Button ghost icon={<SearchOutlined />}>
              Default ghost Button
            </Button>
            <Button ghost icon={<SearchOutlined />} disabled>
              Default ghost Button
            </Button>
          </Space>
        </Space>
        <Space direction="vertical">
          <Space>
            <Button type="text" icon={<SearchOutlined />}>
              Text Button
            </Button>
            <Button type="text" icon={<SearchOutlined />} disabled>
              Text Button
            </Button>
          </Space>
        </Space>
        <Space direction="vertical">
          <Space>
            <Button type="link" icon={<SearchOutlined />}>
              Link Button
            </Button>
            <Button type="link" icon={<SearchOutlined />} disabled>
              Link Button
            </Button>
          </Space>
        </Space>
      </div>
      <div className={styles.title}>Switch</div>
      <div>
        <Space>
          <Switch defaultChecked />
          <Switch defaultChecked disabled />
          <Switch defaultChecked={false} disabled />
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Space>
      </div>
      <div className={styles.title}>Checkbox</div>
      <div>
        <Space>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox defaultChecked disabled />
        </Space>
      </div>
      <div className={styles.title}>Radio</div>
      <Space>
        <Radio>Radio</Radio>
        <Radio defaultChecked={false} disabled>
          Disabled
        </Radio>
        <Radio defaultChecked disabled>
          Disabled
        </Radio>
        {/* <Radio.Group
          options={[
            { label: "Apple", value: "Apple" },
            { label: "Pear", value: "Pear" },
            { label: "Orange", value: "Orange", disabled: true },
          ]}
          onChange={(e) => setValue3(e.target.value)}
          value={value3}
          optionType="button"
          buttonStyle="solid"
        />
        <Radio.Group
          options={[
            { label: "Apple", value: "Apple" },
            { label: "Pear", value: "Pear" },
            { label: "Orange", value: "Orange", disabled: true },
          ]}
          onChange={(e) => setValue3(e.target.value)}
          value={value3}
          optionType="button"
        /> */}
      </Space>
      <div className={styles.title}>input</div>
      <Space>
        <Input placeholder="Basic usage" />
        <Input placeholder="Basic usage" disabled value={11111} />
        <Input placeholder="default size" prefix={<UserOutlined />} suffix={<UserOutlined />} />
        <TextArea showCount placeholder="input with clear icon" maxLength={100} style={{ height: 120 }} />
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
        <InputNumber min={1} max={10} disabled defaultValue={3} />
        <InputNumber status="error" />
        <InputNumber status="warning" />
      </Space>
      <div className={styles.title}>select</div>
      <Space>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          open
        >
          {children}
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} open>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} disabled>
          <Option value="lucy">Lucy</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} loading>
          <Option value="lucy">Lucy</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
          <Option value="lucy">Lucy</Option>
        </Select>
      </Space>
      <div className={styles.title}>Form</div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            extra="We must make sure that your are a human."
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Aaaa"
            name="Aaaa"
            extra="We must make sure that your are a human."
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Bbbb"
            name="Bbbb"
            extra="We must make sure that your are a human."
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.title}>menu</div>
      <div>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          </Menu.Item>
        </Menu>
        111111
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
        <div style={{ width: 256 }}>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={!collapsed}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Option 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      </div>
      <div className={styles.title}>Spin</div>
      <div>
        <Switch checked={spinLoading} onChange={val => setSpinLoading(val)} />
        <Spin tip="Loading..." spinning={spinLoading}>
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      </div>
      <div className={styles.title}>Progress</div>
      <div>
        <Progress percent={30} />
        <Progress percent={50} status="active" />
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
        <Progress type="circle" percent={75} />
      </div>
      <div className={styles.title}>message</div>
      <Space>
        <Button onClick={infoMessage}>info</Button>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
        <Button onClick={loading}>Loading</Button>
      </Space>
      <div className={styles.title}>Empty</div>
      <div>
        <Empty />
      </div>
      <div className={styles.title}>tag</div>
      <div>
        <Tag>Tag 1</Tag>
        <Tag>
          <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
        </Tag>
        <Tag closable onClose={log}>
          Tag 2
        </Tag>
        <Tag closable onClose={preventDefault}>
          Prevent Default
        </Tag>
      </div>
      <div className={styles.title}>Drawer</div>
      <div>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
      <div className={styles.title}>Modal</div>
      <Space>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Button onClick={showConfirm}>Confirm</Button>
        <Button onClick={info}>Info</Button>
      </Space>
      <div className={styles.title}>Cascader</div>
      <div>
        <Cascader options={options} onChange={onChange} placeholder="Please select" />
      </div>
      <div className={styles.title}>upload</div>
      <div>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
      <div className={styles.title}>Tabs</div>
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2" disabled>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Card Tab 1" key="1">
            Content of card tab 1
          </TabPane>
          <TabPane tab="Card Tab 2" key="2">
            Content of card tab 2
          </TabPane>
          <TabPane tab="Card Tab 3" key="3">
            Content of card tab 3
          </TabPane>
        </Tabs>
        <Space style={{ marginBottom: 24 }}>
          Tab position:
          <Radio.Group
            options={['top', 'bottom', 'left', 'right']}
            onChange={e => setTabPosition(e.target.value)}
            value={tabPosition}
          />
        </Space>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.title}>Table</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default memo(ModelRule);
