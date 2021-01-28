import { Button, Divider, Layout, PageHeader, Modal, message } from 'antd';
import React, { PureComponent } from 'react';
import Bar from '../components/Bar';
import { Content, Footer } from 'antd/lib/layout/layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { challengeStart, getDetail, submit } from '../service';
import { Spin } from 'antd';

interface IProps {
  match: {
    params: { id: string };
  };
}
interface IState {
  isTestBegin: boolean;
  showDetail: boolean;
  topicDetail: ITopicDetail;
  isBusy: boolean;
}
interface ITopicDetail {
  /** 测试ID */
  Id?: string;
  /** 测试名称 */
  Title?: string;
  /** 测试说明 */
  IntroductionHTMLStr?: string;
  /** 测试页面URL */
  URL?: string;
  Name?: string;
}
export class TopicInfo extends PureComponent<Partial<IProps>> {
  state: IState = {
    isTestBegin: false,
    showDetail: true,
    topicDetail: {},
    isBusy: true
  };

  frameRef = React.createRef<HTMLIFrameElement>();
  componentDidMount() {
    const id = this.props?.match?.params?.id;
    if (id === '' || id === undefined) {
      message.error('无法读取当前考试信息ID，请退出后重试!');
      return;
    }
    this.setState({ id });
    getDetail(id)
      .then((resp) => {
        let topicDetail = resp.data.response;
        let name = topicDetail.URL.split('/')[1];
        this.setState({
          topicDetail: {
            ...topicDetail,
            Name: name
          },
          isBusy: false
        });
      })
      .catch((err: any) => {
        message.error(`读取当前测试信息错误，请退出后重试！(${err.message})`);
      });
  }
  onBeginTestBtn() {
    challengeStart(this.state.topicDetail.Id ?? '')
      .then(() => {
        this.setState({
          isTestBegin: true,
          showDetail: false
        });
      })
      .catch((err: any) => {
        message.error(`无法启动测试，请退出后重试！(${err.message})`);
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
              submit({
                data: data,
                appName: this.state.topicDetail.Name || '',
                testId: this.state.topicDetail.Id ?? ''
              })
                .then((res) => {
                  res.data.isPassed
                    ? Modal.success({
                        title: '通过测试',
                        content: (
                          <div>
                            <div>
                              用时：<span style={{ fontWeight: 'bold' }}>{res.data.timeout ?? '--'}</span> ms
                            </div>
                          </div>
                        ),
                        onOk() {
                          (window.location as any).href = '/main/index.html';
                        }
                      })
                    : message.error(res.data.result ?? '未通过校验，请检查修改后重新提交！');
                })
                .catch((err) => {
                  console && console.error(err);
                  message.error(err.message);
                });
            })
            .catch((err: string) => {
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
          <iframe src={this.state.topicDetail.URL} height="100%" width="100%" ref={this.frameRef}></iframe>
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
            <PageHeader title={this.state.topicDetail?.Title + (this.state.topicDetail.Id ?? '')} />
            <Divider style={{ margin: '0 0 10px 0' }} />
            <div
              style={{ padding: '0 10px 20px 10px' }}
              dangerouslySetInnerHTML={{ __html: this.state.topicDetail.IntroductionHTMLStr || '' }}
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
          <PageHeader title={this.state.topicDetail?.Title} />
          <Divider style={{ margin: '0 0 10px 0' }} />
          <div
            style={{ padding: '0 10px 20px 10px' }}
            dangerouslySetInnerHTML={{ __html: this.state.topicDetail.IntroductionHTMLStr || '' }}
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
      <Layout style={{ height: '100%', width: '100%', background: 'rgb(255,255,255)' }}>
        <Bar title={this.state.isTestBegin && !this.state.showDetail ? this.state.topicDetail.Title ?? '' : '详情'} />
        {this.state.isBusy && <Spin tip="加载中..." />}
        {this.state.isTestBegin ? this.renderTestPage() : this.renderDetailPage()}
        {this.renderFooder()}
      </Layout>
    );
  }
}
