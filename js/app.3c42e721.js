(function(e){function t(t){for(var a,r,o=t[0],c=t[1],s=t[2],f=0,l=[];f<o.length;f++)r=o[f],u[r]&&l.push(u[r][0]),u[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==u[o]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},u={app:0},i=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0e95df":"38d33fee","chunk-30001bf1":"5fc7bfad","chunk-d0d4c7ea":"73681236"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-d0d4c7ea":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-2d0e95df":"31d6cfe0","chunk-30001bf1":"31d6cfe0","chunk-d0d4c7ea":"cf7b8116"}[e]+".css",u=c.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===a||f===u))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){s=l[o],f=s.getAttribute("data-href");if(f===a||f===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||u,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.request=a,delete r[e],d.parentNode.removeChild(d),n(i)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){r[e]=0}));var a=u[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise(function(t,n){a=u[e]=[t,n]});t.push(a[2]=i);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=o(e),s=function(t){f.onerror=f.onload=null,clearTimeout(l);var n=u[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");i.type=a,i.request=r,n[1](i)}u[e]=void 0}};var l=setTimeout(function(){s({type:"timeout",target:f})},12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/voyager/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=f;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"30d6":function(e,t,n){},"565d":function(e,t,n){},"5dfc":function(e,t,n){"use strict";var a=n("30d6"),r=n.n(a);r.a},7941:function(e,t,n){"use strict";n.d(t,"a",function(){return l});n("6762"),n("2fdb");var a=n("59ad"),r=n.n(a),u=n("a4bb"),i=n.n(u),o=(n("ac6a"),n("5176")),c=n.n(o),s=n("d225"),f=n("b0b4"),l=function(){function e(t){Object(s["a"])(this,e),this.id="",this.attributes={},this.structure={connections:[],components:[]},c()(this,t)}return Object(f["a"])(e,[{key:"setAttributes",value:function(e,t){var n={};e.forEach(function(e){i()(e).forEach(function(a){"id"!==a.toLowerCase()&&(n[a]=r()(e[a]),t.commit("processAttributeValue",{key:a,value:r()(e[a])}))})}),this.attributes=n}},{key:"setGraph",value:function(e){var t=this;e.forEach(function(e){i()(e).forEach(function(n){t.structure.components.includes(n)||t.structure.components.push(n),e[n].forEach(function(e){i()(e).forEach(function(a){var r={label:a,from:n,to:e[a]};t.structure.connections.push(r)})})})})}}]),e}()},cd49:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=(n("313e"),n("95c0"),n("7cb2"),n("9ca8")),u=n("9f7b"),i=n.n(u),o=(n("f9e3"),n("2dd8"),n("e84c"),n("15f5"),n("7f7f"),new a["default"]),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"message-box"},e._l(e.messages,function(t){return n("b-alert",{key:"m-"+t.id,class:{"message-active":t.show},attrs:{show:"",dismissible:"",fade:"",variant:t.type}},[e._v("\n    "+e._s(t.content)+"\n  ")])}),1)},s=[],f=(n("20d6"),n("0a0d")),l=n.n(f),d=n("d225"),p=n("b0b4"),h=n("308d"),v=n("6bb5"),m=n("4e2b"),b=n("9ab4"),g=n("60a3"),y=function(e){function t(){var e;return Object(d["a"])(this,t),e=Object(h["a"])(this,Object(v["a"])(t).apply(this,arguments)),e.messages=[],e}return Object(m["a"])(t,e),Object(p["a"])(t,[{key:"mounted",value:function(){o.$on("message-add",this.add)}},{key:"add",value:function(e){e.id||(e.id=l()()),e.show=!0,this.messages.push(e),this.setTimer(e)}},{key:"fadeOut",value:function(e){var t=this.messages.findIndex(function(t){return t.id===e});this.messages[t].show=!1}},{key:"remove",value:function(e){var t=this.messages.findIndex(function(t){return t.id===e});this.messages.splice(t,1)}},{key:"setTimer",value:function(e){var t=this;e.duration||(e.duration=4e3),setTimeout(function(e){t.fadeOut(e)},e.duration,e.id),setTimeout(function(e){t.remove(e)},e.duration+1e3,e.id)}}]),t}(g["c"]);y=b["a"]([g["a"]],y);var x=y,k=x,w=(n("d1a8"),n("2877")),O=Object(w["a"])(k,c,s,!1,null,null,null),j=O.exports;function M(e){null==e.duration&&(e.duration=3e3),null==e.type&&(e.type="default"),o.$emit("message-add",e)}var V={install:function(e){e.component(j.name,j),e.prototype.$message=M}},E=V,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("navbar"),n("main",{attrs:{id:"main",role:"main"}},[n("router-view")],1),n("message-box")],1)},S=[],I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-navbar",{attrs:{type:"dark",id:"navbar"}},[n("b-navbar-brand",[e._v("Voyager")]),n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[e._v("Solution Explorer")]),n("b-nav-item",{attrs:{to:"/help"}},[e._v("Help")])],1)],1)],1)},C=[],T=function(e){function t(){return Object(d["a"])(this,t),Object(h["a"])(this,Object(v["a"])(t).apply(this,arguments))}return Object(m["a"])(t,e),t}(g["c"]);T=b["a"]([g["a"]],T);var P=T,A=P,N=(n("5dfc"),Object(w["a"])(A,I,C,!1,null,null,null)),B=N.exports,$=(n("565d"),function(e){function t(){return Object(d["a"])(this,t),Object(h["a"])(this,Object(v["a"])(t).apply(this,arguments))}return Object(m["a"])(t,e),t}(g["c"]));$=b["a"]([Object(g["a"])({components:{Navbar:B,MessageBox:j}})],$);var H=$,L=H,J=Object(w["a"])(L,_,S,!1,null,null,null),q=J.exports,F=n("8c4f");a["default"].use(F["a"]);var G=new F["a"]({mode:"history",base:"/voyager/",routes:[{path:"/",component:function(){return n.e("chunk-d0d4c7ea").then(n.bind(null,"fc5a"))}},{path:"/help",component:function(){return n.e("chunk-30001bf1").then(n.bind(null,"f820"))}},{path:"*",component:function(){return n.e("chunk-2d0e95df").then(n.bind(null,"8cdb"))}}]}),z=n("2f62"),D=n("7618"),K=n("f499"),Q=n.n(K),R=n("3c4e"),U=n.n(R),W=n("e55b"),X=n("7941"),Y=function(e,t,n){function a(e){try{return e.setItem("@@",1),e.removeItem("@@"),!0}catch(t){}return!1}function r(e,t,n){try{return(n=t.getItem(e))&&"undefined"!==typeof n?JSON.parse(n):void 0}catch(a){}}function u(){return!0}function i(e,t,n){return n.setItem(e,Q()(t))}function o(e,t){return 0===t.length?e:t.reduce(function(e,t){return W["b"](e,t)},{})}function c(e){return function(t){return e.subscribe(t)}}if(e=e||{},t=e.storage||window&&window.localStorage,n=e.key||"vuex",!a(t))throw new Error("Invalid storage instance given");return function(a){var s=W["a"](e,"getState",r)(n,t);if("object"===Object(D["a"])(s)&&null!==s){var f=s;f.configurations.data=s.configurations.data.map(function(e){return new X["a"](e)}),a.replaceState(U()(a.state,s,{arrayMerge:e.arrayMerger||function(e,t){return t},clone:!1}))}(e.subscriber||c)(a)(function(a,r){(e.filter||u)(a)&&(e.setState||i)(n,(e.reducer||o)(r,e.paths||[]),t)})}},Z=(n("ac6a"),n("59ad")),ee=n.n(Z),te=n("2ef0"),ne=n.n(te),ae=function e(){Object(d["a"])(this,e),this.data=[]},re={attributes:function(e){return e.data}},ue={processAttributeValue:function(e,t){var n=ne.a.findIndex(e.data,function(e){return e.key===t.key});if(-1===n)e.data.push({key:t.key,maxValue:t.value,minValue:t.value,filterMaxValue:t.value,filterMinValue:t.value,isFiltered:!1,scaleMax:t.value,scaleMin:t.value,isHigherBetter:!0,friendlyName:ne.a.startCase(t.key),step:1});else{var r=e.data[n];r.maxValue<t.value&&(r.maxValue=t.value),r.minValue>t.value&&(r.minValue=t.value);var u=function(e){return Math.floor(Math.log(e)/Math.LN10+1e-9)},i=u(r.minValue),o=u(r.maxValue),c=o<i?i:o;r.step=Math.pow(10,c-2),c<0?(r.scaleMax=r.maxValue+(r.step-r.maxValue%r.step),r.scaleMin=r.minValue-(r.step+r.minValue%r.step)):c>2?(r.scaleMax=ee()(Math.ceil(r.maxValue+(r.step-Math.ceil(r.maxValue)%r.step)).toPrecision(c)),r.scaleMin=ee()(Math.floor(r.minValue-(r.step-Math.floor(r.minValue)%r.step)).toPrecision(c))):(r.scaleMax=Math.ceil(r.maxValue+(r.step-Math.ceil(r.maxValue)%r.step)),r.scaleMin=Math.floor(r.minValue-(r.step-Math.floor(r.minValue)%r.step))),r.filterMinValue=r.scaleMin,r.filterMaxValue=r.scaleMax,a["default"].set(e.data,n,r)}},updateAttribute:function(e,t){var n=ne.a.findIndex(e.data,function(e){return e.key===t.key});a["default"].set(e.data,n,ne.a.merge(e.data[n],t))},addAttributes:function(e,t){t.forEach(function(t){var n=ne.a.findIndex(e.data,function(e){return e.key===t.key});void 0===t.isHigherBetter&&(t.isHigherBetter=!0),n>-1?a["default"].set(e.data,n,ne.a.merge(e.data[n],t)):e.data.push(t)})},resetAttributes:function(e){e.data=[]}},ie={},oe={actions:ie,getters:re,mutations:ue,state:new ae},ce=(n("28a5"),n("55dd"),function e(){Object(d["a"])(this,e),this.data=[]}),se={configurations:function(e){return e.data.map(function(e){return e}).sort(function(e,t){return+e.id.split(/(\d+)/)[1]-+t.id.split(/(\d+)/)[1]})}},fe={addConfiguration:function(e,t){e.data.push(new X["a"](t))},addConfigurations:function(e,t){t.forEach(function(t){var n=ne.a.findIndex(e.data,function(e){return e.id===t.id});n>-1?a["default"].set(e.data,n,ne.a.merge(e.data[n],t)):e.data.push(new X["a"](t))})},deleteConfiguration:function(e,t){var n=ne.a.findIndex(e.data,function(e){return e.id===t.id});e.data.splice(n,1)},updateConfiguration:function(e,t){var n=ne.a.findIndex(e.data,function(e){return e.id===t.id});a["default"].set(e.data,n,ne.a.merge(e.data[n],t))},resetConfigurations:function(e){e.data=[]}},le={},de={actions:le,getters:se,mutations:fe,state:new ce};a["default"].use(z["a"]);var pe=new z["a"].Store({modules:{attributes:oe,configurations:de},plugins:[Y()],strict:!0});a["default"].config.productionTip=!1,a["default"].component("e-chart",r["a"]),a["default"].use(i.a),a["default"].use(E),new a["default"]({render:function(e){return e(q)},router:G,store:pe}).$mount("#app")},d1a8:function(e,t,n){"use strict";var a=n("e3cc"),r=n.n(a);r.a},e3cc:function(e,t,n){},e84c:function(e,t,n){}});
//# sourceMappingURL=app.3c42e721.js.map