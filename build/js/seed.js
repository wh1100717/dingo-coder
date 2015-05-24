
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 !function(){var a,b;return a=function(a,b,c,d){var e;return e=null!=window.addEventListener?!1:!0,a[e?"attachEvent":"addEventListener"](""+(e?"on":"")+b,c,d||!1)},b=!1,a(window,"message",function(a){return b?void 0:(b=!0,window._dingo_element=JSON.parse(a.data),console.log("From postMessage",window._dingo_element))})}(),require.config({paths:{codemirror:"./vendor/codemirror",firebase:"./vendor/firebase/firebase"},shim:{firebase:{exports:"Firebase"}}});