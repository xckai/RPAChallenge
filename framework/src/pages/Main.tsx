import Layout, { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import Bar from '../components/Bar';
import { Button, Space, Table, Tag } from 'antd';

interface ITopicModle {
  id: string;
  title: string;
  url: string;
  passed: boolean;
  rank: number;
}
export class MainPage extends React.PureComponent {
  state: {
    Topics: Array<ITopicModle>;
  } = {
    Topics: [
      { id: '11', title: 'daffacadfasdf', url: '..', passed: true, rank: 33 },
      { id: '11', title: 'daff阿发达acadfasdf', url: '..', passed: true, rank: 33 },
      { id: '11', title: '阿斯蒂芬', url: '..', passed: false, rank: 33 },
      { id: '11', title: '大多数', url: '..', passed: true, rank: 33 }
    ]
  };
  renderList() {
    const columns = [
      {
        title: ' ',
        width: '4%',
        render: (obj: ITopicModle, record: ITopicModle, idx: number) => <span>{idx + 1}</span>
      },
      {
        title: '题目名称',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <span>{text}</span>
      },
      {
        title: '是否已通过',
        dataIndex: 'passed',
        key: 'passed',
        render: (passed: boolean) => (passed ? <Tag color="green">已通过</Tag> : <Tag color="red">未通过</Tag>)
      },
      {
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Button type="ghost">
              <a>进入测试</a>
            </Button>
          </Space>
        )
      }
    ];
    return <Table style={{ width: '80%' }} columns={columns} dataSource={this.state.Topics} />;
  }
  render() {
    return (
      <Layout style={{ height: '100%', background: 'rgb(255,255,255)' }}>
        <Bar title="题目列表" />
        <Content style={{ display: 'flex', justifyContent: 'center' }}>{this.renderList()}</Content>
      </Layout>
    );
  }
}
