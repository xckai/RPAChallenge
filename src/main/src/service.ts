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
  redirect_uri: `${hostPrefix}/main/login_success`,
  response_type: 'code',
  scope: 'openid profile offline_access rpa_challenge',
  post_logout_redirect_uri: `${hostPrefix}/main/login`
};
const oidcManager = new Oidc.UserManager(config);
let token = '';
(window as any).oidcManager = oidcManager;
axios.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response.status == 401) {
      window.location.href = '/main/login';
    }
    return err;
  }
);
axios.interceptors.request.use((config) => {
  config.headers.common['Authorization'] = token;
  return config;
});
export function doAuthCheck(cb: any) {
  if (window.location.pathname.indexOf('/main/login') >=0 || window.location.pathname.indexOf('/main/login_success') >= 0) {
    cb && cb();
    return;
  } else {
    oidcManager.getUser().then((user) => {
      if (!user) {
        window.location.href = '/main/login';
      } else {
        token = `Bearer ${user.access_token}`;
      }
      cb && cb();
    });
  }
}
export function getUserInfo() {
  return oidcManager.getUser();
}
export function login() {
  return oidcManager.signinRedirect();
}
export function loginCb() {
  return oidcManager.signinRedirectCallback().then((userInfo) => {
    return userInfo;
  });
}
export function clearLoginInfo() {
  oidcManager.clearStaleState();
  oidcManager.removeUser();
  return true;
}
export function logout() {
  return oidcManager.signoutRedirect().then(clearLoginInfo)
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
