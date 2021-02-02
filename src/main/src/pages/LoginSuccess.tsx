import React, { useEffect } from 'react';
import { message, Spin } from 'antd';
import Bar from '../components/Bar';
import Layout, { Content } from 'antd/lib/layout/layout';
import { loginCb } from '../service';
import { useHistory  } from 'react-router-dom';

export default function LoginSuccess() {
  const history = useHistory();
  useEffect(() => {
    loginCb()
      .then((user) => {
        history.push('/main/index.html')
      })
      .catch((err) => message.error(err.message));
  });
  return (
    <Layout style={{ height: '100%', background: 'rgb(255,255,255)' }}>
      <Spin tip="正在登录..." style={{ height: '100vh'}}>
        <Bar title="" />
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:"95vh" }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }} className="bg">
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="logo-login" style={{ width: '400px', height: '150px', marginRight: 10 }}></div>
            </section>
          </div>
        </Content>
      </Spin>
    </Layout>
  );
}
