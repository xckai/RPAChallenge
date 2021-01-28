import { default as axios } from 'axios';
interface ICommonResp<T> {
  status: Number;
  success: Boolean;
  msg: String;
  response: T;
}
axios.interceptors.response.use(resp=>resp, err =>{
  if(err.response.status == 401) {
    window.location.href = "/main/login"
  }
  return err;
})
export function login(user: string, passwd: string) {
  return axios.post<ICommonResp<string>>('/api/userlogin/login', {
    account: user,
    pass: passwd
  })
}
export function logout() {
  return axios.post<ICommonResp<string>>('/api/userlogin/loginout');
}
/** 提交考试结果 */
export function submit(postData: { appName: string; data: any ,testId: string}) {
  return axios.post<{ isPassed: boolean; result?: string,timeout: string }>('/submit', postData);
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
export function getDetail(testId:string) {
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
      testId: testId}
  });
}
export function challengeStart(id: string) {
  return axios.post<ICommonResp<boolean>>(`/api/rpachallenge/challengestart?testId=${id}`, {
    testId: id
  });
}
