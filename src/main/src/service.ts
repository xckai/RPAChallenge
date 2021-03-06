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
  response_mode: 'query',
  scope: 'openid profile offline_access rpa_challenge',
  post_logout_redirect_uri: `${hostPrefix}/main/login`,
  checkSessionInterval: 60000 * 60,
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
};

// Oidc.Log.logger = console;
let token = '';
let crtUserInfo: Oidc.User;
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
  if (window.location.pathname.indexOf('/main/login') >= 0 || window.location.pathname.indexOf('/main/login_success') >= 0) {
    cb && cb();
    return;
  } else {
    new Oidc.UserManager({
      authority: 'https://auth.bottime.com',
      client_id: 'encoo_RPAChallenge',
      response_mode: 'query',
      scope: 'openid profile offline_access rpa_challenge',
      userStore: new Oidc.WebStorageStateStore({
        store: window.localStorage
      })
    })
      .getUser()
      .then((user) => {
        if (!user) {
          window.location.href = '/main/login';
        } else {
          crtUserInfo = user;
          token = `Bearer ${user.access_token}`;
        }
        cb && cb();
      });
  }
}
export function getUserInfo() {
  return Promise.resolve(crtUserInfo);
}
export function login() {
  return new Oidc.UserManager(config).signinRedirect();
}
export function loginCb() {
  return new Oidc.UserManager({
    response_mode: 'query',
    scope: 'openid profile offline_access rpa_challenge',
    userStore: new Oidc.WebStorageStateStore({
      store: window.localStorage
    })
  })
    .signinRedirectCallback()
    .then((userInfo) => {
      if (userInfo.access_token) {
        crtUserInfo = userInfo;
        token = `Bearer ${userInfo.access_token}`;
      }
      return userInfo;
    });
}
export function logout() {
  return new Oidc.UserManager(config).signoutRedirect();
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
