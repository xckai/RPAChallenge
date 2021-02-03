import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import Bar from '../components/Bar';
import Layout, { Content } from 'antd/lib/layout/layout';
import { login } from '../service';
import { LoginOutlined } from '@ant-design/icons';
export default function Login() {
  return (
    <Layout style={{ height: '100%', background: 'rgb(255,255,255)' }}>
      <Bar title="" />
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#000" }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }} className="bg">
          <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="logo-login" style={{ width: '300px', height: '100px' }}></div>
            <Button
              type="ghost"
              size="large"
              icon={<LoginOutlined />}
              onClick={() => {
                login().catch((err) => message.error(err.message));
              }}
            >
              点击登录
            </Button>
          </section>
        </div>
      </Content>
    </Layout>
  );
}
