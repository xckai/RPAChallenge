import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, KeyOutlined} from '@ant-design/icons';
import Bar from '../components/Bar';
import Layout, { Content } from 'antd/lib/layout/layout';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 }
};
export default function Login() {
  return (
    <Layout style={{ height: '90%',background:"rgb(255,255,255)" }}>
      <Bar title="" />
      <Content style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Form {...layout} style={{width:"50%", maxWidth:500}}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label="Password" name="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder="Password" prefix={<KeyOutlined />} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div  style={{display:"flex", justifyContent:'center',width:"100%"}}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            </div>

          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
