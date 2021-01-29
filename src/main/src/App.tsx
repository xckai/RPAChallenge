import React, { useState } from 'react';
import './App.less';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import { MainPage } from './pages/Main';
import { TopicInfo } from './pages/TopicDetail';
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
         <Route path="/main" exact component={MainPage} />
        <Route path="/main/index.html" exact component={MainPage} />
        <Route path="/main/login" component={Login} />
        <Route path="/main/topicdetail/:id" component={TopicInfo} />
      </Router>
    );
  }
}

export default App;
