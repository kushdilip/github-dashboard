"use strict";define("github-dashboard/adapters/application",["exports","ember","emberfire/adapters/firebase"],function(e,t,n){var a=t["default"].inject;e["default"]=n["default"].extend({firebase:a.service()})}),define("github-dashboard/app",["exports","ember","ember/resolver","ember/load-initializers","github-dashboard/config/environment"],function(e,t,n,a,r){var o=void 0;t["default"].MODEL_FACTORY_INJECTIONS=!0,o=t["default"].Application.extend({modulePrefix:r["default"].modulePrefix,podModulePrefix:r["default"].podModulePrefix,Resolver:n["default"]}),(0,a["default"])(o,r["default"].modulePrefix),e["default"]=o}),define("github-dashboard/components/app-version",["exports","ember-cli-app-version/components/app-version","github-dashboard/config/environment"],function(e,t,n){var a=n["default"].APP.name,r=n["default"].APP.version;e["default"]=t["default"].extend({version:r,name:a})}),define("github-dashboard/components/high-charts",["exports","ember-highcharts/components/high-charts"],function(e,t){e["default"]=t["default"]}),define("github-dashboard/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("github-dashboard/controllers/home",["exports","ember"],function(e,t){e["default"]=t["default"].Controller.extend({chartContent:t["default"].computed("contributions",{get:function(){var e=t["default"].$.extend(!0,{},this.get("chartOptions")),n=this.get("contributions")||[];return n.map(function(t){return{chartData:[{name:"Contribution",colorByPoint:!0,data:t.map(function(e){return{name:e.author.login,y:e.total}})}],chartOptions:e}})}}),chartOptions:{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %",style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"}}}},yAxis:{title:{text:""}}}})}),define("github-dashboard/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("github-dashboard/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","github-dashboard/config/environment"],function(e,t,n){e["default"]={name:"App Version",initialize:(0,t["default"])(n["default"].APP.name,n["default"].APP.version)}}),define("github-dashboard/initializers/emberfire",["exports","emberfire/initializers/emberfire"],function(e,t){e["default"]=t["default"]}),define("github-dashboard/initializers/export-application-global",["exports","ember","github-dashboard/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(n["default"].exportApplicationGlobal!==!1){var a,r=n["default"].exportApplicationGlobal;a="string"==typeof r?r:t["default"].String.classify(n["default"].modulePrefix),window[a]||(window[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[a]}}))}}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("github-dashboard/initializers/initialize-torii-callback",["exports","torii/redirect-handler"],function(e,t){e["default"]={name:"torii-callback",before:"torii",initialize:function(e){arguments[1]&&(e=arguments[1]),e.deferReadiness(),t["default"].handle(window)["catch"](function(){e.advanceReadiness()})}}}),define("github-dashboard/initializers/initialize-torii-session",["exports","torii/configuration","torii/bootstrap/session"],function(e,t,n){e["default"]={name:"torii-session",after:"torii",initialize:function(e){if(arguments[1]&&(e=arguments[1]),t["default"].sessionServiceName){(0,n["default"])(e,t["default"].sessionServiceName);var a="service:"+t["default"].sessionServiceName;e.inject("adapter",t["default"].sessionServiceName,a)}}}}),define("github-dashboard/initializers/initialize-torii",["exports","torii/bootstrap/torii","torii/configuration"],function(e,t,n){var a={name:"torii",initialize:function(e){arguments[1]&&(e=arguments[1]),(0,t["default"])(e),e.inject("route","torii","service:torii")}};window.DS&&(a.after="store"),e["default"]=a}),define("github-dashboard/instance-initializers/setup-routes",["exports","torii/configuration","torii/bootstrap/routing","torii/router-dsl-ext"],function(e,t,n,a){e["default"]={name:"torii-setup-routes",initialize:function(e,a){if(t["default"].sessionServiceName){var r=e.get("router"),o=function i(){var t=r.router.authenticatedRoutes,a=!Ember.isEmpty(t);a&&(0,n["default"])(e,t),r.off("willTransition",i)};r.on("willTransition",o)}}}}),define("github-dashboard/instance-initializers/walk-providers",["exports","torii/configuration","torii/lib/container-utils"],function(e,t,n){e["default"]={name:"torii-walk-providers",initialize:function(e){for(var a in t["default"].providers)t["default"].providers.hasOwnProperty(a)&&(0,n.lookup)(e,"torii-provider:"+a)}}}),define("github-dashboard/router",["exports","ember","github-dashboard/config/environment"],function(e,t,n){var a=t["default"].Router.extend({location:n["default"].locationType});a.map(function(){this.authenticatedRoute("home",{path:"/home"}),this.route("login")}),e["default"]=a}),define("github-dashboard/routes/application",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({beforeModel:function(){return this.get("session").fetch().then(function(){console.log("session fetched")},function(){console.log("no session to fetch")})},actions:{logout:function(){this.get("session").close(),this.transitionTo("login")},accessDenied:function(){this.transitionTo("login")}}})}),define("github-dashboard/routes/home",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({url:"https://api.github.com",model:function(){var e=this.get("url"),n=this.get("session").get("currentUser.username"),a=e+"/users/"+n+"/orgs";return t["default"].$.ajax({url:a})},accessToken:t["default"].computed.alias("session.currentUser.accessToken"),actions:{getMemberAndRepos:function(e){var n=this;this.controller.set("organisation",e);var a=this.get("url"),r=this.get("accessToken"),o=a+"/orgs/"+e+"/members?access_token="+r,i=a+"/orgs/"+e+"/repos?access_token="+r+"&per_page=100",l={members:t["default"].$.ajax({url:o}),repos:t["default"].$.ajax({url:i})};t["default"].RSVP.hash(l).then(function(e){n.controller.set("members",e.members),n.controller.set("repos",e.repos)})},getRepoStat:function(){var e=this,n=this.controller.get("repos");if(t["default"].isArray(n)){var a=n.slice(1,3),r=this.get("url"),o=this.get("accessToken"),i=a.map(function(e){return r+"/repos/"+e.full_name+"/stats/contributors?access_token="+o}),l=i.map(function(e){return t["default"].$.ajax({url:e})});t["default"].RSVP.all(l).then(function(t){return e.controller.set("contributions",t)})}}}})}),define("github-dashboard/routes/index",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({redirect:function(){this.transitionTo("home")}})}),define("github-dashboard/routes/login",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({onActivate:function(){this.get("session").get("isAuthenticated")&&this.transitionTo("index")}.on("activate"),actions:{signIn:function(e){var n=this;this.controller.set("signingIn",!0),this.controller.set("error",null),t["default"].run.schedule("afterRender",this,function(){t["default"].$("#signin-modal-back").one("click",function(){n.controller.set("signingIn",!1)}),n.get("session").open("firebase",{provider:e,settings:{scope:"read:org,repo"}}).then(function(){n.controller.set("signingIn",!1),n.transitionTo("home")},function(e){n.controller.set("signingIn",!1),n.controller.set("error","Could not sign you in: "+e.message)})})}}})}),define("github-dashboard/services/firebase",["exports","emberfire/services/firebase","github-dashboard/config/environment"],function(e,t,n){t["default"].config=n["default"],e["default"]=t["default"]}),define("github-dashboard/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:4,column:0}},moduleName:"github-dashboard/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n  ");e.appendChild(t,n);var n=e.createElement("button"),a=e.createTextNode("Logout");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[3]),r=new Array(2);return r[0]=e.createMorphAt(t,1,1,n),r[1]=e.createElementMorph(a),r},statements:[["content","session.currentUser.username",["loc",[null,[2,2],[2,34]]]],["element","action",["logout"],[],["loc",[null,[3,10],[3,29]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:5,column:10}},moduleName:"github-dashboard/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,1,1,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["block","if",[["get","session.isAuthenticated",["loc",[null,[1,6],[1,29]]]]],[],0,null,["loc",[null,[1,0],[4,7]]]],["content","outlet",["loc",[null,[5,0],[5,10]]]]],locals:[],templates:[e]}}())}),define("github-dashboard/templates/components/high-charts",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"github-dashboard/templates/components/high-charts.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("github-dashboard/templates/home",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:4,column:2},end:{line:12,column:2}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("li"),a=e.createTextNode("\n      ");e.appendChild(n,a);var a=e.createElement("a");e.setAttribute(a,"href","#");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n      ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n      : ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a);var a=e.createTextNode(" members\n      : ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a);var a=e.createTextNode(" repos\n    ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=e.childAt(a,[1]),o=new Array(4);return o[0]=e.createElementMorph(r),o[1]=e.createMorphAt(r,1,1),o[2]=e.createMorphAt(a,3,3),o[3]=e.createMorphAt(a,5,5),o},statements:[["element","action",["getMemberAndRepos",["get","org.login",["loc",[null,[6,47],[6,56]]]]],["on","click"],["loc",[null,[6,18],[6,69]]]],["content","org.login",["loc",[null,[7,8],[7,21]]]],["content","members.length",["loc",[null,[9,8],[9,26]]]],["content","repos.length",["loc",[null,[10,8],[10,24]]]]],locals:["org"],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:20,column:2},end:{line:24,column:2}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("li"),a=e.createTextNode("\n      ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(e.childAt(t,[1]),1,1),a},statements:[["inline","high-charts",[],["content",["subexpr","@mut",[["get","chart.chartData",["loc",[null,[22,28],[22,43]]]]],[],[]],"chartOptions",["subexpr","@mut",[["get","chart.chartOptions",["loc",[null,[22,57],[22,75]]]]],[],[]]],["loc",[null,[22,6],[22,77]]]]],locals:["chart"],templates:[]}}(),n=function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:31,column:6},end:{line:33,column:6}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        [");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode(": ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("]  \n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,1,1,n),a[1]=e.createMorphAt(t,3,3,n),a},statements:[["content","c.author.login",["loc",[null,[32,9],[32,27]]]],["content","c.total",["loc",[null,[32,29],[32,40]]]]],locals:["c"],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:29,column:2},end:{line:35,column:2}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("li"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a);var a=e.createTextNode("    ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(e.childAt(t,[1]),1,1),a},statements:[["block","each",[["get","contrib",["loc",[null,[31,14],[31,21]]]]],[],0,null,["loc",[null,[31,6],[33,15]]]]],locals:["contrib"],templates:[e]}}(),a=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:41,column:2},end:{line:43,column:2}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("li"),a=e.createElement("a");e.setAttribute(a,"href","#");var r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(e.childAt(t,[1,0]),0,0),a},statements:[["content","member.login",["loc",[null,[42,21],[42,37]]]]],locals:["member"],templates:[]}}(),r=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:47,column:2},end:{line:49,column:2}},moduleName:"github-dashboard/templates/home.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("li"),a=e.createElement("a");e.setAttribute(a,"href","#");var r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(e.childAt(t,[1,0]),0,0),a},statements:[["content","repo.name",["loc",[null,[48,21],[48,34]]]]],locals:["repo"],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:51,column:0}},moduleName:"github-dashboard/templates/home.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h3"),a=e.createTextNode("Organisations for  ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("ul"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("hr");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("h3"),a=e.createTextNode("Render contribution graph for top 2 repo");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("button"),a=e.createTextNode("Draw Graph");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("ol"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("hr");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("ol"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("hr");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("ol"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("ol"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[8]),r=new Array(7);return r[0]=e.createMorphAt(e.childAt(t,[0]),1,1),r[1]=e.createMorphAt(e.childAt(t,[2]),1,1),r[2]=e.createElementMorph(a),r[3]=e.createMorphAt(e.childAt(t,[10]),1,1),r[4]=e.createMorphAt(e.childAt(t,[14]),1,1),r[5]=e.createMorphAt(e.childAt(t,[18]),1,1),r[6]=e.createMorphAt(e.childAt(t,[20]),1,1),r},statements:[["content","session.currentUser.username",["loc",[null,[1,23],[1,55]]]],["block","each",[["get","content",["loc",[null,[4,10],[4,17]]]]],[],0,null,["loc",[null,[4,2],[12,11]]]],["element","action",["getRepoStat"],[],["loc",[null,[17,8],[17,32]]]],["block","each",[["get","chartContent",["loc",[null,[20,10],[20,22]]]]],[],1,null,["loc",[null,[20,2],[24,11]]]],["block","each",[["get","contributions",["loc",[null,[29,10],[29,23]]]]],[],2,null,["loc",[null,[29,2],[35,11]]]],["block","each",[["get","members",["loc",[null,[41,10],[41,17]]]]],[],3,null,["loc",[null,[41,2],[43,11]]]],["block","each",[["get","repos",["loc",[null,[47,10],[47,15]]]]],[],4,null,["loc",[null,[47,2],[49,11]]]]],locals:[],templates:[e,t,n,a,r]}}())}),define("github-dashboard/templates/login",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:2,column:0},end:{line:4,column:0}},moduleName:"github-dashboard/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  One sec while we get you signed in...\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:4,column:0},end:{line:7,column:0}},moduleName:"github-dashboard/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n  ");e.appendChild(t,n);var n=e.createElement("button"),a=e.createTextNode("Sign in with github");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[3]),r=new Array(2);return r[0]=e.createMorphAt(t,1,1,n),r[1]=e.createElementMorph(a),r},statements:[["content","error",["loc",[null,[5,2],[5,11]]]],["element","action",["signIn","github"],[],["loc",[null,[6,10],[6,38]]]]],locals:[],templates:[]}}(),n=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:9,column:0},end:{line:17,column:0}},moduleName:"github-dashboard/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"id","signin-modal-back");var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"id","signin-modal-frame");var r=e.createTextNode("\n      ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"id","signin-modal-content");var o=e.createTextNode("\n        ");e.appendChild(r,o);var o=e.createComment("");e.appendChild(r,o);var o=e.createTextNode("\n      ");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(e.childAt(t,[1,1,1]),1,1),a},statements:[["content","torii-iframe-placeholder",["loc",[null,[13,8],[13,36]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:17,column:7}},moduleName:"github-dashboard/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h1"),a=e.createTextNode("Github Dashboard");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,2,2,n),a[1]=e.createMorphAt(t,4,4,n),e.insertBoundary(t,null),a},statements:[["block","if",[["get","session.isWorking",["loc",[null,[2,6],[2,23]]]]],[],0,1,["loc",[null,[2,0],[7,7]]]],["block","if",[["get","signingIn",["loc",[null,[9,6],[9,15]]]]],[],2,null,["loc",[null,[9,0],[17,7]]]]],locals:[],templates:[e,t,n]}}())}),define("github-dashboard/torii-adapters/application",["exports","ember","emberfire/torii-adapters/firebase"],function(e,t,n){e["default"]=n["default"].extend({firebase:t["default"].inject.service()})}),define("github-dashboard/torii-providers/firebase",["exports","emberfire/torii-providers/firebase"],function(e,t){e["default"]=t["default"]}),define("github-dashboard/config/environment",["ember"],function(e){var t="github-dashboard";try{var n=t+"/config/environment",a=e["default"].$('meta[name="'+n+'"]').attr("content"),r=JSON.parse(unescape(a));return{"default":r}}catch(o){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests||require("github-dashboard/app")["default"].create({name:"github-dashboard",version:"0.0.0+969f0a2e"});