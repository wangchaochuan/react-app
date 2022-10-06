import Layout from './index';

const Demo = () => {
  return (
    <Layout title="demo-layout">
      <h2>组件描述：用于快速构建一个包含组件基本信息的demo</h2>
      <div className="wrapper">
        <h1>组件名1：</h1>
        <p>组件示例内容1....</p>
      </div>
      <div className="wrapper">
        <h1>组件名2：</h1>
        <p>组件示例内容2....</p>
      </div>
    </Layout>
  );
};

export default Demo;
