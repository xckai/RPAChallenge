import { Divider, Layout, PageHeader } from 'antd';
import React, { PureComponent } from 'react';
import Bar from '../components/Bar';
interface IProps {}
interface ITopicDetail {
  id?: string;
  title?: string;
  introductionHTMLStr?: string;
}
export class TopicInfo extends PureComponent<Partial<IProps>> {
  state: { topicDetail: ITopicDetail } = {
    topicDetail: {
      title: '啊哈哈哈哈哈哈',
      introductionHTMLStr:
        '卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡<br/> <strong>非拉科技噢诶</strong> as代理费为加快了甲方可垃圾大法师打发第三方碍事法师打发点阿斯蒂芬的福利卡解锁口令费劲哎栾克军啦返回搞个地方，卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡非拉科技噢诶as代理费为加快了甲方可垃圾的福利卡解锁口令费劲哎栾克军啦返回搞个地方，卡速度快发卡联发科九分裤拉法基阿里斯顿会计法开发机奥斯卡了房价奥斯卡非拉科技噢诶as代理费为加快了甲方可垃圾的福利卡解锁口令费劲哎栾克军啦返回搞个地方'
    }
  };
  render() {
    return (
      <Layout style={{ height: '100%', background: 'rgb(255,255,255)' }}>
        <Bar title="题目详情" />
        <div>
          <PageHeader title={this.state.topicDetail?.title} />
          <Divider style={{ margin: '0 0' }} />
          <div
            style={{ padding: '0 10px 20px 10px' }}
            dangerouslySetInnerHTML={{ __html: this.state.topicDetail.introductionHTMLStr || '' }}
          ></div>
        </div>
      </Layout>
    );
  }
}
