import React, { useState } from 'react';
import { Layout } from 'antd';
import './App.css';
const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component<{}, { title: string }> {
  setTitle(title: string) {
    this.setState({
      title: title
    });
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header" title="RPA Challenge">
          <div className="left-title">
            <strong>RPA Challenge</strong>
          </div>
          <div className="mid-title">{this.state?.title}</div>
          <div className="user-info">{}</div>
        </Header>
        <Content className="content">Content</Content>
        <Footer>
            butto
        </Footer>
      </Layout>
    );
  }
}

export default App;
