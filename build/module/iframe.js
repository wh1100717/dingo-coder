
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";var c;return c=function(){function a(a,b){this.container=a,this.editor=b,this.ifr=document.createElement("iframe"),this.ifr.id="ifr_coder",this.ifr.scrolling="yes",this.ifr.frameborder=0,this.ifr.setAttribute("class","renderer coder"),this.container.find("#renderer-container").append(this.ifr)}return a.prototype.refresh=function(){var a,b,c;try{a=this.editor.html_editor.doc.getValue().trim(),""===a&&(a="<div></div>"),this.ifr.contentWindow.document.close(),this.ifr.contentWindow.document.write(a),c=document.createElement("style"),b=document.createElement("script"),c.textContent=this.editor.css_editor.doc.getValue(),b.text=this.editor.js_editor.doc.getValue(),this.ifr.contentWindow.document.head.appendChild(c),this.ifr.contentWindow.document.body.appendChild(b)}catch(d){}},a.prototype.remove=function(){return this.container.find("iframe").remove(),this.container.find(".coderead").trigger("click"),this.container.find(".coderead").unbind(),this.container.find(".iframeread").removeClass("active").unbind()},a}(),b.exports=c});