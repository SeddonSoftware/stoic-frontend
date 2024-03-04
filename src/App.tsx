import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom';
import {
  HomeOutlined,
  EditOutlined,
  QuestionOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import './App.css'
import HomePage from './Scenes/Home';
import JournalEntryPage from './Scenes/JournalEntry';
import AboutPage from './Scenes/About'
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './Scenes/Login';
import UserBadge from './components/UserBadge';
import JournalViewPage from './Scenes/JournalView';

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: ()=>void,
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    label,
    onClick,
    disabled
  } as MenuItem;
}



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem('Home', '/', <HomeOutlined />,() => navigate('/')),
    getItem('Journal', '/journal', <EditOutlined />,() => navigate('/journal'), !isLoggedIn),
    getItem('About', '/about', <QuestionOutlined />,() => navigate('/about')),
  ];

  let selectedKeys = [location.pathname === '/' ? '/' : location.pathname];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className='menu' theme="dark" selectedKeys={selectedKeys} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{backgroundColor: 'white', display: 'flex', justifyContent: 'end'}}> <UserBadge isLoggedIn={isLoggedIn}/> </Header>
        <Content style={{ margin: '10px 16px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={
              <ProtectedRoute>
                <JournalEntryPage />
              </ProtectedRoute>
            } />
            <Route path="/introspection" element={<JournalViewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage/>} />
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