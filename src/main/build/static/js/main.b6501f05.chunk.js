(this.webpackJsonpmain=this.webpackJsonpmain||[]).push([[0],{202:function(e,t,n){},203:function(e,t,n){},357:function(e,t,n){"use strict";n.r(t);var i=n(8),s=n(0),r=n.n(s),a=n(27),c=n.n(a),o=(n(202),n(78)),l=n(79),d=n(90),j=n(87),h=n(359),u=(n(203),n(93)),b=n(52),p=n(103),x=n(362),O=n(364),m=n(36),f=n(368),y=n(369),g=h.a.Header;function v(e){return Object(i.jsxs)(g,{className:"header",title:"RPA Challenge",children:[Object(i.jsx)("div",{style:{position:"absolute"},children:Object(i.jsx)("strong",{children:"RPA Challenge"})}),Object(i.jsx)("div",{className:"mid-title",children:null===e||void 0===e?void 0:e.title}),Object(i.jsx)("div",{className:"user-info"})]})}var k=n(45),w=n.n(k),C={labelCol:{span:6},wrapperCol:{span:16}},T={wrapperCol:{offset:0,span:24}};function D(){return Object(i.jsxs)(w.a,{style:{height:"90%",background:"rgb(255,255,255)"},children:[Object(i.jsx)(v,{title:""}),Object(i.jsx)(k.Content,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(i.jsxs)(x.a,Object(p.a)(Object(p.a)({},C),{},{style:{width:"50%",maxWidth:500},children:[Object(i.jsx)(x.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(i.jsx)(O.a,{placeholder:"Username",prefix:Object(i.jsx)(f.a,{})})}),Object(i.jsx)(x.a.Item,{label:"Password",name:"Password",rules:[{required:!0,message:"Please input your password!"}],children:Object(i.jsx)(O.a,{placeholder:"Password",prefix:Object(i.jsx)(y.a,{})})}),Object(i.jsx)(x.a.Item,Object(p.a)(Object(p.a)({},T),{},{children:Object(i.jsx)("div",{style:{display:"flex",justifyContent:"center",width:"100%"},children:Object(i.jsx)(m.a,{type:"primary",htmlType:"submit",children:"\u767b\u5f55"})})}))]}))})]})}var P=n(366),S=n(367),B=n(361),I=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={Topics:[{id:"1",title:"\u3010\u57fa\u7840\u3011 \u57fa\u7840\u8868\u5355\u586b\u5199",url:"/apps/base_form/index.html",isPassed:!1,rank:-1,timeCost:-1}]},e}return Object(l.a)(n,[{key:"renderList",value:function(){var e=[{title:" ",width:"4%",render:function(e,t,n){return Object(i.jsx)("span",{children:n+1})}},{title:"\u9898\u76ee\u540d\u79f0",dataIndex:"title",key:"title",render:function(e){return Object(i.jsx)("span",{children:e})}},{title:"\u662f\u5426\u5df2\u901a\u8fc7",dataIndex:"isPassed",key:"isPassed",render:function(e){return e?Object(i.jsx)(P.a,{color:"green",children:"\u5df2\u901a\u8fc7"}):Object(i.jsx)(P.a,{color:"red",children:"\u672a\u901a\u8fc7"})}},{title:"\u8017\u65f6",dataIndex:"timeCost",key:"timeCost",render:function(e,t){return e>=0?Object(i.jsxs)("span",{children:[t.timeCost,"s"]}):"--"}},{title:"\u6392\u540d",dataIndex:"rank",key:"rank",render:function(e,t){return e>=0?Object(i.jsx)("span",{children:e}):"--"}},{title:"",dataIndex:"id",key:"id",render:function(e){return Object(i.jsx)(S.b,{size:"middle",children:Object(i.jsx)(m.a,{type:"ghost",children:Object(i.jsx)("a",{href:"/main/topicdetail/".concat(e),children:"\u8fdb\u5165\u6d4b\u8bd5"})})})}}];return Object(i.jsx)(B.a,{style:{width:"80%"},columns:e,dataSource:this.state.Topics})}},{key:"render",value:function(){return Object(i.jsxs)(w.a,{style:{height:"100%",background:"rgb(255,255,255)"},children:[Object(i.jsx)(v,{title:"\u9898\u76ee\u5217\u8868"}),Object(i.jsx)(k.Content,{style:{display:"flex",justifyContent:"center"},children:this.renderList()})]})}}]),n}(r.a.PureComponent),F=n(365),L=n(190),R=n(363),H=n(360),M=n(102),_=n(186),N=n.n(_),A=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(o.a)(this,n);for(var i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={isTestBegin:!1,showDetail:!0,topicDetail:{title:"\u3010\u57fa\u7840\u3011 \u57fa\u7840\u8868\u5355\u586b\u5199",url:"/base_form/index.html",name:"base_form",introductionHTMLStr:"<strong>\u8bf7\u4f7f\u7528RPA\u586b\u5199\u8868\u5355\u5b57\u6bb5\uff0c\u5e76\u63d0\u4ea4\u8868\u5355</strong><br/>\u59d3\u540d\uff1a \u5f20\u5c0f\u6269<br/>\n                            \u6027\u522b\uff1a \u7537<br/> \u5e74\u9f84\uff1a 20<br/>\n                            \u51fa\u751f\u5e74\u6708\u65e5\uff1a 2000-01-01 <br/>\n                            \u5a5a\u59fb\u72b6\u51b5\uff1a \u4fdd\u5bc6<br/>\n                            \u4f4f\u5740\uff1a \u4e2d\u56fd\u4e0a\u6d77\u5e02\u5f90\u6c47\u533a\u8679\u6885\u56fd\u9645\u5e7f\u573a902\u5ba4<br/>\n                            \u540c\u610f\u7528\u6237\u6761\u4f8b\n                            "}},e.frameRef=r.a.createRef(),e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e,t,n,i=null===(e=this.props)||void 0===e||null===(t=e.match)||void 0===t||null===(n=t.params)||void 0===n?void 0:n.id;this.setState({id:i})}},{key:"onBeginTestBtn",value:function(){this.setState({isTestBegin:!0,showDetail:!1})}},{key:"onSwitchViewBtn",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"onSubmitBtn",value:function(){var e=this;F.a.confirm({title:"\u8bf7\u786e\u8ba4",icon:Object(i.jsx)(M.a,{}),content:"\u786e\u8ba4\u63d0\u4ea4\u672c\u6b21\u6d4b\u8bd5\u7ed3\u679c?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){try{var t;(null===(t=e.frameRef.current)||void 0===t?void 0:t.contentWindow).getExamResult().then((function(t){console&&console.log(t),N.a.post("/submit",{data:t,appName:e.state.topicDetail.name}).then((function(e){var t;e.data.passed?F.a.success({title:"\u901a\u8fc7\u6d4b\u8bd5",content:Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{children:["\u7528\u65f6\uff1a",Object(i.jsx)("span",{style:{fontWeight:"bold"},children:"1390"})," ms"]}),Object(i.jsxs)("div",{children:["\u5f53\u524d\u6392\u540d\uff1a",Object(i.jsx)("span",{style:{fontWeight:"bold"},children:"100"})]})]}),onOk:function(){window.location.href="/main/index.html"}}):L.b.error(null!==(t=e.data.result)&&void 0!==t?t:"\u672a\u901a\u8fc7\u6821\u9a8c\uff0c\u8bf7\u68c0\u67e5\u4fee\u6539\u540e\u91cd\u65b0\u63d0\u4ea4\uff01")})).catch((function(e){console&&console.error(e),L.b.error(e)}))})).catch((function(e){console&&console.error(e),L.b.error(e)}))}catch(n){console&&console.error(JSON.stringify(n.message)),L.b.error(JSON.stringify(n.message))}}})}},{key:"renderTestPage",value:function(){var e,t;return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)(k.Content,{style:{position:"relative"},children:[Object(i.jsx)("iframe",{src:this.state.topicDetail.url,height:"100%",width:"100%",ref:this.frameRef}),Object(i.jsxs)("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,visibility:this.state.showDetail?"initial":"hidden",background:"#fff"},children:[Object(i.jsx)(R.a,{title:(null===(e=this.state.topicDetail)||void 0===e?void 0:e.title)+(null!==(t=this.state.topicDetail.id)&&void 0!==t?t:"")}),Object(i.jsx)(H.a,{style:{margin:"0 0 10px 0"}}),Object(i.jsx)("div",{style:{padding:"0 10px 20px 10px"},dangerouslySetInnerHTML:{__html:this.state.topicDetail.introductionHTMLStr||""}})]})]})})}},{key:"renderDetailPage",value:function(){var e,t;return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)(k.Content,{children:[Object(i.jsx)(R.a,{title:(null===(e=this.state.topicDetail)||void 0===e?void 0:e.title)+(null!==(t=this.state.topicDetail.id)&&void 0!==t?t:"")}),Object(i.jsx)(H.a,{style:{margin:"0 0 10px 0"}}),Object(i.jsx)("div",{style:{padding:"0 10px 20px 10px"},dangerouslySetInnerHTML:{__html:this.state.topicDetail.introductionHTMLStr||""}})]})})}},{key:"renderFooder",value:function(){return this.state.isTestBegin?Object(i.jsxs)(k.Footer,{style:{padding:"8px 50px 5px 50px"},children:[Object(i.jsx)(m.a,{style:{float:"right"},type:"primary",danger:!0,onClick:this.onSubmitBtn.bind(this),children:"\u63d0\u4ea4"}),Object(i.jsx)(m.a,{style:{float:"right",marginLeft:10,marginRight:10},type:"ghost",onClick:this.onSwitchViewBtn.bind(this),children:"\u5207\u6362\u89c6\u56fe"})]}):Object(i.jsx)(k.Footer,{style:{padding:"8px 50px 5px 50px"},children:Object(i.jsx)(m.a,{style:{float:"right"},type:"primary",onClick:this.onBeginTestBtn.bind(this),children:"\u5f00\u59cb\u6d4b\u8bd5"})})}},{key:"render",value:function(){var e;return Object(i.jsxs)(h.a,{style:{height:"100%",background:"rgb(255,255,255)"},children:[Object(i.jsx)(v,{title:this.state.isTestBegin&&!this.state.showDetail?null!==(e=this.state.topicDetail.title)&&void 0!==e?e:"":"\u8be6\u60c5"}),this.state.isTestBegin?this.renderTestPage():this.renderDetailPage(),this.renderFooder()]})}}]),n}(s.PureComponent),J=(h.a.Header,h.a.Footer,h.a.Sider,h.a.Content,Object(b.a)()),W=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"setTitle",value:function(e){this.setState({title:e})}},{key:"render",value:function(){return Object(i.jsxs)(u.b,{history:J,children:[Object(i.jsx)(u.a,{path:"/main",exact:!0,component:I}),Object(i.jsx)(u.a,{path:"/main/index.html",exact:!0,component:I}),Object(i.jsx)(u.a,{path:"/main/login",component:D}),Object(i.jsx)(u.a,{path:"/main/topicdetail/:id",component:A})]})}}]),n}(r.a.Component),q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,370)).then((function(t){var n=t.getCLS,i=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),i(e),s(e),r(e),a(e)}))};c.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(W,{})}),document.getElementById("root")),q()}},[[357,1,2]]]);
//# sourceMappingURL=main.b6501f05.chunk.js.map