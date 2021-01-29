import { default as axios } from 'axios';
import Oidc from 'oidc-client';

interface ICommonResp<T> {
  status: Number;
  success: Boolean;
  msg: String;
  response: T;
}
const hostPrefix = `${window.location.protocol}//${window.location.host}`;
const config = {
  authority: 'https://auth.bottime.com',
  client_id: 'encoo_RPAChallenge',
  redirect_uri: `${hostPrefix}/main/index.html`,
  response_type: 'code',
  scope: 'openid profile offline_access rpa_challenge',
  post_logout_redirect_uri: `${hostPrefix}/main/logout`
};
const oidcManager = new Oidc.UserManager(config);
(window as any).oidcManager = oidcManager;
axios.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response.status == 401) {
      oidcManager.signinRedirect().then(()=>{
        oidcManager.signinRedirectCallback(window.location.href).then(info=>{

        })
      })
    }
    return err;
  }
);

export function getUserInfo() {
  return (window as any).currentUser ? Promise.resolve((window as any).currentUser) : oidcManager.getUser().then(function (user) {
    if (user) {
      (window as any).currentUser = user;
      return Promise.resolve(user);
    } else {
      oidcManager.signinRedirect().then(()=>{
        oidcManager.signinRedirectCallback(window.location.href).then(info=>{

        })
      })
    }
  });
}
export function login(user: string, passwd: string) {
  return axios.post<ICommonResp<string>>('/api/userlogin/login', {
    account: user,
    pass: passwd
  });
}
export function logout() {
  return oidcManager.signoutRedirect();
}
/** 提交考试结果 */
export function submit(postData: { appName: string; data: any; testId: string }) {
  return axios.post<{ isPassed: boolean; result?: string; timeout: string }>('/submit', postData);
}
export function getUserExamList() {
  return axios.get<
    ICommonResp<{
      Page: number;
      PageCount: number;
      DataCount: number;
      PageSize: number;
      data: Array<{
        Id: number;
        Title: string;
        IntroductionHTMLStr: string;
        URL: string;
        TimeCost: number;
        IsPassed: boolean;
        Rank: number;
      }>;
    }>
  >('/api/rpaexaminfo/getuserrpaexamlist', {
    params: {
      pageIndex: 1,
      pageSize: 1000
    }
  });
}
export function getDetail(testId: string) {
  return axios.get<
    ICommonResp<{
      Id: number;
      Title: string;
      IntroductionHTMLStr: string;
      URL: string;
      TimeCost: number;
      IsPassed: boolean;
      Rank: number;
    }>
  >('/api/rpaexaminfo/getrpaexamdetailinfo', {
    params: {
      testId: testId
    }
  });
}
export function challengeStart(id: string) {
  return axios.post<ICommonResp<boolean>>(`/api/rpachallenge/challengestart?testId=${id}`, {
    testId: id
  });
}
