(function(t){function e(e){for(var a,r,u=e[0],s=e[1],c=e[2],d=0,f=[];d<u.length;d++)r=u[d],i[r]&&f.push(i[r][0]),i[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,r=1;r<n.length;r++){var u=n[r];0!==i[u]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i={app:0},o=[];function u(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-2d0e95df":"48b4531d","chunk-30001bf1":"98eb6369","chunk-aba26a64":"0b8c2dd9","chunk-b224e49e":"ab4aedaa","chunk-f1f75efa":"4537c1e9"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n={"chunk-aba26a64":1,"chunk-b224e49e":1,"chunk-f1f75efa":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-2d0e95df":"31d6cfe0","chunk-30001bf1":"31d6cfe0","chunk-aba26a64":"c7d2e742","chunk-b224e49e":"ba4f64d2","chunk-f1f75efa":"985f87e0"}[t]+".css",i=s.p+a,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var c=o[u],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===a||d===i))return e()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){c=f[u],d=c.getAttribute("data-href");if(d===a||d===i)return e()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=e,l.onerror=function(e){var a=e&&e.target&&e.target.src||i,o=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete r[t],l.parentNode.removeChild(l),n(o)},l.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(l)}).then(function(){r[t]=0}));var a=i[t];if(0!==a)if(a)e.push(a[2]);else{var o=new Promise(function(e,n){a=i[t]=[e,n]});e.push(a[2]=o);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=u(t),c=function(e){d.onerror=d.onload=null,clearTimeout(f);var n=i[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,n[1](o)}i[t]=void 0}};var f=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/voyager/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var f=0;f<c.length;f++)e(c[f]);var l=d;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"30d6":function(t,e,n){},"565d":function(t,e,n){},"5dfc":function(t,e,n){"use strict";var a=n("30d6"),r=n.n(a);r.a},7941:function(t,e,n){"use strict";n.d(e,"a",function(){return i});n("6762"),n("2fdb"),n("456d"),n("ac6a");var a=n("d225"),r=n("b0b4"),i=function(){function t(e){Object(a["a"])(this,t),this.id="",this.attributes={},this.structure={connections:[],components:[]},Object.assign(this,e)}return Object(r["a"])(t,[{key:"setAttributes",value:function(t,e){var n={};t.forEach(function(t){Object.keys(t).forEach(function(a){"id"!==a.toLowerCase()&&(n[a]=parseFloat(t[a]),e.commit("processAttributeValue",{key:a,value:parseFloat(t[a])}))})}),this.attributes=n}},{key:"addAttribute",value:function(t,e,n){"id"!==t.toLowerCase()&&(this.attributes[t]=parseFloat(e),n.commit("processAttributeValue",{key:t,value:this.attributes[t]}))}},{key:"setGraph",value:function(t){var e=this;t.forEach(function(t){Object.keys(t).forEach(function(n){e.structure.components.includes(n)||e.structure.components.push(n),t[n].forEach(function(t){Object.keys(t).forEach(function(a){var r={label:a,from:n,to:t[a]};e.structure.connections.push(r)})})})})}}]),t}()},b2b9:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return s});var a=n("d225"),r=function t(){Object(a["a"])(this,t),this.configurationURL="",this.visualisationURL=""},i={settings:function(t){return t}},o={updateSettings:function(t,e){t.configurationURL=e.configurationURL,t.visualisationURL=e.visualisationURL}},u={},s={actions:u,getters:i,mutations:o,state:new r}},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=(n("313e"),n("95c0"),n("7cb2"),n("9ca8")),i=n("5f5b"),o=(n("f9e3"),n("2dd8"),n("e84c"),n("15f5"),n("7f7f"),new a["default"]),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message-box"},t._l(t.messages,function(e){return n("b-alert",{key:"m-"+e.id,class:{"message-active":e.show},attrs:{show:"",dismissible:"",fade:"",variant:e.type}},[t._v("\n    "+t._s(e.content)+"\n  ")])}),1)},s=[],c=(n("20d6"),n("d225")),d=n("b0b4"),f=n("308d"),l=n("6bb5"),p=n("4e2b"),h=n("9ab4"),m=n("60a3"),b=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(f["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.messages=[],t}return Object(p["a"])(e,t),Object(d["a"])(e,[{key:"mounted",value:function(){o.$on("message-add",this.add)}},{key:"add",value:function(t){t.id||(t.id=Date.now()),t.show=!0,this.messages.push(t),this.setTimer(t)}},{key:"fadeOut",value:function(t){var e=this.messages.findIndex(function(e){return e.id===t});this.messages[e].show=!1}},{key:"remove",value:function(t){var e=this.messages.findIndex(function(e){return e.id===t});this.messages.splice(e,1)}},{key:"setTimer",value:function(t){var e=this;t.duration||(t.duration=4e3),setTimeout(function(t){e.fadeOut(t)},t.duration,t.id),setTimeout(function(t){e.remove(t)},t.duration+1e3,t.id)}}]),e}(m["c"]);b=h["a"]([m["a"]],b);var v=b,g=v,y=(n("d1a8"),n("2877")),w=Object(y["a"])(g,u,s,!1,null,null,null),k=w.exports;function x(t){null==t.duration&&(t.duration=3e3),null==t.type&&(t.type="default"),o.$emit("message-add",t)}var O={install:function(t){t.component(k.name,k),t.prototype.$message=x}},j=O,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("navbar"),n("main",{attrs:{id:"main",role:"main"}},[n("router-view")],1),n("message-box")],1)},C=[],_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-navbar",{attrs:{type:"dark",id:"navbar",fixed:"top"}},[n("b-navbar-brand",[n("svg",{staticClass:"icon",attrs:{width:"30px",height:"30px",viewBox:"0 0 100 100",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[n("g",{attrs:{id:"Icon/B&W",stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[n("path",{attrs:{d:"M30.9276331,7.22194673 L42.382389,15.4439705 C43.382285,16.1616783 43.8423606,17.4173106 43.5428655,18.6111277 L25.5826307,90.2024134 C25.3849735,90.9902946 24.8762703,91.6643472 24.1728011,92.0704954 L23.9235953,92.2143744 C23.5144015,92.4506225 22.9911675,92.3104224 22.7549193,91.9012286 C22.6735562,91.7603035 22.6340716,91.5990969 22.6410979,91.4365224 L26.181078,9.52957212 C26.2526197,7.87426314 27.6525087,6.59036608 29.3078177,6.66190776 C29.8907279,6.68710086 30.453642,6.88172418 30.9276331,7.22194673 Z","fill-opacity":"0.5",fill:"#FFFFFF",transform:"translate(33.306445, 48.490289) scale(1, -1) rotate(20.000000) translate(-33.306445, -48.490289) "}}),n("path",{attrs:{d:"M63.7912028,9.95637971 L76.0057326,18.2676491 C77.0487251,18.9773442 77.5362921,20.2637232 77.22573,21.4864463 L59.0111701,93.1995406 C58.8119544,93.9838788 58.3043188,94.654469 57.6034944,95.0590902 L57.3497969,95.2055624 C56.9376453,95.4435183 56.4106291,95.3023047 56.1726733,94.8901531 C56.091614,94.7497542 56.0518046,94.5893367 56.0578186,94.4273296 L59.1055894,12.3253616 C59.1670524,10.6696478 60.5590993,9.37725213 62.2148131,9.43871516 C62.7784935,9.45963998 63.3248552,9.63905762 63.7912028,9.95637971 Z","fill-opacity":"0.8",fill:"#FFFFFF",transform:"translate(66.871514, 51.444939) rotate(20.000000) translate(-66.871514, -51.444939) "}})])]),t._v("\n    Voyager\n  ")]),n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Solution Explorer")]),n("b-nav-item-dropdown",[n("template",{slot:"button-content"},[t._v("Reports")]),t._l(t.reports,function(e){return n("b-dropdown-item",{key:e.id+"-report",attrs:{to:"/reports/"+e.id}},[t._v("\n          "+t._s(e.name)+"\n        ")])}),0===t.reports.length?n("b-dropdown-item",{attrs:{disabled:""}},[n("span",{staticClass:"text-muted"},[t._v("No reports found")])]):t._e(),n("b-dropdown-divider"),n("b-dropdown-item",{directives:[{name:"b-modal",rawName:"v-b-modal.newreport",modifiers:{newreport:!0}}]},[t._v("Add report")])],2),n("b-nav-item",{attrs:{to:"/about"}},[t._v("About")])],1),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item",{attrs:{href:"https://www.github.com/jasonmash/voyager",title:"GitHub"}},[n("i",{staticClass:"fab fa-github"})])],1)],1),n("b-modal",{ref:"newreport",attrs:{id:"newreport",title:"Create Report"},on:{ok:t.createReportOk}},[n("b-form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.createReportSubmit(e)}}},[n("b-form-group",{attrs:{label:"Report name:","label-for":"name"}},[n("b-form-input",{attrs:{id:"name",type:"text",required:""},model:{value:t.newReportName,callback:function(e){t.newReportName=e},expression:"newReportName"}})],1)],1)],1)],1)},R=[],V=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(f["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.newReportName="",t}return Object(p["a"])(e,t),Object(d["a"])(e,[{key:"createReportOk",value:function(t){t.preventDefault(),this.newReportName?this.createReportSubmit():alert("Please enter a report name")}},{key:"createReportSubmit",value:function(){var t=this,e={id:this.$store.getters.reports.length,name:this.newReportName,sections:[]};this.$store.commit("addReport",e),this.$nextTick(function(){var n=t.$refs.newreport;n.hide(),t.$router.push("/reports/"+e.id)})}},{key:"reports",get:function(){return this.$store.getters.reports}}]),e}(m["c"]);V=h["a"]([m["a"]],V);var S=V,E=S,L=(n("5dfc"),Object(y["a"])(E,_,R,!1,null,null,null)),I=L.exports,F=(n("565d"),function(t){function e(){return Object(c["a"])(this,e),Object(f["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(p["a"])(e,t),e}(m["c"]));F=h["a"]([Object(m["a"])({components:{Navbar:I,MessageBox:k}})],F);var N=F,A=N,P=Object(y["a"])(A,M,C,!1,null,null,null),T=P.exports,$=n("8c4f");a["default"].use($["a"]);var B=new $["a"]({mode:"history",base:"/voyager/",routes:[{path:"/",component:function(){return Promise.all([n.e("chunk-aba26a64"),n.e("chunk-b224e49e")]).then(n.bind(null,"fc5a"))}},{path:"/about",component:function(){return n.e("chunk-30001bf1").then(n.bind(null,"f820"))}},{path:"/reports/:id",component:function(){return Promise.all([n.e("chunk-aba26a64"),n.e("chunk-f1f75efa")]).then(n.bind(null,"f489"))},name:"Report"},{path:"*",component:function(){return n.e("chunk-2d0e95df").then(n.bind(null,"8cdb"))}}]}),U=n("2f62"),D=n("7618"),H=n("3c4e"),J=n.n(H),q=n("e55b"),G=n("7941"),Z=function(t,e,n){function a(t){try{return t.setItem("@@",1),t.removeItem("@@"),!0}catch(e){}return!1}function r(t,e,n){try{return(n=e.getItem(t))&&"undefined"!==typeof n?JSON.parse(n):void 0}catch(a){}}function i(){return!0}function o(t,e,n){return n.setItem(t,JSON.stringify(e))}function u(t,e){return 0===e.length?t:e.reduce(function(t,e){return q["b"](t,e)},{})}function s(t){return function(e){return t.subscribe(e)}}if(t=t||{},e=t.storage||window&&window.localStorage,n=t.key||"vuex",!a(e))throw new Error("Invalid storage instance given");return function(a){var c=q["a"](t,"getState",r)(n,e);if("object"===Object(D["a"])(c)&&null!==c){var d=c;d.configurations.data=c.configurations.data.map(function(t){return new G["a"](t)}),a.replaceState(J()(a.state,c,{arrayMerge:t.arrayMerger||function(t,e){return e},clone:!1}))}(t.subscriber||s)(a)(function(a,r){(t.filter||i)(a)&&(t.setState||o)(n,(t.reducer||u)(r,t.paths||[]),e)})}},K=(n("ac6a"),n("2ef0")),W=n.n(K),z=function t(){Object(c["a"])(this,t),this.data=[]},Q={attributes:function(t){return t.data}},X={processAttributeValue:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.key===e.key});if(-1===n)t.data.push({key:e.key,maxValue:e.value,minValue:e.value,filterMaxValue:e.value,filterMinValue:e.value,filterPriority:0,isFiltered:!1,scaleMax:e.value,scaleMin:e.value,isHigherBetter:!0,friendlyName:W.a.startCase(e.key),step:1});else{var r=t.data[n];r.maxValue<e.value&&(r.maxValue=e.value),r.minValue>e.value&&(r.minValue=e.value);var i=function(t){return Math.floor(Math.log(t)/Math.LN10+1e-9)},o=i(r.minValue),u=i(r.maxValue),s=u<o?o:u;r.step=Math.pow(10,s-2),s<0?(r.scaleMax=r.maxValue+(r.step-r.maxValue%r.step),r.scaleMin=r.minValue-(r.step+r.minValue%r.step)):s>2?(r.scaleMax=parseFloat(Math.ceil(r.maxValue+(r.step-Math.ceil(r.maxValue)%r.step)).toPrecision(s)),r.scaleMin=parseFloat(Math.floor(r.minValue-(r.step-Math.floor(r.minValue)%r.step)).toPrecision(s))):(r.scaleMax=Math.ceil(r.maxValue+(r.step-Math.ceil(r.maxValue)%r.step)),r.scaleMin=Math.floor(r.minValue-(r.step-Math.floor(r.minValue)%r.step))),r.filterMinValue=r.scaleMin,r.filterMaxValue=r.scaleMax,a["default"].set(t.data,n,r)}},updateAttribute:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.key===e.key});a["default"].set(t.data,n,W.a.merge(t.data[n],e))},addAttributes:function(t,e){e.forEach(function(e){var n=W.a.findIndex(t.data,function(t){return t.key===e.key});void 0===e.isHigherBetter&&(e.isHigherBetter=!0),n>-1?a["default"].set(t.data,n,W.a.merge(t.data[n],e)):t.data.push(e)})},resetAttributes:function(t){t.data=[]}},Y={},tt={actions:Y,getters:Q,mutations:X,state:new z},et=(n("28a5"),n("55dd"),function t(){Object(c["a"])(this,t),this.data=[]}),nt={configurations:function(t){return t.data.map(function(t){return t}).sort(function(t,e){return+t.id.split(/(\d+)/)[1]-+e.id.split(/(\d+)/)[1]})}},at={addConfiguration:function(t,e){t.data.push(new G["a"](e))},addConfigurations:function(t,e){e.forEach(function(e){var n=W.a.findIndex(t.data,function(t){return t.id===e.id});n>-1?a["default"].set(t.data,n,W.a.merge(t.data[n],e)):t.data.push(new G["a"](e))})},deleteConfiguration:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.id===e.id});t.data.splice(n,1)},updateConfiguration:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.id===e.id});a["default"].set(t.data,n,W.a.merge(t.data[n],e))},resetConfigurations:function(t){t.data=[]}},rt={},it={actions:rt,getters:nt,mutations:at,state:new et},ot=function t(){Object(c["a"])(this,t),this.data=[]},ut={reports:function(t){return t.data.map(function(t){return t}).sort(function(t,e){return+t.name.split(/(\d+)/)[1]-+e.name.split(/(\d+)/)[1]})}},st={addReport:function(t,e){t.data.push(e)},addReportSection:function(t,e){var n=e.id,a=e.section,r=W.a.findIndex(t.data,function(t){return t.id===n});t.data[r].sections.push(a)},addReports:function(t,e){t.data=e},deleteReport:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.id===e.id});t.data.splice(n,1)},deleteReportSection:function(t,e){var n=e.id,a=e.sectionIndex,r=W.a.findIndex(t.data,function(t){return t.id===n});t.data[r].sections.splice(a,1)},updateReport:function(t,e){var n=W.a.findIndex(t.data,function(t){return t.id===e.id});a["default"].set(t.data,n,W.a.merge(t.data[n],e))},resetReports:function(t){t.data=[]}},ct={},dt={actions:ct,getters:ut,mutations:st,state:new ot},ft=n("b2b9");a["default"].use(U["a"]);var lt=new U["a"].Store({modules:{attributes:tt,configurations:it,reports:dt,settings:ft["b"]},plugins:[Z()],strict:!0});a["default"].config.productionTip=!1,a["default"].component("e-chart",r["a"]),a["default"].use(i["a"]),a["default"].use(j),new a["default"]({render:function(t){return t(T)},router:B,store:lt}).$mount("#app")},d1a8:function(t,e,n){"use strict";var a=n("e3cc"),r=n.n(a);r.a},e3cc:function(t,e,n){},e84c:function(t,e,n){}});
//# sourceMappingURL=app.f35152fb.js.map