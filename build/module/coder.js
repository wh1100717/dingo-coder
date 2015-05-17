
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 !function(){var a;Polymer("dingo-coder",{html:"",css:"",js:"",icon:"/img/logo.png",title:"Dingo Coder",layout:1,ready:function(){return this.editor=new a(this.$.editor,this)},htmlChanged:function(a,b){return this.editor.set_editor("html",b)},cssChanged:function(a,b){return this.editor.set_editor("css",b)},jsChanged:function(a,b){return this.editor.set_editor("js",b)},layoutChanged:function(a,b){return this.editor.set_layout()}}),a=function(){function a(a,b){this.container=a,this.attrs=b,this.container=$(this.container),this.ifr_init(),this.editor_init(),this.event_bind()}return a.prototype.ifr_init=function(){this.ifr=document.createElement("iframe"),this.ifr.id="ifr_coder",this.ifr.scrolling="no",this.ifr.setAttribute("class","renderer coder"),this.container.find("#renderer-container").append(this.ifr)},a.prototype.ifr_refresh=function(){var a,b,c;try{a=this.html_editor.doc.getValue().trim(),""===a&&(a="<div></div>"),this.ifr.contentWindow.document.close(),this.ifr.contentWindow.document.write(a),c=document.createElement("style"),b=document.createElement("script"),c.textContent=this.css_editor.doc.getValue(),b.text=this.js_editor.doc.getValue(),this.ifr.contentWindow.document.head.appendChild(c),this.ifr.contentWindow.document.body.appendChild(b)}catch(d){}},a.prototype.editor_init=function(){this.js_editor=CodeMirror.fromTextArea(this.container.find("#codejs")[0],{theme:"monokai",lineNumbers:!0,matchBrackets:!0,mode:"text/javascript"}),this.css_editor=CodeMirror.fromTextArea(this.container.find("#codecss")[0],{theme:"monokai",lineNumbers:!0,matchBrackets:!0,mode:"text/css"}),this.html_editor=CodeMirror.fromTextArea(this.container.find("#codehtml")[0],{theme:"monokai",lineNumbers:!0,matchBrackets:!0,mode:"text/html"})},a.prototype.set_editor=function(a,b){return this[a+"_editor"].getDoc().setValue(b)},a.prototype.set_layout=function(){switch(this.container.find(".CodeMirror").removeClass("expansiondown expansionup"),this.container.find("#mode-tabs").removeClass("tabup tabdown"),this.attrs.layout){case 1:this.container.find("#mode-tabs").removeClass("tabup").addClass("tabdown"),this.container.find(".remind").remove(),this.container.find(".CodeMirror").removeClass("expansionup").addClass("expansiondown"),this.container.find(".mode-tab").removeClass("active"),this.container.find(".mode-tab").eq(0).addClass("active");break;case 2:this.container.find("#mode-tabs #file-dropdown-toggle #file-dropdown").hide(),this.container.find(".CodeMirror").show().addClass("expansionup"),this.container.find("#mode-tabs").addClass("tabup"),this.container.find(".CodeMirror").eq(0).prepend("<div class='remind'>HTML</div>"),this.container.find(".CodeMirror").eq(1).prepend("<div class='remind'>CSS</div>"),this.container.find(".CodeMirror").eq(2).prepend("<div class='remind'>JS</div>");break;default:this.attrs.layout=1,this.set_layout()}},a.prototype.event_bind=function(){var a;return a=this,this.container.find(".mode-tab").on("click",function(){var b;if(!$(this).hasClass("active"))return b=a.container.find(".mode-tab").index(this),a.container.find(".mode-tab").removeClass("active"),$(this).addClass("active"),a.container.find(".CodeMirror").removeClass("expansiondown"),a.container.find(".CodeMirror").hide(),a.container.find(".CodeMirror").eq(b).show()}),this.css_editor.on("change",function(a){return function(){return a.ifr_refresh()}}(this)),this.html_editor.on("change",function(a){return function(){return a.ifr_refresh()}}(this)),this.js_editor.on("change",function(a){return function(){return clearTimeout(a.timeout),a.timeout=setTimeout(function(){return a.ifr_refresh()},700)}}(this)),this.container.find("#toggle-full-screen").click(function(){return $(this).hasClass("full-screen-enabled")?a.exit_fullscreen():a.enter_fullscreen(),$(this).toggleClass("full-screen-enabled")}),this.container.find(".iframeread").click(function(){return $(this).hasClass("active")?a.container.find(".coderead").hasClass("active")?($(this).removeClass("active"),a.container.find(".codepanel").removeClass("expansionleft narrowleft").addClass("narrow"),a.container.find(".renderpanel").removeClass("narrowleft expansionleft").addClass("expansion")):(a.container.find(".coderead").click(),setTimeout(function(){return a.container.find(".iframeread").click()},500)):($(this).addClass("active"),a.container.find(".codepanel").removeClass("narrow").addClass("expansionleft"),a.container.find(".renderpanel").removeClass("expansion").addClass("narrowleft"))}),this.container.find(".coderead").on("click",function(){return $(this).hasClass("active")?a.container.find(".iframeread").hasClass("active")?($(this).removeClass("active"),a.container.find(".renderpanel").removeClass("expansionleft narrowleft").addClass("narrow"),a.container.find(".codepanel").removeClass("narrowleft expansionleft").addClass("expansion")):(a.container.find(".iframeread").click(),setTimeout(function(){return a.container.find(".coderead").click()},500)):($(this).addClass("active"),a.container.find(".renderpanel").removeClass("narrow").addClass("expansionleft"),a.container.find(".codepanel").removeClass("expansion").addClass("narrowleft"))}),this.container.find(".mode").on("click",function(a){return function(){return a.attrs.layout++}}(this))},a.prototype.enter_fullscreen=function(){var a,b,c,d;"function"==typeof(a=this.container[0]).requestFullscreen&&a.requestFullscreen(),"function"==typeof(b=this.container[0]).msRequestFullscreen&&b.msRequestFullscreen(),"function"==typeof(c=this.container[0]).mozRequestFullScreen&&c.mozRequestFullScreen(),"function"==typeof(d=this.container[0]).webkitRequestFullscreen&&d.webkitRequestFullscreen()},a.prototype.exit_fullscreen=function(){"function"==typeof document.exitFullscreen&&document.exitFullscreen(),"function"==typeof document.msExitFullscreen&&document.msExitFullscreen(),"function"==typeof document.mozCancelFullScreen&&document.mozCancelFullScreen(),"function"==typeof document.webkitExitFullscreen&&document.webkitExitFullscreen()},a}()}();