import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import Bar from '../components/Bar';
import Layout, { Content } from 'antd/lib/layout/layout';
import { login } from '../service';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 }
};

export default function Login() {
  let [name, setName] = useState('');
  let [passwd, setPassWd] = useState('');
  return (
    <Layout style={{ height: '90%', background: 'rgb(255,255,255)' }}>
      <Bar title="" />
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form {...layout} style={{ width: '50%', maxWidth: 500 }}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" prefix={<UserOutlined />} value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" value={passwd} onChange={(e) => setPassWd(e.target.value)} prefix={<KeyOutlined />} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  login(name, passwd)
                    .then((resp) => {
                      resp.data.success ? (window.location.href = '/main/index.html') : message.error(resp.data.msg);
                    })
                    .catch((err) => message.error(err.message));
                }}
              >
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
