import React from 'react';
import { Avatar, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, QuestionCircleFilled } from '@ant-design/icons';

interface UserBadgeProps {
  isLoggedIn: boolean;
}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" href="/login">
          Login
        </a>
      ),
    }
  ];

function UserBadge({ isLoggedIn }: UserBadgeProps) {
    return (
        <Dropdown disabled={isLoggedIn} menu={{ items }} placement="bottom" arrow>
            <Space size={16}>
                <Avatar icon={ isLoggedIn ? <UserOutlined /> : <QuestionCircleFilled/>} />
            </Space>
        </Dropdown>
        
    );
}

export default UserBadge;
