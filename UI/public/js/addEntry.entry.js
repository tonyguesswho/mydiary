!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){delete localStorage.token,window.location.replace("index.html")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){document.getElementById("signUpBox").insertAdjacentHTML("afterbegin","<p class=\"span31 span3-center\" id='msg'>"+e.message+"</p>"),document.getElementById("msg").className="msg_output_"+t+" span31 span3-center",setTimeout(function(){document.querySelector(".msg_output_"+t).remove()},5e3)}},,,,,function(e,t,n){"use strict";var o=u(n(0)),r=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var i=localStorage.getItem("token");i||window.location.replace("signin.html"),document.getElementById("addEntry").addEventListener("submit",function(e){e.preventDefault();var t=document.getElementById("title").value,n=document.getElementById("textarea").value;fetch("https://mydiary-api.herokuapp.com/api/v1/entries",{method:"POST",headers:{Accept:"application/json, text/plain, */*","content-type":"application/json",Authorization:i},body:JSON.stringify({title:t,description:n})}).then(function(e){return e.json()}).then(function(e){"fail"==e.status?(0,r.default)(e,"fail"):window.location.replace("entries.html")})}),document.getElementById("logout").addEventListener("click",o.default)}]);