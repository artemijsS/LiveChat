(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{127:function(e,t,a){"use strict";a.r(t);var s=a(2),c=a(1),n=a.n(c),i=a(19),l=a.n(i),r=(a(74),a(6)),o=a(9),d=a(5),j=a(25),b=a(0),h=function(){return Object(b.jsx)("div",{className:"header bg-overlay"})},u=function(){var e=Object(c.useState)(""),t=Object(o.a)(e,2),a=(t[0],t[1]);return Object(b.jsx)("div",{className:"search",children:Object(b.jsx)("div",{className:"box",children:Object(b.jsxs)("div",{className:"input-box",children:[Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"})}),Object(b.jsx)("input",{onChange:function(e){return a(e.target.value)},type:"text",placeholder:"\u041f\u043e\u0438\u0441\u043a \u0438\u043b\u0438 \u043d\u043e\u0432\u044b\u0439 \u0447\u0430\u0442"})]})})})},O=a(21),g=a.n(O),m=function(e){return{type:"LOADING_USER",payload:e}},x=a(68),p=a(22),v={userData:{},loading:!1},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_LOGIN":return Object(s.a)(Object(s.a)({},e),{},{userData:t.payload});case"USER_LOGOUT":return Object(s.a)(Object(s.a)({},e),{},{userData:{}});default:return e}},w={userLoading:!0},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOADING_USER":return Object(s.a)(Object(s.a)({},e),{},{userLoading:t.payload});default:return e}},E=a(13),S={dialogs:{},dialogsOrder:[],activeDialog:""},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DIALOGS_SET":return Object(s.a)(Object(s.a)({},e),{},{dialogs:t.payload});case"DIALOG_ACTIVE_SET":return Object(s.a)(Object(s.a)({},e),{},{activeDialog:t.payload});case"DIALOG_ORDER_SET":return Object(s.a)(Object(s.a)({},e),{},{dialogsOrder:t.payload});case"DIALOG_USER_ONLINE_SET":return Object(s.a)(Object(s.a)({},e),{},{dialogs:Object(s.a)(Object(s.a)({},e.dialogs),{},Object(E.a)({},t.dialogId,Object(s.a)(Object(s.a)({},e.dialogs[t.dialogId]),{},{status:t.payload})))});case"DIALOG_LAST_MESSAGE_SET":return Object(s.a)(Object(s.a)({},e),{},{dialogs:Object(s.a)(Object(s.a)({},e.dialogs),{},Object(E.a)({},t.dialogId,Object(s.a)(Object(s.a)({},e.dialogs[t.dialogId]),{},{dialog:Object(s.a)(Object(s.a)({},e.dialogs[t.dialogId].dialog),{},{last_message:t.payload.text,last_message_time:t.payload.time,last_message_owner:t.payload.owner,last_message_status:t.payload.status})})))});case"DIALOG_ORDER_CHANGE":var a=e.dialogsOrder,c=t.payload;return a.splice(a.indexOf(c),1),a.unshift(c),Object(s.a)(Object(s.a)({},e),{},{dialogsOrder:a});case"DIALOG_NEW_SET":var n=e.dialogsOrder;return n.unshift(t.dialogId),Object(s.a)(Object(s.a)({},e),{},{dialogs:Object(s.a)(Object(s.a)({},e.dialogs),{},Object(E.a)({},t.dialogId,t.payload)),dialogsOrder:n});case"DIALOG_LAST_MESSAGE_STATUS_SET":return Object(s.a)(Object(s.a)({},e),{},{dialogs:Object(s.a)(Object(s.a)({},e.dialogs),{},Object(E.a)({},t.dialogId,Object(s.a)(Object(s.a)({},e.dialogs[t.dialogId]),{},{dialog:Object(s.a)(Object(s.a)({},e.dialogs[t.dialogId].dialog),{},{last_message_status:t.payload})})))});default:return e}},y={newMessages:[],status:null},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MESSAGES_NEW_SET":var a;return e.newMessages?(a=e.newMessages).unshift(t.payload):a=[t.payload],Object(s.a)(Object(s.a)({},e),{},{newMessages:a});case"MESSAGES_NEW_STATUS_SET":var c=e.newMessages;return c.map((function(e){e.status=!0})),Object(s.a)(Object(s.a)({},e),{},{newMessages:c});case"MESSAGES_NEW_DELETE":return Object(s.a)(Object(s.a)({},e),{},{newMessages:[]});case"MESSAGES_STATUS_SET":return Object(s.a)(Object(s.a)({},e),{},{status:!e.status});case"MESSAGES_NEW_ID_SET":for(var n=e.newMessages,i=0;i<n.length;i++)"none"===n[i]._id&&(n[i]._id=t.payload,i=n.length);return Object(s.a)(Object(s.a)({},e),{},{newMessages:n});default:return e}},A=Object(p.c)({user:f,loading:_,dialog:N,message:I}),k=a(69),L=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||p.d,T=Object(p.e)(A,L(Object(p.a)(k.a))),D=function(e){return{type:"MESSAGES_NEW_SET",payload:e}},M=Object(x.io)();M.on("userOnline",(function(e){T.dispatch(B(e.dialogId,e.status))})),M.on("newMessage",(function(e){T.getState().dialog.activeDialog===e.dialogId&&(T.dispatch(D(e)),M.emit("messageAllStatus",{dialogId:e.dialogId,id:T.getState().user.userData.userId})),T.dispatch(U(e.dialogId,e)),T.getState().dialog.activeDialog===e.dialogId&&T.dispatch(V(e.dialogId)),T.getState().dialog.dialogsOrder[0]!==e.dialogId&&T.dispatch(W(e.dialogId))})),M.on("newDialog",(function(e){T.dispatch(H(e.dialogId,e.newDialog))})),M.on("messageAllStatus",(function(e){T.dispatch(V(e.dialogId)),T.getState().dialog.activeDialog===e.dialogId&&(T.dispatch({type:"MESSAGES_STATUS_SET"}),T.dispatch({type:"MESSAGES_NEW_STATUS_SET"}))})),M.on("newMessageId",(function(e){T.dispatch(function(e){return{type:"MESSAGES_NEW_ID_SET",payload:e}}(e))}));var C=M,G=function(e){return function(t){return g.a.get("/api/dialog/find",{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){t(R(e.data.answer)),t(z(e.data.order)),t(m(!1))}))}},z=function(e){return{type:"DIALOG_ORDER_SET",payload:e}},F=function(e){return{type:"DIALOG_ACTIVE_SET",payload:e}},R=function(e){return{type:"DIALOGS_SET",payload:e}},B=function(e,t){return{type:"DIALOG_USER_ONLINE_SET",payload:t,dialogId:e}},U=function(e,t){return{type:"DIALOG_LAST_MESSAGE_SET",payload:t,dialogId:e}},W=function(e){return{type:"DIALOG_ORDER_CHANGE",payload:e}},H=function(e,t){return{type:"DIALOG_NEW_SET",payload:t,dialogId:e}},V=function(e){return{type:"DIALOG_LAST_MESSAGE_STATUS_SET",payload:!0,dialogId:e}},q=a.p+"static/media/logo.c88f8f34.jpg",P=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.dialog})),a=t.dialogs,s=t.activeDialog,c=t.dialogsOrder,n=Object(d.c)((function(e){return e.user})).userData;return Object(b.jsxs)("div",{className:"dialogs",children:[a!=={}&&c.map((function(t){var c=a[t];return Object(b.jsxs)("div",{onClick:function(){e(F(t))},className:s===t?"dialog active":"dialog",children:[Object(b.jsx)("img",{src:q,alt:"error"}),Object(b.jsxs)("div",{className:"details",children:[Object(b.jsxs)("div",{className:"dialog-info1",children:[Object(b.jsx)("div",{className:"dialog-name big-text ".concat(c.dialog.last_message_owner===n.userId||c.dialog.last_message_status?"":"bold"),children:c.name}),Object(b.jsx)("div",{className:"mssg-time ".concat(c.dialog.last_message_owner===n.userId||c.dialog.last_message_status?"":"black bold"),children:c.dialog.last_message_time?c.dialog.last_message_time.split(" ")[1]:""})]}),Object(b.jsxs)("div",{className:"last-message_notification",children:[Object(b.jsxs)("div",{className:"last-message big-text ".concat(c.dialog.last_message_owner!==n.userId?"noPadding":""),children:[c.dialog.last_message&&Object(b.jsx)("span",{className:c.dialog.last_message_owner===n.userId?"".concat(c.dialog.last_message_status?"opened":""):"none",children:Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",width:"18",height:"18",children:Object(b.jsx)("path",{fill:"currentColor",d:"M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"})})}),Object(b.jsx)("span",{className:c.dialog.last_message_owner===n.userId||c.dialog.last_message_status?"":"black",children:c.dialog.last_message})]}),c.dialog.last_message_owner!==n.userId&&!c.dialog.last_message_status&&Object(b.jsx)("div",{className:"notification",children:Object(b.jsx)("span",{children:"!"})})]})]})]},t)})),0===c.length&&Object(b.jsxs)("div",{className:"no_chat",children:[Object(b.jsx)("p",{children:"You don't have any active chats yet."}),Object(b.jsx)("p",{children:"Use search to find friends!"})]})]})},J=function(){var e=Object(d.c)((function(e){return e.dialog})).activeDialog,t=Object(d.c)((function(e){return e.user.userData})),a=t.token,s=t.userId,n=Object(d.c)((function(e){return e.message})),i=n.newMessages,l=n.status,r=Object(c.useState)([]),j=Object(o.a)(r,2),h=j[0],u=j[1],O=Object(c.useState)(!0),m=Object(o.a)(O,2),x=m[0],p=m[1];return Object(c.useEffect)((function(){p(!0),g.a.get("/api/message/find/".concat(e),{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){u(e.data),p(!1)}),(function(e){console.log(e),p(!1)}))}),[e,a]),Object(c.useEffect)((function(){if(null!==l)for(var e=document.querySelectorAll(".time-status svg.notOpened"),t=0;t<e.length;t++)e[t].className.baseVal="opened"}),[l]),Object(b.jsxs)("div",{className:"chat",children:[i&&i.map((function(e,t){return Object(b.jsxs)("div",{className:"message-block ".concat(s===e.owner?"message-out":"message-in"),children:[Object(b.jsx)("div",{className:"message",children:Object(b.jsxs)("div",{className:"text-block",children:[Object(b.jsx)("div",{className:"text",children:e.text}),Object(b.jsxs)("div",{className:"time-status",children:[e.time.split(" ")[1],Object(b.jsx)("svg",{className:"none"!==e._id?e.status?"opened":"":"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 15",width:"16",height:"15",children:Object(b.jsx)("path",{fill:"currentColor",d:"M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"})})]})]})}),Object(b.jsx)("svg",{className:"triangle",id:"82734756-3615-4ec8-a382-6c6e9d1975af","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 67.96699 58.57164",children:Object(b.jsx)("path",{className:"0082bf7a-a2e0-46d1-be00-84645c2dcbc6",d:"M280.49486,515.96866l-44.88734,15.11513a.69234.69234,0,0,1-.221.03621H214.69244A.69245.69245,0,0,1,214,530.42756V515.31243a.69244.69244,0,0,1,.69244-.69243h65.58144A.69243.69243,0,0,1,280.49486,515.96866Z",transform:"translate(-213.5 -514.12)"})})]},t+e._id)})),!x&&h.map((function(e,t){return Object(b.jsxs)("div",{className:"message-block ".concat(s===e.owner?"message-out":"message-in"),children:[Object(b.jsx)("div",{className:"message",children:Object(b.jsxs)("div",{className:"text-block",children:[Object(b.jsx)("div",{className:"text",children:e.text}),Object(b.jsxs)("div",{className:"time-status",children:[e.time.split(" ")[1],Object(b.jsx)("svg",{className:e.status?"opened":"notOpened",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 15",width:"16",height:"15",children:Object(b.jsx)("path",{fill:"currentColor",d:"M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"})})]})]})}),Object(b.jsx)("svg",{className:"triangle",id:"82734756-3615-4ec8-a382-6c6e9d1975af","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 67.96699 58.57164",children:Object(b.jsx)("path",{className:"0082bf7a-a2e0-46d1-be00-84645c2dcbc6",d:"M280.49486,515.96866l-44.88734,15.11513a.69234.69234,0,0,1-.221.03621H214.69244A.69245.69245,0,0,1,214,530.42756V515.31243a.69244.69244,0,0,1,.69244-.69243h65.58144A.69243.69243,0,0,1,280.49486,515.96866Z",transform:"translate(-213.5 -514.12)"})})]},t+e._id)})),x&&Object(b.jsx)("div",{className:"loadingChatBlock",children:Object(b.jsx)("div",{className:"spinner spinner-1"})})]})},X=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.user.userData})).token,a=Object(c.useState)([]),s=Object(o.a)(a,2),n=s[0],i=s[1],l=function(a){e(function(e,t){return function(a){return g.a.post("/api/dialog/new",{userId:t},{headers:{Authorization:"Bearer ".concat(e)}}).then((function(t){a(G(e)).then((function(){a(F(t.data))})),C.emit("newDialog",t.data)}))}}(t,a))};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"search",children:Object(b.jsx)("div",{className:"box",children:Object(b.jsxs)("div",{className:"input-box",children:[Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"})}),Object(b.jsx)("input",{onChange:function(e){var a;(a=e.target.value).length>1&&g.a.post("/api/user/find",{telephone:a},{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){i(e.data)}))},type:"text",placeholder:"Start new dialog - enter telephone"})]})})}),Object(b.jsx)("div",{className:"dialogs",children:n.map((function(e,t){return Object(b.jsxs)("div",{onClick:function(){return l(e._id)},className:"dialog",children:[Object(b.jsx)("img",{src:q,alt:"error"}),Object(b.jsx)("div",{className:"details",children:Object(b.jsx)("div",{className:"dialog-info1",children:Object(b.jsxs)("div",{className:"dialog-name big-text",children:[e.name," ",e.telephone]})})})]},e._id+t)}))})]})},Y=a(20);var Z=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.dialog})),a=t.dialogs,s=t.activeDialog,n=t.dialogsOrder,i=Object(d.c)((function(e){return e.user.userData})),l=i.token,r=i.userId,O=Object(Y.d)(),m=Object(c.useState)(!1),x=Object(o.a)(m,2),p=x[0],v=x[1],f=Object(c.useState)(""),w=Object(o.a)(f,2),_=w[0],E=w[1];Object(c.useEffect)((function(){v(!1),e({type:"MESSAGES_NEW_DELETE"}),s&&(C.emit("messageAllStatus",{dialogId:s,id:r}),a[s].dialog.last_message_owner!==r&&e(V(s)))}),[s]);var S=function(t){t.preventDefault(),document.querySelector("#sendMessageInput").value="";var c={recipient:a[s].id,text:_,dialogId:s};if(!_)return O.show("Enter the message text"),!1;g.a.post("/api/message/new",c,{headers:{Authorization:"Bearer ".concat(l)}}).then((function(e){C.emit("newMessage",e.data)}),(function(e){O.show("Error with sending message")}));var i=K(),o={_id:"none",text:_,owner:r,recipient:a[s].id,time:i,status:!1,dialogId:s};e(D(o)),e(U(s,o)),n[0]!==s&&e(W(s)),E("")};return Object(b.jsxs)("div",{children:[Object(b.jsx)(j.a,{children:Object(b.jsx)("title",{children:"Live Chat"})}),Object(b.jsx)(h,{}),Object(b.jsx)("div",{className:"all-screen",children:Object(b.jsx)("div",{className:"main-box",children:Object(b.jsxs)("div",{className:"whats-app",children:[Object(b.jsx)("div",{className:"side-bar",children:p?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"find-header",children:Object(b.jsxs)("div",{className:"box",children:[Object(b.jsx)("div",{className:"back",children:Object(b.jsx)("svg",{onClick:function(){v(!1)},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"})})}),Object(b.jsx)("div",{className:"big-text",children:"New Chat"})]})}),Object(b.jsx)(X,{})]}):Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"box-header",children:[Object(b.jsx)("img",{src:q,alt:"error"}),Object(b.jsxs)("div",{className:"settings",children:[Object(b.jsx)("svg",{id:"ee51d023-7db6-4950-baf7-c34874b80976",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"})}),Object(b.jsx)("svg",{onClick:function(){v(!0)},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"})}),Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"})})]})]}),Object(b.jsx)(u,{}),Object(b.jsx)(P,{})]})}),s?Object(b.jsxs)("div",{className:"chat-bar",children:[Object(b.jsxs)("div",{className:"box-header",children:[Object(b.jsx)("img",{src:q,alt:"error"}),Object(b.jsxs)("div",{className:"dialog-info",children:[Object(b.jsx)("div",{className:"dialog-name",children:a[s].name}),Object(b.jsx)("div",{className:"last-time-seen",children:a[s].status?"online":"offline"})]}),Object(b.jsxs)("div",{className:"settings",children:[Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"})}),Object(b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"})})]})]}),Object(b.jsx)(J,{}),Object(b.jsx)("div",{className:"footer",children:Object(b.jsx)("div",{className:"box",children:Object(b.jsxs)("form",{onSubmit:S,className:"input-box",children:[Object(b.jsx)("input",{onChange:function(e){return E(e.target.value)},id:"sendMessageInput",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"}),Object(b.jsx)("svg",{onClick:S,type:"submit",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(b.jsx)("path",{fill:"currentColor",d:"M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"})})]})})})]}):Object(b.jsx)("div",{className:"chat-bar"})]})})})]})},K=function(){var e=new Date,t=e.getDate();t<10&&(t="0"+t);var a=e.getMonth()+1;a<10&&(a="0"+a);var s=e.getFullYear(),c=e.getHours();c<10&&(c="0"+c);var n=e.getMinutes();n<10&&(n="0"+n);var i=e.getSeconds();return i<10&&(i="0"+i),"".concat(t,"/").concat(a,"/").concat(s," ").concat(c,":").concat(n," ").concat(i)},Q=a(23),$=function(e,t){return function(a){return fetch("/api/auth/".concat(t),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){if(e.message)return e.message;localStorage.setItem("token",e.token);var t={name:e.name,email:e.email,telephone:e.telephone,userId:e.userId,token:e.token};a(ee(t)),a(m(!0)),C.emit("userOnline",t.userId),a(G(t.token))}))}},ee=function(e){return{type:"USER_LOGIN",payload:e}};var te=function(){var e=Object(d.b)(),t=Object(Y.d)(),a=Object(c.useState)(!1),n=Object(o.a)(a,2),i=n[0],l=n[1],r=Object(c.useState)({email:"",password:""}),h=Object(o.a)(r,2),u=h[0],O=h[1],g=function(e){O(Object(s.a)(Object(s.a)({},u),{},Object(E.a)({},e.target.name,e.target.value)))};return Object(b.jsxs)("div",{children:[Object(b.jsx)(j.a,{children:Object(b.jsx)("title",{children:"Login"})}),Object(b.jsx)("div",{className:"header bg-overlay"}),Object(b.jsx)("div",{className:"all-screen",children:Object(b.jsx)("div",{className:"main-box",children:Object(b.jsxs)("form",{className:"formLogin",onSubmit:function(a){a.preventDefault(),l(!0),e($(u,"login")).then((function(e){e&&(l(!1),t.show(e))}))},children:[i?Object(b.jsx)("h1",{children:"Loading"}):Object(b.jsx)("h1",{children:"Login"}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"email",id:"email",name:"email",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"email",children:"E-mail"})]}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"password",id:"pass",name:"password",minLength:"6",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"pass",children:"Password"})]}),Object(b.jsx)("button",{type:"submit",children:"LOGIN"}),Object(b.jsx)(Q.b,{to:"/registration",children:"Not a member? Sign in!"})]})})})]})};var ae=function(){var e=Object(d.b)(),t=Object(Y.d)(),a=Object(c.useState)(!1),n=Object(o.a)(a,2),i=n[0],l=n[1],r=Object(c.useState)({telephone:"",name:"",email:"",password:""}),h=Object(o.a)(r,2),u=h[0],O=h[1],g=function(e){O(Object(s.a)(Object(s.a)({},u),{},Object(E.a)({},e.target.name,e.target.value)))};return Object(b.jsxs)("div",{children:[Object(b.jsx)(j.a,{children:Object(b.jsx)("title",{children:"Registration"})}),Object(b.jsx)("div",{className:"header bg-overlay"}),Object(b.jsx)("div",{className:"all-screen",children:Object(b.jsx)("div",{className:"main-box",children:Object(b.jsxs)("form",{className:"formLogin",onSubmit:function(a){a.preventDefault(),l(!0),e($(u,"register")).then((function(e){e&&(l(!1),t.show(e))}))},children:[i?Object(b.jsx)("h1",{children:"Loading"}):Object(b.jsx)("h1",{children:"Registration"}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"tel",id:"telephone",name:"telephone",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"telephone",children:"Telephone"})]}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"tel",id:"name",name:"name",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"name",children:"Name"})]}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"email",id:"email",name:"email",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"email",children:"E-mail"})]}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"password",id:"password",name:"password",minLength:"6",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"pass",children:"Password"})]}),Object(b.jsxs)("div",{className:"text_field",children:[Object(b.jsx)("input",{type:"password",id:"confirm_password",name:"password",minLength:"6",required:!0,onChange:g}),Object(b.jsx)("span",{}),Object(b.jsx)("label",{htmlFor:"pass",children:"Confirm Password"})]}),Object(b.jsx)("button",{type:"submit",children:"REGISTER"}),Object(b.jsx)(Q.b,{to:"/login",children:"Already registered? Log in!"})]})})})]})},se=function(){return Object(b.jsxs)("div",{className:"sk-circle",children:[Object(b.jsx)("div",{className:"sk-circle1 sk-child"}),Object(b.jsx)("div",{className:"sk-circle2 sk-child"}),Object(b.jsx)("div",{className:"sk-circle3 sk-child"}),Object(b.jsx)("div",{className:"sk-circle4 sk-child"}),Object(b.jsx)("div",{className:"sk-circle5 sk-child"}),Object(b.jsx)("div",{className:"sk-circle6 sk-child"}),Object(b.jsx)("div",{className:"sk-circle7 sk-child"}),Object(b.jsx)("div",{className:"sk-circle8 sk-child"}),Object(b.jsx)("div",{className:"sk-circle9 sk-child"}),Object(b.jsx)("div",{className:"sk-circle10 sk-child"}),Object(b.jsx)("div",{className:"sk-circle11 sk-child"}),Object(b.jsx)("div",{className:"sk-circle12 sk-child"})]})};var ce=function(){var e=function(){var e=Object(d.c)((function(e){return e.user})).userData;return Object(d.c)((function(e){return e.loading})).userLoading?Object(b.jsxs)(r.d,{children:[Object(b.jsx)(r.b,{path:"/",exact:!0,children:Object(b.jsx)(se,{})}),Object(b.jsx)(r.a,{to:"/"})]}):e.userId?Object(b.jsxs)(r.d,{children:[Object(b.jsx)(r.b,{path:"/",exact:!0,children:Object(b.jsx)(Z,{})}),Object(b.jsx)(r.a,{to:"/"})]}):Object(b.jsxs)(r.d,{children:[Object(b.jsx)(r.b,{path:"/login",exact:!0,children:Object(b.jsx)(te,{})}),Object(b.jsx)(r.b,{path:"/registration",exact:!0,children:Object(b.jsx)(ae,{})}),Object(b.jsx)(r.a,{to:"/login"})]})}(),t=Object(d.b)();return Object(c.useEffect)((function(){t((function(e){var t=localStorage.token;if(e(m(!0)),t)return fetch("/api/auth/check",{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer ".concat(t)}}).then((function(e){return e.json()})).then((function(a){if(a.message)console.log(a.message),localStorage.removeItem("token"),e(m(!1));else{var s={name:a.name,email:a.email,telephone:a.telephone,userId:a.userId,token:t};e(ee(s)),C.emit("userOnline",s.userId),e(G(t))}}));e(m(!1))}))}),[]),Object(b.jsx)(Q.a,{children:e})},ne=function(e){var t=e.color,a=e.pushRight,s=void 0===a||a,c=e.children;return n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:s?"20px":"0",minWidth:24}},c)},ie=function(){return n.a.createElement(ne,{color:"#e93333"},n.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.a.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),n.a.createElement("line",{x1:"12",y1:"8",x2:"12",y2:"8"}))},le=function(){return n.a.createElement(ne,{color:"#31B404"},n.a.createElement("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),n.a.createElement("polyline",{points:"22 4 12 14.01 9 11.01"}))},re=function(){return n.a.createElement(ne,{color:"#FF0040"},n.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),n.a.createElement("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),n.a.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"16"}))},oe=function(){return n.a.createElement(ne,{color:"#FFFFFF",pushRight:!1},n.a.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),n.a.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"}))},de=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},je={backgroundColor:"#2f9688",color:"white",padding:"10px",textTransform:"uppercase",borderRadius:"3px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0px 2px 2px 2px rgba(0, 0, 0, 0.03)",fontFamily:"Arial",width:"300px",boxSizing:"border-box"},be={marginLeft:"20px",border:"none",backgroundColor:"transparent",cursor:"pointer",color:"#FFFFFF"},he=function(e){var t=e.message,a=e.options,s=e.style,c=e.close;return n.a.createElement("div",{style:de({},je,s)},"info"===a.type&&n.a.createElement(ie,null),"success"===a.type&&n.a.createElement(le,null),"error"===a.type&&n.a.createElement(re,null),n.a.createElement("span",{style:{flex:2}},t),n.a.createElement("button",{onClick:c,style:be},n.a.createElement(oe,null)))},ue={position:Y.b.TOP_CENTER,timeout:5e3,offset:"30px",background:"#2f9688",transition:Y.c.SCALE};l.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(d.a,{store:T,children:Object(b.jsx)(Y.a,Object(s.a)(Object(s.a)({template:he},ue),{},{children:Object(b.jsx)(ce,{})}))})}),document.getElementById("root"))},74:function(e,t,a){}},[[127,1,2]]]);
//# sourceMappingURL=main.1a3ebcb7.chunk.js.map