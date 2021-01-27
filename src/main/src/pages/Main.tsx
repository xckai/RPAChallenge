import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Bar from '../components/Bar';
import { Button, Space, Table, Tag } from 'antd';

interface ITopicModle {
  /** 测试id */
  id: string;
  /** 测试题目 */
  title: string;
  /** 测试所在url */
  url: string;
  /** 是否已通过测试 */
  isPassed: boolean;
  /** 最佳用时 */
  timeCost?: number;
  /** 耗时排名 */
  rank?: number;
}
export class MainPage extends React.PureComponent {
  state: {
    Topics: Array<ITopicModle>;
  } = {
    Topics: [
      { id: '0', title: '【基础】 基础表单填写', url: '/apps/base_form/index.html', isPassed: false, rank: 33, timeCost: 11 },
      { id: '11', title: 'daff阿发达acadfasdf', url: '..', isPassed: true, rank: 33, timeCost: 13 },
      { id: '11', title: '阿斯蒂芬', url: '..', isPassed: false, rank: -1, timeCost: -1 },
      { id: '11', title: '大多数', url: '..', isPassed: true, rank: 33, timeCost: 12 }
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
        dataIndex: 'isPassed',
        key: 'isPassed',
        render: (passed: boolean) => (passed ? <Tag color="green">已通过</Tag> : <Tag color="red">未通过</Tag>)
      },
      {
        title: '耗时',
        dataIndex: 'timeCost',
        key: 'timeCost',
        render: (timeCost: number, recoder: ITopicModle) => (timeCost >= 0 ? <span>{recoder.timeCost}s</span> : '--')
      },
      {
        title: '排名',
        dataIndex: 'rank',
        key: 'rank',
        render: (rank: number, recoder: ITopicModle) => (rank >= 0 ? <span>{rank}</span> : '--')
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => (
          <Space size="middle">
            <Button type="ghost">
              <a href={`/main/topicdetail/${id}`}>进入测试</a>
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
