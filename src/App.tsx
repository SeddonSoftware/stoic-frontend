import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom';
import {
  HomeOutlined,
  EditOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import './App.css'
import HomePage from './Scenes/Home';
import JournalEntryPage from './Scenes/JournalEntry';
import AboutPage from './Scenes/About'

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: ()=>void,
): MenuItem {
  return {
    key,
    icon,
    label,
    onClick
  } as MenuItem;
}



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />,() => navigate('/')),
    getItem('Journal', '2', <EditOutlined />,() => navigate('/journal')),
    getItem('About', '3', <QuestionOutlined />,() => navigate('/about')),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className='menu' theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '10px 16px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={<JournalEntryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Stoic Journal {new Date().getFullYear()} Created by Jon Seddon
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;