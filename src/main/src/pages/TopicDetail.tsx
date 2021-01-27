import { Button, Divider, Layout, PageHeader, Modal, message } from 'antd';
import React, { PureComponent } from 'react';
import Bar from '../components/Bar';
import { Content, Footer } from 'antd/lib/layout/layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { default as axios } from 'axios';
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
  name?: string;
}
export class TopicInfo extends PureComponent<Partial<IProps>> {
  state: IState = {
    isTestBegin: false,
    showDetail: true,
    topicDetail: {
      title: '【基础】 基础表单填写',
      url: '/base_form/index.html',
      name: 'base_form',
      introductionHTMLStr: `<strong>请使用RPA填写表单字段，并提交表单</strong><br/>姓名： 张小扩<br/>
                            性别： 男<br/> 年龄： 20<br/>
                            出生年月日： 2000-01-01 <br/>
                            婚姻状况： 保密<br/>
                            住址： 中国上海市徐汇区虹梅国际广场902室<br/>
                            同意用户条例
                            `
    }
  };
  frameRef = React.createRef<HTMLIFrameElement>();
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
      cancelText: '取消',
      onOk: () => {
        try {
          let frameWin: any = this.frameRef.current?.contentWindow;
          frameWin
            .getExamResult()
            .then((data: any) => {
              console && console.log(data);
              axios
                .post('/submit', {
                  data: data,
                  appName: this.state.topicDetail.name
                })
                .then((res) => {
                  res.data.passed ?
                  Modal.success({
                    title: '通过测试',
                    content: (
                      <div>
                        <div>
                          用时：<span style={{ fontWeight: 'bold' }}>1390</span> ms
                        </div>
                        <div>
                          当前排名：<span style={{ fontWeight: 'bold' }}>100</span>
                        </div>
                      </div>
                    ),
                    onOk() {
                      (window.location as any).href = '/main/index.html';
                    }
                  }):
                  message.error(res.data.result ?? "未通过校验，请检查修改后重新提交！" );
                })
                .catch((err) => {
                  console && console.error(err);
                  message.error(err);
                });
            })
            .catch((err: any) => {
              console && console.error(err);
              message.error(err);
            });
        } catch (ex) {
          console && console.error(JSON.stringify(ex.message));
          message.error(JSON.stringify(ex.message));
        }
      }
    });
  }
  renderTestPage() {
    return (
      <>
        <Content style={{ position: 'relative' }}>
          <iframe src={this.state.topicDetail.url} height="100%" width="100%" ref={this.frameRef}></iframe>
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
