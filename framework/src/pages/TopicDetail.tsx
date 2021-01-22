import { Button, Divider, Layout, PageHeader, Modal } from 'antd';
import React, { PureComponent } from 'react';
import Bar from '../components/Bar';
import { Content, Footer } from 'antd/lib/layout/layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
  match: {
    params: { id: string };
  };
}
interface IState {
  isTestBegin: boolean;
  showDetail: boolean;
  topicDetail: ITopicDetail;
}
interface ITopicDetail {
  /** 测试ID */
  id?: string;
  /** 测试名称 */
  title?: string;
  /** 测试说明 */
  introductionHTMLStr?: string;
  /** 测试页面URL */
  url?: string;
}
export class TopicInfo extends PureComponent<Partial<IProps>> {
  state: IState = {
    isTestBegin: false,
    showDetail: true,
    topicDetail: {
      title: '啊哈哈哈哈哈哈',
      url: 'https://www.baidu.com',
      introductionHTMLStr:
        '卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡<br/> <strong>非拉科技噢诶</strong> as代理费为加快了甲方可垃圾大法师打发第三方碍事法师打发点阿斯蒂芬的福利卡解锁口令费劲哎栾克军啦返回搞个地方，卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡非拉科技噢诶as代理费为加快了甲方可垃圾的福利卡解锁口令费劲哎栾克军啦返回搞个地方，卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡非拉科技噢诶as代理费为加快了甲方可垃圾的福利卡解锁口令费劲哎栾克军啦返回搞个地方'
    }
  };
  componentDidMount() {
    const id = this.props?.match?.params?.id;
    this.setState({ id });
  }
  onBeginTestBtn() {
    this.setState({
      isTestBegin: true,
      showDetail: false
    });
  }
  onSwitchViewBtn() {
    this.setState({
      showDetail: !this.state.showDetail
    });
  }
  onSubmitBtn() {
    Modal.confirm({
      title: '请确认',
      icon: <ExclamationCircleOutlined />,
      content: '确认提交本次测试结果?',
      okText: '确认',
      cancelText: '取消'
    });
  }
  renderTestPage() {
    return (
      <>
        <Content style={{ position: 'relative' }}>
          <iframe src={this.state.topicDetail.url} height="100%" width="100%"></iframe>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              visibility: !this.state.showDetail ? 'hidden' : 'initial',
              background: '#fff'
            }}
          >
            <PageHeader title={this.state.topicDetail?.title + (this.state.topicDetail.id ?? '')} />
            <Divider style={{ margin: '0 0 10px 0' }} />
            <div
              style={{ padding: '0 10px 20px 10px' }}
              dangerouslySetInnerHTML={{ __html: this.state.topicDetail.introductionHTMLStr || '' }}
            ></div>
          </div>
        </Content>
      </>
    );
  }
  renderDetailPage() {
    return (
      <>
        <Content>
          <PageHeader title={this.state.topicDetail?.title + (this.state.topicDetail.id ?? '')} />
          <Divider style={{ margin: '0 0 10px 0' }} />
          <div
            style={{ padding: '0 10px 20px 10px' }}
            dangerouslySetInnerHTML={{ __html: this.state.topicDetail.introductionHTMLStr || '' }}
          ></div>
        </Content>
      </>
    );
  }
  renderFooder() {
    return this.state.isTestBegin ? (
      <Footer style={{ padding: '8px 50px 5px 50px' }}>
        <Button style={{ float: 'right' }} type="primary" danger onClick={this.onSubmitBtn.bind(this)}>
          提交
        </Button>
        <Button style={{ float: 'right', marginLeft: 10, marginRight: 10 }} type="ghost" onClick={this.onSwitchViewBtn.bind(this)}>
          切换视图
        </Button>
      </Footer>
    ) : (
      <Footer style={{ padding: '8px 50px 5px 50px' }}>
        <Button style={{ float: 'right' }} type="primary" onClick={this.onBeginTestBtn.bind(this)}>
          开始测试
        </Button>
      </Footer>
    );
  }
  render() {
    return (
      <Layout style={{ height: '100%', background: 'rgb(255,255,255)' }}>
        <Bar title={this.state.isTestBegin && !this.state.showDetail ? this.state.topicDetail.title ?? '' : '详情'} />
        {this.state.isTestBegin ? this.renderTestPage() : this.renderDetailPage()}
        {this.renderFooder()}
      </Layout>
    );
  }
}
