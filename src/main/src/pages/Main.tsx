import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Bar from '../components/Bar';
import { Button, message, Space, Table, Tag } from 'antd';
import { getUserExamList } from '../service';
import { Link } from 'react-router-dom';

interface ITopicModle {
  /** 测试id */
  Id: string;
  /** 测试题目 */
  Title: string;
  /** 测试所在url */
  URL: string;
  /** 是否已通过测试 */
  IsPassed: boolean;
  /** 最佳用时 */
  TimeCost?: number;
  /** 耗时排名 */
  Rank?: number;
}
export class MainPage extends React.PureComponent {
  state: {
    topics: Array<ITopicModle>;
    isBusy: boolean;
  } = {
    topics: [],
    isBusy: true
  };
  componentDidMount() {
    getUserExamList()
      .then((resp) => {
        if(resp.data?.success) {
          this.setState({
            topics: resp.data?.response?.data ?? [],
            isBusy: false
          });
        }else{
          console.error(message)
          message.error(`获取列表失败，请稍后刷新重试! (${resp.data})`);
        }

      })
      .catch((err: any) => {
        console.error(err,"err")
        message.error(`获取列表失败，请稍后刷新重试! (${err.message})`);
      });
  }
  renderList() {
    const columns = [
      {
        title: ' ',
        width: '4%',
        render: (obj: ITopicModle, record: ITopicModle, idx: number) => <span>{idx + 1}</span>
      },
      {
        title: '题目名称',
        dataIndex: 'Title',
        key: 'Title',
        render: (text: string) => <span>{text}</span>
      },
      {
        title: '是否已通过',
        dataIndex: 'IsPassed',
        key: 'IsPassed',
        render: (passed: boolean) => (passed ? <Tag color="green">已通过</Tag> : <Tag color="red">未通过</Tag>)
      },
      {
        title: '最佳成绩',
        dataIndex: 'TimeCost',
        key: 'TimeCost',
        render: (timeCost: number, recoder: ITopicModle) => (recoder.IsPassed ? <span>{(recoder.TimeCost ?? 0) / 1000}s</span> : '--')
      },
      {
        title: '排名',
        dataIndex: 'Rank',
        key: 'Rank',
        render: (rank: number, recoder: ITopicModle) => (recoder.IsPassed ? <span>{rank}</span> : '--')
      },
      {
        title: '',
        dataIndex: 'Id',
        key: 'Id',
        render: (id: string) => (
          <Space size="middle">
            <Link to={`/main/topicdetail/${id}`}>
              <Button type="primary">
                <span>进入测试</span>
              </Button>
            </Link>
          </Space>
        )
      }
    ];
    return <Table style={{ width: '80%' }} columns={columns} dataSource={this.state.topics} loading={this.state.isBusy} />;
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
