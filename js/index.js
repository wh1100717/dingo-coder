
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 !function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;return a={server:"http://dingo.emptystack.net/dingo.html",container:null,iframe:null,editor:{origin:window.location.href,codes:[]}},b=function(a){return function(b){return toString.call(b).toLowerCase()===("[object "+a+"]").toLowerCase()}},k=function(a,c){return b(c)(a)},h=b("object"),j=b("string"),g=b("number"),e=b("array"),f=b("function"),i=b("regexp"),c=function(a,b,c,d){var e;return e=null!=window.addEventListener?!1:!0,a[e?"attachEvent":"addEventListener"](""+(e?"on":"")+b,c,d||!1)},d=function(b){var c;return null!=a.iframe?c:(c=document.createElement("iframe"),c.src=b,c.frameborder=0,c.width=a.container.offsetWidth,c.height=Math.max(a.container.offsetHeight,500),c.setAttribute("style","border: none;"),a.container.appendChild(c),c)},l=function(b,d){var e,f;f=a.iframe.contentWindow,window.ifrWin=f;try{return f.document,c(a.iframe,"load",function(){return f.postMessage(b,a.server)})}catch(g){return e=g,f.postMessage(b,a.server)}},m=function(b){var c;return c=JSON.stringify(a.editor),l(c,b)},Polymer("dingo-coder",{icon:"/img/logo.png",name:"Dingo Coder",layout:1,ready:function(){var b,c,e,f,g;for(c=document.createElement("div"),c.innerHTML=this.innerHTML,e=c.getElementsByTagName("textarea"),f=0,g=e.length;g>f;f++)b=e[f],a.editor.codes.push({type:b.getAttribute("code"),value:b.value});return a.editor.icon=this.icon,a.editor.name=this.name,a.editor.layout=this.layout,a.container=this.$.container,a.iframe=d(a.server),window.container=a.container,console.log(window),window.addEventListener("messsage",function(a){return console.log("what the fuck!"),console.log(a)}),m()}})}();