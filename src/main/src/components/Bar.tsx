import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Button, Space, message } from 'antd';
import { getUserInfo, logout } from '../service';
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" onClick={logout}>
        注销
      </a>
    </Menu.Item>
  </Menu>
);

export default function Bar(props: { title: string }) {
  const [userName, setUserName] = useState('未登录');
  useEffect(() => {
    getUserInfo()
      .then((user) => {
        setUserName(user?.profile.name ?? '--');
      })
      .catch((err) => {
        message.error('获取用户信息失败： ' + err.message);
      });
  },[]);
  return (
    <Header className="header" title="RPA Challenge">
      <div>
        <strong>RPA Challenge</strong>
      </div>
      <div className="mid-title">{props?.title}</div>
      <div className="user-info">
        <Dropdown overlay={menu} placement="bottomLeft">
          <a style={{ color: '#eee' }}>{userName}</a>
        </Dropdown>
      </div>
    </Header>
  );
}
