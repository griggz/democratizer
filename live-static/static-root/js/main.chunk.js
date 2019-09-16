(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(44),l=a.n(o),c=(a(53),a(2)),s=a(3),i=a(5),m=a(4),u=a(6),d=a(170),h=a(173),f=a(172),p=(a(54),a(7)),v=(a(16),a(8)),b=a.n(v),g=a(169),E=a(12),C=a.n(E),k=a(20),y=a.n(k),S=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.comm,t=this.props.elClass,a="card"===t?"d-block":"d-none";return r.a.createElement("div",{class:"comms-list"},void 0!==e?r.a.createElement("div",{className:t},r.a.createElement("h1",{class:"comms-title"},r.a.createElement(g.a,{maintainScrollPosition:!1,to:{pathname:"/site-management/comms/".concat(e.slug),state:{fromDashboard:!1}}},e.title),"\xa0",r.a.createElement("small",{className:"publish_date text-muted",id:"alt"},"(Updated: ",r.a.createElement(y.a,{fromNow:!0,ago:!0},e.updated)," ago)")),r.a.createElement("p",{className:a},r.a.createElement(C.a,{source:e.content.slice(0,200).trim().concat("...")}),r.a.createElement(g.a,{maintainScrollPosition:!1,to:{pathname:"/site-management/comms/".concat(e.slug),state:{fromDashboard:!1}}},"Read more"))):"")}}]),t}(n.Component),j=a(10),N=a.n(j),O=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).toggleCommListClass=a.toggleCommListClass.bind(Object(p.a)(a)),a.handleNewComm=a.handleNewComm.bind(Object(p.a)(a)),a.loadMoreComms=a.loadMoreComms.bind(Object(p.a)(a)),a.state={comms:[],commsPublic:[],commsListClass:"card",previous:null,author:!1,draft:null,count:0},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"loadMoreComms",value:function(){var e=this.state.next;null===e&&void 0===e||this.loadComms(e)}},{key:"loadComms",value:function(e){var t="/api/comms/";void 0!==e&&(t=e);var a=this,n={method:"GET",headers:{"Content-Type":"application/json"}},r=b.a.load("csrftoken");void 0!==r&&(n.credentials="include",n.headers["X-CSRFToken"]=r),fetch(t,n).then(function(e){return e.json()}).then(function(e){var t=e.results.filter(function(e){return!1===e.draft});a.setState({comms:a.state.comms.concat(e.results),commsPublic:a.state.commsPublic.concat(t),next:e.next,previous:e.previous,staff:e.staff,draft:e.draft,count:e.count})}).catch(function(e){console.log("error",e)})}},{key:"handleComms",value:function(e){var t=e.filter(function(e){return!1===e.draft});this.setState({commsPublic:t})}},{key:"handleNewComm",value:function(e){var t=this.state.comms;t.unshift(e),this.setState({comms:t})}},{key:"toggleCommListClass",value:function(e){e.preventDefault(),""===this.state.commsListClass?this.setState({commsListClass:"card"}):this.setState({commsListClass:""})}},{key:"componentDidMount",value:function(){this.setState({comms:[],commsListClass:"card",next:null,previous:null,count:0}),this.loadComms()}},{key:"render",value:function(){var e=this.state.comms,t=this.state.commsPublic,a=this.state.commsListClass,n=this.state.staff,o=this.state.next;return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("h1",null,!0===n?r.a.createElement(g.a,{className:"mr-2",maintainScrollPosition:!1,to:{pathname:"/site-management/comms/create/",state:{fromDashboard:!1}}},r.a.createElement(N.a,{variant:"outline-dark",type:"button"},"Create New Comm")):"",r.a.createElement(N.a,{onClick:this.toggleCommListClass},"List View")),r.a.createElement("br",null),!0===n?r.a.createElement("div",null,e.length>0?e.map(function(e,t){return r.a.createElement(S,{comm:e,elClass:a})}):r.a.createElement("p",null,"No comms Found")):r.a.createElement("div",null,e.length>0?t.map(function(e,t){return r.a.createElement(S,{comm:e,elClass:a})}):r.a.createElement("p",null,"No Comms Found")),r.a.createElement("div",{className:"d-flex flex-column text-center"},null!==o?r.a.createElement(N.a,{variant:"outline-dark",onClick:this.loadMoreComms},"Load more"):""),r.a.createElement("br",null))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleCommItemUpdated=a.handleCommItemUpdated.bind(Object(p.a)(a)),a.state={slug:null,comm:null,doneLoading:!1,owner:null},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleCommItemUpdated",value:function(e){this.setState({comm:e})}},{key:"loadComm",value:function(e){var t="/api/comms/".concat(e,"/"),a=this,n={method:"GET",headers:{"Content-Type":"application/json"}},r=b.a.load("csrftoken");void 0!==r&&(n.credentials="include",n.headers["X-CSRFToken"]=r),fetch(t,n).then(function(e){return 404===e.status&&console.log("Page not found"),e.json()}).then(function(e){e.detail?a.setState({doneLoading:!0,comm:null}):a.setState({doneLoading:!0,comm:e,owner:e.owner})}).catch(function(e){console.log("error",e)})}},{key:"componentDidMount",value:function(){if(this.setState({slug:null,comm:null}),this.props.match){var e=this.props.match.params.slug;this.setState({slug:e,doneLoading:!1}),this.loadComm(e)}}},{key:"render",value:function(){var e=this.state.doneLoading,t=this.state.comm,a=this.state.owner,n={display:"block",height:"1px",border:0,borderTop:"1px solid #ccc",margin:"1em 0",padding:"0",color:"white"};return r.a.createElement("p",null,!0===e?r.a.createElement("div",{class:"Main"},null===t?"Not Found":r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-10"},r.a.createElement("h1",{id:"alt"},t.title," ",r.a.createElement("small",{class:"text-muted"},"(",t.slug,")")),r.a.createElement("h4",{id:"alt"},"By ",t.author.username,"\xa0",!0===a?r.a.createElement(g.a,{className:"mr-2",maintainScrollPosition:!1,to:{pathname:"/site-management/comms/".concat(t.slug,"/edit"),state:{post:t}}},r.a.createElement(N.a,{variant:"outline-dark",type:"button",id:"edit-button"},"Edit")):""," "),r.a.createElement("hr",{style:n}),r.a.createElement("h4",null,r.a.createElement("small",{className:"publish_date",id:"alt"}," Updated: ",r.a.createElement(y.a,{fromNow:!0,ago:!0},t.updated)," ago\xa0")),r.a.createElement("hr",{style:n}),r.a.createElement("p",{id:"alt"},r.a.createElement(C.a,{source:t.content}))),r.a.createElement("div",{className:"col-md-2"},r.a.createElement("br",null)))):"Loading...")}}]),t}(n.Component),x=a(19),R=(a(41),a(171)),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=a.handleSubmit.bind(Object(p.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(p.a)(a)),a.handleDraftChange=a.handleDraftChange.bind(Object(p.a)(a)),a.clearForm=a.clearForm.bind(Object(p.a)(a)),a.commTitleRef=r.a.createRef(),a.commContentRef=r.a.createRef(),a.commSiteLocationRef=r.a.createRef(),a.commSlugRef=r.a.createRef(),a.state={draft:!1,title:null,content:null,site_location:"",redirect:!1,redirectLink:null,errors:{}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"createComm",value:function(e){var t=this,a=b.a.load("csrftoken"),n=this;if(void 0!==a){var r={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":a},body:JSON.stringify(e),credentials:"include"};fetch("/api/comms/",r).then(function(e){return e.json()}).then(function(e){n.setState({redirectLink:"/site-management/comms/".concat(e.slug)}),n.props.newCommItemCreated&&n.props.newCommItemCreated(e),n.clearForm()}).catch(function(e){console.log("error",e),alert("An error occurred, please try again later.")}).then(function(){return t.setState({redirect:!0})})}}},{key:"updateComm",value:function(e){var t=this,a=this.props.post,n="/api/comms/".concat(a.slug,"/"),r=b.a.load("csrftoken"),o=this;if(void 0!==r){var l={method:"PUT",headers:{"Content-Type":"application/json","X-CSRFToken":r},body:JSON.stringify(e),credentials:"include"};fetch(n,l).then(function(e){return e.json()}).then(function(e){o.setState({redirectLink:"/site-management/comms/".concat(e.slug)}),o.props.commItemUpdated&&o.props.commItemUpdated(e)}).catch(function(e){console.log("error",e),alert("An error occurred, please try again later.")}).then(function(){return t.setState({redirect:!0})})}}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state;void 0!==this.props.post?this.updateComm(t):this.createComm(t)}},{key:"handleInputChange",value:function(e){e.preventDefault();var t=e.target.name,a=e.target.value;"title"===t&&a.length>120&&alert("This title is too long"),this.setState(Object(x.a)({},t,a))}},{key:"handleDraftChange",value:function(e){this.setState({draft:!this.state.draft})}},{key:"clearForm",value:function(e){e&&e.preventDefault(),this.commCreateForm.reset(),this.defaultState()}},{key:"clearFormRefs",value:function(){this.commTitleRef.current="",this.commContentRef.current="",this.commSiteLocationRef.current="",this.commSlugRef.current=""}},{key:"defaultState",value:function(){this.setState({draft:!1,title:null,content:null,site_location:null,slug:null})}},{key:"componentDidMount",value:function(){var e=this.props.post;void 0!==e?this.setState({draft:e.draft,title:e.title,content:e.content,site_location:e.site_location,slug:e.slug}):this.defaultState()}},{key:"render",value:function(){var e=this,t=this.state.title,a=this.state.content,n=this.state.site_location,o=this.state.redirect,l=this.state.redirectLink,c=this.state.slug;return o?r.a.createElement(R.a,{to:l}):r.a.createElement("div",null,r.a.createElement("h1",{id:"alt"},"Create Comm"),r.a.createElement("form",{onSubmit:this.handleSubmit,ref:function(t){return e.commCreateForm=t}},r.a.createElement("div",{className:"form-group",id:"top-row-form"},r.a.createElement("label",{htmlFor:"draft"},r.a.createElement("input",{type:"checkbox",checked:this.state.draft,id:"draft",name:"draft",className:"mr-2",onChange:this.handleDraftChange})),r.a.createElement(N.a,{variant:"outline-dark",onClick:function(t){t.preventDefault(),e.handleDraftChange()}},"Draft"),r.a.createElement("label",{htmlFor:"site_location"},"Site Location:",r.a.createElement("span",null," "),r.a.createElement("select",{value:n,id:"site_location",name:"site_location",ref:this.commSiteLocationRef,className:"mr-2",onChange:this.handleInputChange},r.a.createElement("option",{value:"select"},"Select"),r.a.createElement("option",{value:"comms"},"comms"),r.a.createElement("option",{value:"scrape"},"scrape"),r.a.createElement("option",{value:"landing"},"landing"))),r.a.createElement("button",{type:"submit",className:"btn btn-primary",id:"create-submit"},"Save")),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"title",name:"title",value:t,className:"form-control",placeholder:"Comms Title",ref:this.commTitleRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"slug",name:"slug",readOnly:!0,value:c,className:"form-control",ref:this.commSlugRef})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"content"},r.a.createElement("small",null,"Markdown ",r.a.createElement("a",{href:"https://www.markdownguide.org/basic-syntax/",target:"_blank",rel:"noopener noreferrer"},"guide"),' For local images use this ex. "/static/images/deploy_process.svg"')),r.a.createElement("textarea",{id:"content",ref:this.commContentRef,name:"content",value:a,className:"form-control",placeholder:"Tell me something!",onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"preview"},r.a.createElement("div",{className:"preview-text"},r.a.createElement(C.a,{source:a})))))}}]),t}(n.Component),L=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.location.state.post;return r.a.createElement("div",{class:"col-md-10","align-items":"center"},null!==e?r.a.createElement(T,{post:e}):r.a.createElement(T,null))}}]),t}(n.Component),F=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.reviews;return r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("td",{className:"dash h5"},r.a.createElement("b",null,e.author)," |"),r.a.createElement("td",{className:"dash h5"},r.a.createElement("b",null,e.date)," |"),r.a.createElement("td",{className:"dash h5"},r.a.createElement("b",null,e.rating)),r.a.createElement("p",{className:"dash"},e.review),r.a.createElement("hr",{style:{display:"block",height:"1px",border:0,borderTop:"1px solid #ccc",margin:"1em 0",padding:"0",color:"white"}}))}}]),t}(n.Component),D=a(45),P=a.n(D),I=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={slug:null,scrape:null,doneLoading:!1,visible:25,words:null},a.loadMore=a.loadMore.bind(Object(p.a)(a)),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"loadMore",value:function(){this.setState(function(e){return{visible:e.visible+25}})}},{key:"handlePostItemUpdated",value:function(e){this.setState({scrape:e})}},{key:"loadReviews",value:function(e){var t="/api/scrape/".concat(e,"/"),a=this,n={method:"GET",headers:{"Content-Type":"application/json"}},r=b.a.load("csrftoken");void 0!==r&&(n.credentials="include",n.headers["X-CSRFToken"]=r),fetch(t,n).then(function(e){return 404===e.status&&console.log("Page not found"),e.json()}).then(function(e){e.detail?a.setState({doneLoading:!0,scrape:null}):a.setState({doneLoading:!0,scrape:e})}).catch(function(e){console.log("error",e)})}},{key:"componentDidMount",value:function(){if(this.setState({slug:null}),this.props.match){var e=this.props.match.params.slug;this.setState({slug:e,doneLoading:!1}),this.loadReviews(e)}}},{key:"buildUrl",value:function(){var e=this.state.scrape;return"https://vvayne.io/scrape/results/".concat(e.slug)}},{key:"buildFileName",value:function(){var e=this.state.scrape;return"".concat(e.business_name,".csv")}},{key:"render",value:function(){var e=this,t=this.state.doneLoading,a=this.state.scrape;return r.a.createElement("section",{className:"Results"}," ",!0===t?r.a.createElement("div",{className:"container-fluid"}," ",null===a?"No Reviews Found...In order to use this\nscraper you must be a registered user and\nlogged in. If you are logged in and receiving\nthis error, please confirm that the business\nyou are attempting to scrape has reviews.":r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("div",{className:"col-sm-10"},r.a.createElement(g.a,{maintainScrollPosition:!1,to:{pathname:"/scrape",state:{fromDashboard:!1}}},r.a.createElement("button",{className:"btn btn-primary"},"New Scrape")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h1",null,a.business_name),r.a.createElement(N.a,{variant:"secondary",onClick:function(){return P()(a.reviews,e.buildFileName())}},"Download Data"),r.a.createElement("hr",{style:{display:"block",height:"1px",border:0,borderTop:"1px solid #ccc",margin:"1em 0",padding:"0",color:"white"}}),a.reviews.length>0?a.reviews.slice(0,this.state.visible).map(function(e,t){return r.a.createElement("div",{className:"row",key:t},r.a.createElement(F,{reviews:e}))}):r.a.createElement("p",null,"No Reviews Found"),this.state.visible<a.reviews.length&&r.a.createElement("div",{className:"d-flex flex-column text-center"},r.a.createElement(N.a,{onClick:this.loadMore,variant:"outline-light",type:"button",className:"load-more"},"Load more"))))):r.a.createElement("div",{class:"spinner-border",role:"status"},r.a.createElement("span",{class:"sr-only"},"Loading...")))}}],[{key:"routeChange",value:function(){return r.a.createElement(R.a,{to:"/scrape/create"})}}]),t}(n.Component),M=a(46),_=a.n(M),q=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=a.handleSubmit.bind(Object(p.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(p.a)(a)),a.clearForm=a.clearForm.bind(Object(p.a)(a)),a.scrapeLinkRef=r.a.createRef(),a.state={link:null,redirect:!1,redirectLink:null,slug:null,scraping:null,errors:{}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"createScrape",value:function(e){var t=this,a=b.a.load("csrftoken"),n=this;if(void 0!==a){var r={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":a},body:JSON.stringify(e),credentials:"include"};fetch("/api/scrape/",r).then(function(e){return e.json()}).then(function(e){n.setState({redirectLink:"/scrape/results/".concat(e.slug),scraping:null}),n.clearForm()}).catch(function(e){console.log("error",e),alert("An error occurred, please try again later.")}).then(function(){return t.setState({redirect:!0})})}}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state;void 0===this.props.scrape?(this.setState({scraping:!0}),this.createScrape(t)):this.clearFormRefs()}},{key:"handleInputChange",value:function(e){e.preventDefault();var t=e.target.name,a=e.target.value;"link"===t&&a.length>120&&alert("This link is too long"),this.setState(Object(x.a)({},t,a))}},{key:"clearForm",value:function(e){e&&e.preventDefault(),this.scrapeCreateForm.reset(),this.defaultState()}},{key:"clearFormRefs",value:function(){this.scrapeLinkRef.current=""}},{key:"defaultState",value:function(){this.setState({link:null})}},{key:"componentDidMount",value:function(){var e=this.props.scrape;void 0!==e?this.setState({link:e.link}):this.defaultState()}},{key:"render",value:function(){var e=this,t=this.state.link,a=this.state.redirect,n=this.state.redirectLink;return this.state.scraping?r.a.createElement("div",{id:"react-loader"},r.a.createElement(_.a,{type:"Puff",color:"#00BFFF",height:"200",width:"200"})," ......scraping"):a?r.a.createElement(R.a,{to:n}):r.a.createElement("form",{onSubmit:this.handleSubmit,ref:function(t){return e.scrapeCreateForm=t}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"link",name:"link",value:t,className:"form-control",placeholder:"Yelp Link",ref:this.scrapeLinkRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Scrape"),"\xa0",r.a.createElement("button",{className:"btn btn-secondary",onClick:this.clearForm},"Clear"))}}]),t}(n.Component),U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={slug:null,comms:[],commsListClass:"card",previous:null,author:!1,draft:null,count:0},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"loadComms",value:function(e){var t="/api/comms/";void 0!==e&&(t=e);var a=this,n={method:"GET",headers:{"Content-Type":"application/json"}},r=b.a.load("csrftoken");void 0!==r&&(n.credentials="include",n.headers["X-CSRFToken"]=r),fetch(t,n).then(function(e){return e.json()}).then(function(e){a.setState({comms:a.state.comms.concat(e.results.filter(function(e){return"scrape"===e.site_location&&!1===e.draft})),next:e.next,previous:e.previous,staff:e.staff,draft:e.draft,count:e.count})}).catch(function(e){console.log("error",e)})}},{key:"componentDidMount",value:function(){this.setState({comms:[],next:null,previous:null,count:0}),this.loadComms()}},{key:"render",value:function(){var e=this.state.comms;return r.a.createElement("div",{class:"container col-sm-10"},r.a.createElement("div",{className:"scrape_form"},r.a.createElement(q,null)),e.length>0?e.map(function(e,t){return r.a.createElement("div",{className:"comms"},void 0!==e?r.a.createElement(C.a,{source:e.content}):"")}):r.a.createElement("p",null,"No Messages To Display"))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).checkMobileState=function(){document.documentElement.clientWidth<=768&&a.setState({mobile:!0})},a.listenToScroll=function(){var e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight);a.setState({pagePosition:e}),e>=.53&&!1===a.state.mobile&&a.setState({animate:!0}),!0===a.state.animate&&a.setState({aboutCardClass:"shadow card rounded-0 h-100",aboutCardAnimate:"card-animate"}),!0===a.state.mobile&&a.setState({aboutCardClass:"shadow card rounded-0 h-100"})},a.handleSubmit=a.handleSubmit.bind(Object(p.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(p.a)(a)),a.clearForm=a.clearForm.bind(Object(p.a)(a)),a.feedbackNameRef=r.a.createRef(),a.feedbackPhoneNumberRef=r.a.createRef(),a.feedbackEmailRef=r.a.createRef(),a.feedbackCommentsRef=r.a.createRef(),a.state={name:null,email:null,phone_number:null,comments:null,redirect:!1,redirectLink:null,errors:{},aboutCardClass:"shadow card rounded-0 invisible",aboutCardAnimate:"",animate:!1,mobile:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"createPost",value:function(e){var t=this,a=b.a.load("csrftoken"),n=this;if(void 0!==a){var r={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":a},body:JSON.stringify(e),credentials:"include"};fetch("/api/landing/",r).then(function(e){return e.json()}).then(function(e){n.setState({redirectLink:"/"}),n.clearForm()}).catch(function(e){console.log("error",e),alert("An error occurred, please try again later.")}).then(function(){return t.setState({redirect:!0})})}}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state;void 0===this.props.post?this.createPost(t):this.clearFormRefs()}},{key:"handleInputChange",value:function(e){e.preventDefault();var t=e.target.name,a=e.target.value;"link"===t&&a.length>120&&alert("This link is too long"),this.setState(Object(x.a)({},t,a))}},{key:"clearForm",value:function(e){e&&e.preventDefault(),this.feedbackCreateForm.reset(),this.defaultState()}},{key:"clearFormRefs",value:function(){this.feedbackNameRef.current="",this.feedbackEmailRef.current="",this.feedbackPhoneNumberRef.current="",this.feedbackCommentsRef.current=""}},{key:"defaultState",value:function(){this.setState({name:"",email:"",phone_number:"",comments:""})}},{key:"componentDidMount",value:function(){this.checkMobileState(),!1===this.state.mobile&&window.addEventListener("scroll",this.listenToScroll);var e=this.props.post;void 0!==e?this.setState({name:e.name,email:e.email,phone_number:e.phone_number,comments:e.comments}):this.defaultState()}},{key:"render",value:function(){var e=this,t=this.state.name,a=this.state.email,n=this.state.phone_number,o=this.state.comments,l=this.state.redirect,c=this.state.redirectLink,s=this.state.aboutCardClass,i=this.state.aboutCardAnimate;return l?r.a.createElement(R.a,{to:c}):r.a.createElement("div",{className:"col-sm-6 py-2"},r.a.createElement("div",{className:s,id:i},r.a.createElement("form",{ref:function(t){return e.feedbackCreateForm=t}},r.a.createElement("h1",{className:"hook"},"Contact Us"),r.a.createElement("hr",{style:{display:"block",height:"1px",border:0,borderTop:"1px solid #ccc",margin:"0 1em",padding:"0",color:"#18181E"}}),r.a.createElement("div",{className:"card-body d-flex flex-column"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"name",name:"name",value:t,className:"form-control",placeholder:"Name",ref:this.feedbackNameRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"email",name:"email",value:a,className:"form-control",placeholder:"Email",ref:this.feedbackEmailRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",id:"phone_number",name:"phone_number",value:n,className:"form-control",placeholder:"Phone Number",ref:this.feedbackPhoneNumberRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("textarea",{type:"text",id:"comments",name:"comments",style:{height:"15rem"},value:o,className:"form-control",placeholder:"Say Hi!",ref:this.feedbackCommentsRef,onChange:this.handleInputChange,required:"required"})),r.a.createElement("div",{className:"w-100 d-flex flex-column text-center"},r.a.createElement(N.a,{variant:"outline-dark",type:"submit"},"Submit"))))))}}]),t}(n.Component),X=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).checkMobileState=function(){return document.documentElement.clientWidth<=768&&a.setState({mobile:!0}),a.state.mobile},a.listenToScroll=function(){var e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight);a.setState({pagePosition:e}),e>=.53&&!1===a.state.mobile&&a.setState({animate:!0}),!0===a.state.animate&&a.setState({aboutCardClass:"shadow card rounded-0",aboutCardAnimate:"card-animate"}),!0===a.state.mobile&&a.setState({aboutCardClass:"shadow card rounded-0"})},a.state={slug:null,words:null,comms:[],about:[],aboutCardClass:"shadow card rounded-0 invisible",aboutCardAnimate:"",animate:!1,mobile:!1,previous:null,author:!1,draft:null,count:0,pagePosition:null},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"loadComms",value:function(e){var t="/api/comms/";void 0!==e&&(t=e);var a=this,n={method:"GET",headers:{"Content-Type":"application/json"}},r=b.a.load("csrftoken");void 0!==r&&(n.credentials="include",n.headers["X-CSRFToken"]=r),fetch(t,n).then(function(e){return e.json()}).then(function(e){a.setState({comms:a.state.comms.concat(e.results.filter(function(e){return"landing-tag"===e.slug&&!1===e.draft})),about:a.state.about.concat(e.results.filter(function(e){return"about"===e.slug&&!1===e.draft})),next:e.next,previous:e.previous,staff:e.staff,draft:e.draft,count:e.count})}).catch(function(e){console.log("error",e)})}},{key:"componentDidMount",value:function(){this.checkMobileState(),!1===this.state.mobile&&window.addEventListener("scroll",this.listenToScroll),this.setState({comms:[],about:[],next:null,previous:null,count:0}),this.loadComms()}},{key:"render",value:function(){var e=this.state.comms,t=this.state.about,a=this.state.aboutCardClass,n=this.state.aboutCardAnimate,o=(this.state.mobile,{display:"block",height:"1px",border:0,borderTop:"1px solid #ccc",margin:"0 1em",padding:"0",color:"#18181E"});return r.a.createElement("div",null,r.a.createElement("section",{className:"fork"},r.a.createElement("div",{className:"container",id:"top"},e.length>0?e.map(function(e,t){return r.a.createElement("div",{className:"tag"},void 0!==e?r.a.createElement(C.a,{source:e.content}):"")}):"",r.a.createElement("div",{class:"vl"}),r.a.createElement("div",{class:"btn-group-vertical"},r.a.createElement("a",{id:"landing-btn",href:"/scrape/"},r.a.createElement("button",{"data-hover":"GO"},r.a.createElement("div",null,"Yelp"))),r.a.createElement(g.a,{id:"landing-btn",maintainScrollPosition:!1,to:{pathname:"/",state:{fromDashboard:!1}}},r.a.createElement("button",{"data-hover":"UNDER DEVELOPMENT"},r.a.createElement("div",null,"GlassDoor"))),r.a.createElement(g.a,{id:"landing-btn",maintainScrollPosition:!1,to:{pathname:"/",state:{fromDashboard:!1}}},r.a.createElement("button",{"data-hover":"UNDER DEVELOPMENT"},r.a.createElement("div",null,"Indeed")))),r.a.createElement("hr",{style:o}))),r.a.createElement("section",{class:"about",id:"about"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-6 py-2"},t.length>0?t.map(function(e,t){return r.a.createElement("div",{className:a,id:n},r.a.createElement("h1",{class:"hook"},e.title),r.a.createElement("hr",{style:o}),r.a.createElement("div",{className:"card-body d-flex flex-column"},r.a.createElement("h5",{className:"card-title"},"Democratizing the Worlds Data"),r.a.createElement("p",{className:"card-text"},void 0!==e?r.a.createElement(C.a,{source:e.content}):"")))}):""),r.a.createElement(A,null)))))}}]),t}(n.Component),G=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={slug:null},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"loadCommsView",value:function(){this.setState({CommsView:!0})}},{key:"render",value:function(){this.state.blocks;return r.a.createElement("div",null,r.a.createElement("h2",null,"Main Page"))}}]),t}(n.Component),J=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement(h.a,null,r.a.createElement(f.a,{exact:!0,path:"/site-management/",component:G}),r.a.createElement(f.a,{exact:!0,path:"/site-management/comms/create",component:L}),r.a.createElement(f.a,{exact:!0,path:"/site-management/comms/:slug/edit",component:L}),r.a.createElement(f.a,{exact:!0,path:"/site-management/comms/",component:O}),r.a.createElement(f.a,{exact:!0,path:"/site-management/comms/:slug",component:w}),r.a.createElement(f.a,{exact:!0,path:"/scrape/",component:U}),r.a.createElement(f.a,{exact:!0,path:"/scrape/results/:slug",component:I}),r.a.createElement(f.a,{exact:!0,path:"",component:X})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},47:function(e,t,a){e.exports=a(167)},53:function(e,t,a){},54:function(e,t,a){}},[[47,1,2]]]);
//# sourceMappingURL=main.chunk.js.map