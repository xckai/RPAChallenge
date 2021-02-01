import React, { PureComponent } from 'react';
import { Layout, Menu, Dropdown, Button, Space, message } from 'antd';
import { getUserInfo, login, logout } from '../service';
const { Header } = Layout;
export default class Bar extends PureComponent<{ title: string }> {
  state = {
    userName: '未登录',
    isLogin: false
  };
  componentDidMount() {
    getUserInfo().then((user) => {
      if (user) {
        this.setState({
          isLogin: true,
          userName: user?.profile.name ?? '--'
        });
      } else {
        this.setState({
          isLogin: false
        });
      }
    });
  }
  render() {
    return (
      <Header className="header" title="RPA Challenge">
        <div>
          <strong>RPA Challenge</strong>
        </div>
        <div className="mid-title">{this.props?.title}</div>
        <div className="user-info">
          {this.state.isLogin ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    {
                      <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                        注销
                      </a>
                    }
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <a style={{ color: '#eee' }}>{this.state.userName}</a>
            </Dropdown>
          ) : (
            <Button type="ghost" onClick={login}>
              点击登录
            </Button>
          )}
        </div>
      </Header>
    );
  }
}
