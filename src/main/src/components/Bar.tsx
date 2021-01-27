import React, { useState } from 'react';
import { Layout } from 'antd';
const { Header} = Layout;
export default function Bar(props:{title:string}) {
  return (
    <Header className="header" title="RPA Challenge">
      <div style={{position: "absolute"}}>
        <strong>RPA Challenge</strong>
      </div>
      <div className="mid-title">{props?.title}</div>
      <div className="user-info">{}</div>
    </Header>
  );
}
