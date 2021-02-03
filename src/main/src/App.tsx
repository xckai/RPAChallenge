import React, { useState } from 'react';
import './App.less';
import { Route,withRouter } from 'react-router-dom';
import Login from './pages/Login';
import { MainPage } from './pages/Main';
import { TopicInfo } from './pages/TopicDetail';
import LoginSuccess from './pages/LoginSuccess';
class App extends React.Component<{}, { title: string }> {
  setTitle(title: string) {
    this.setState({
      title: title
    });
  }
  render() {
    return (
      <>
        <Route path="/main" exact component={MainPage} />
        <Route path="/main/index.html" exact component={MainPage} />
        <Route path="/main/login" component={Login} />
        <Route path="/main/login_success" component={LoginSuccess} />
        <Route path="/main/topicdetail/:id" component={ withRouter((props)=><TopicInfo {...props} />)} />
        <Route path="/" exact   component={ withRouter((props)=><MainPage {...props} />)}/>
      </>
    );
  }
}

export default App;
