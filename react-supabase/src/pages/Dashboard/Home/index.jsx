import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TodoTable from './TodoTable';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


// const items = [
//   getItem('Home', '1', <HomeOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
//   getItem('Create Todo', 'create-todo', <PlusOutlined />, [
//     <Link to="/dashboard/create-todo">Create Todo</Link>, // This will route to the Create Todo page
//   ])
// ];

const items = [
  { label: <Link to="/dashboard">Home</Link>, key: '1', icon: <HomeOutlined /> },
  { label: 'Option 2', key: '2', icon: <DesktopOutlined /> },
  { 
    label: 'User', 
    key: 'sub1', 
    icon: <UserOutlined />, 
    children: [
      { label: 'Tom', key: '3' },
      { label: 'Bill', key: '4' },
      { label: 'Alex', key: '5' },
    ],
  },
  { 
    label: <Link to="/dashboard/create-todo">Create Todo</Link>, // Ensure this is wrapped correctly with Link
    key: 'create-todo',
    icon: <PlusOutlined />,
  },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible breakpoint='lg' collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical"  />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <TodoTable />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
           ©{new Date().getFullYear()} All Rights are Resedrved by supabase
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;