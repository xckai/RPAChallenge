import { Button, Divider, Layout, PageHeader, Modal, message } from 'antd';
import React, { PureComponent } from 'react';
import Bar from '../components/Bar';
import { Content, Footer } from 'antd/lib/layout/layout';
import { ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
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
  getTopicIndexPageURL(url: string = '') {
    if (url.indexOf('index.html') == -1) {
      return url + '/index.html';
    }
    return url;
  }
  getIntroductionPageURL() {
    return this.state.topicDetail?.Name ? `/${this.state.topicDetail.Name}/introduction.html` : '';
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
                    : Modal.confirm({
                        icon: <CloseCircleOutlined />,
                        title: '未通过测试',
                        content: <p>{res.data.result ?? '未通过校验，请检查修改后重新提交！'}</p>,
                        okText: '重新开始',
                        cancelText: '返回修改',
                        onOk: () =>
                          this.setState({
                            isTestBegin: false,
                            showDetail: true
                          })
                      });
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
          <iframe src={this.getTopicIndexPageURL(this.state.topicDetail.URL)} height="100%" width="100%" ref={this.frameRef}></iframe>
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
            <iframe src={this.getIntroductionPageURL()} height="100%" width="100%"></iframe>
            {/* <PageHeader title={this.state.topicDetail?.Title + (this.state.topicDetail.Id ?? '')} />
            <Divider style={{ margin: '0 0 10px 0' }} />
            <div
              style={{ padding: '0 10px 20px 10px' }}
              dangerouslySetInnerHTML={{ __html: this.state.topicDetail.IntroductionHTMLStr || '' }}
            ></div> */}
          </div>
        </Content>
      </>
    );
  }
  renderDetailPage() {
    return (
      <Content style={{ position: 'relative' }}>
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
          <iframe src={this.getIntroductionPageURL()} height="100%" width="100%"></iframe>
        </div>
      </Content>
    );
  }
  renderFooder() {
    return this.state.isTestBegin ? (
      <Footer style={{ padding: '8px 50px 5px 50px' }}>
        <Button style={{ float: 'right' }} type="primary" danger onClick={this.onSubmitBtn.bind(this)}>
          提交
        </Button>
        <Button style={{ float: 'right', marginLeft: 10, marginRight: 10 }} type="primary" onClick={this.onSwitchViewBtn.bind(this)}>
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
        <Bar title={this.state.topicDetail.Title ?? '详情页'} />
        <Spin tip="正在读取详情信息..." spinning={this.state.isBusy} wrapperClassName="full-screen">
          {this.state.isTestBegin ? this.renderTestPage() : this.renderDetailPage()}
          {this.renderFooder()}
        </Spin>
      </Layout>
    );
  }
}
