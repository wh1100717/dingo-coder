
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 function get_beautify(a,b,c){var d=function(b,c){return a.js_beautify(b,c)};return d.js=a.js_beautify,d.css=b.css_beautify,d.html=c.html_beautify,d.js_beautify=a.js_beautify,d.css_beautify=b.css_beautify,d.html_beautify=c.html_beautify,d}"function"==typeof define&&define.amd?define(["./lib/beautify","./lib/beautify-css","./lib/beautify-html"],function(a,b,c){return get_beautify(a,b,c)}):!function(a){var b=require("./lib/beautify"),c=require("./lib/beautify-css"),d=require("./lib/beautify-html");a.exports=get_beautify(b,c,d)}(module);