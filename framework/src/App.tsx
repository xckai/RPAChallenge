import React, { useState } from 'react';
import { Layout } from 'antd';
import './App.less';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import { MainPage } from './pages/Main';
import { TopicInfo } from './pages/TopicDetail';
const { Header, Footer, Sider, Content } = Layout;
const history = createBrowserHistory();
class App extends React.Component<{}, { title: string }> {
  setTitle(title: string) {
    this.setState({
      title: title
    });
  }
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/topicdetail/:id" component={TopicInfo} />
      </Router>
    );
  }
}

export default App;
