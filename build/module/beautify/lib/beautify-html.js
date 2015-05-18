
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 !function(){function a(a){return a.replace(/^\s+/g,"")}function b(a){return a.replace(/\s+$/g,"")}function c(c,d,e,f){function g(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=i,this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?=".split(","),extra_liners:u,in_array:function(a,b){for(var c=0;c<b.length;c++)if(a===b[c])return!0;return!1}},this.is_whitespace=function(a){for(var b=0;b<a.length;a++)if(!this.Utils.in_array(a.charAt(b),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var a="";if(a=this.input.charAt(this.pos),this.Utils.in_array(a,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(a,this.Utils.whitespace);)o&&"\n"===a&&this.newlines<=p&&(this.newlines+=1),this.pos++,a=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(a){this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,a),this.print_indentation(a)):(this.line_char_count++,a.push(" "))},this.get_content=function(){for(var a="",b=[];"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(b);else{if(q){var c=this.input.substr(this.pos,3);if("{{#"===c||"{{/"===c)break;if("{{!"===c)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"===this.input.substr(this.pos,2)&&"{{else}}"===this.get_tag(!0))break}a=this.input.charAt(this.pos),this.pos++,this.line_char_count++,b.push(a)}}return b.length?b.join(""):""},this.get_contents_to=function(a){if(this.pos===this.input.length)return["","TK_EOF"];var b="",c=new RegExp("</"+a+"\\s*>","igm");c.lastIndex=this.pos;var d=c.exec(this.input),e=d?d.index:this.input.length;return this.pos<e&&(b=this.input.substring(this.pos,e),this.pos=e),b},this.record_tag=function(a){this.tags[a+"count"]?(this.tags[a+"count"]++,this.tags[a+this.tags[a+"count"]]=this.indent_level):(this.tags[a+"count"]=1,this.tags[a+this.tags[a+"count"]]=this.indent_level),this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent,this.tags.parent=a+this.tags[a+"count"]},this.retrieve_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!==b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]],this.tags.parent=this.tags[b+"parent"]),delete this.tags[a+this.tags[a+"count"]+"parent"],delete this.tags[a+this.tags[a+"count"]],1===this.tags[a+"count"]?delete this.tags[a+"count"]:this.tags[a+"count"]--}},this.indent_to_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!==b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]])}},this.get_tag=function(a){var b,c,d,e="",f=[],g="",h=!1,i=!0,j=this.pos,l=this.line_char_count;a=void 0!==a?a:!1;do{if(this.pos>=this.input.length)return a&&(this.pos=j,this.line_char_count=l),f.length?f.join(""):["","TK_EOF"];if(e=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(e,this.Utils.whitespace))h=!0;else{if(("'"===e||'"'===e)&&(e+=this.get_unformatted(e),h=!0),"="===e&&(h=!1),f.length&&"="!==f[f.length-1]&&">"!==e&&h){if(this.space_or_wrap(f),h=!1,!i&&"force"===r&&"/"!==e){this.print_newline(!0,f),this.print_indentation(f);for(var m=0;s>m;m++)f.push(k)}for(var o=0;o<f.length;o++)if(" "===f[o]){i=!1;break}}if(q&&"<"===d&&e+this.input.charAt(this.pos)==="{{"&&(e+=this.get_unformatted("}}"),f.length&&" "!==f[f.length-1]&&"<"!==f[f.length-1]&&(e=" "+e),h=!0),"<"!==e||d||(b=this.pos-1,d="<"),q&&!d&&f.length>=2&&"{"===f[f.length-1]&&"{"===f[f.length-2]&&(b="#"===e||"/"===e||"!"===e?this.pos-3:this.pos-2,d="{"),this.line_char_count++,f.push(e),f[1]&&"!"===f[1]){f=[this.get_comment(b)];break}if(q&&f[1]&&"{"===f[1]&&f[2]&&"!"===f[2]){f=[this.get_comment(b)];break}if(q&&"{"===d&&f.length>2&&"}"===f[f.length-2]&&"}"===f[f.length-1])break}}while(">"!==e);var p,t,u=f.join("");p=u.indexOf(-1!==u.indexOf(" ")?" ":"{"===u[0]?"}":">"),t="<"!==u[0]&&q?"#"===u[2]?3:2:1;var v=u.substring(t,p).toLowerCase();return"/"===u.charAt(u.length-2)||this.Utils.in_array(v,this.Utils.single_token)?a||(this.tag_type="SINGLE"):q&&"{"===u[0]&&"else"===v?a||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(v,n)?(g=this.get_unformatted("</"+v+">",u),f.push(g),c=this.pos-1,this.tag_type="SINGLE"):"script"===v&&(-1===u.search("type")||u.search("type")>-1&&u.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)>-1)?a||(this.record_tag(v),this.tag_type="SCRIPT"):"style"===v&&(-1===u.search("type")||u.search("type")>-1&&u.search("text/css")>-1)?a||(this.record_tag(v),this.tag_type="STYLE"):"!"===v.charAt(0)?a||(this.tag_type="SINGLE",this.traverse_whitespace()):a||("/"===v.charAt(0)?(this.retrieve_tag(v.substring(1)),this.tag_type="END"):(this.record_tag(v),"html"!==v.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(f),this.Utils.in_array(v,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!==this.output[this.output.length-2]&&this.print_newline(!0,this.output))),a&&(this.pos=j,this.line_char_count=l),f.join("")},this.get_comment=function(a){var b="",c=">",d=!1;for(this.pos=a,input_char=this.input.charAt(this.pos),this.pos++;this.pos<=this.input.length&&(b+=input_char,b[b.length-1]!==c[c.length-1]||-1===b.indexOf(c));)!d&&b.length<10&&(0===b.indexOf("<![if")?(c="<![endif]>",d=!0):0===b.indexOf("<![cdata[")?(c="]]>",d=!0):0===b.indexOf("<![")?(c="]>",d=!0):0===b.indexOf("<!--")?(c="-->",d=!0):0===b.indexOf("{{!")&&(c="}}",d=!0)),input_char=this.input.charAt(this.pos),this.pos++;return b},this.get_unformatted=function(a,b){if(b&&-1!==b.toLowerCase().indexOf(a))return"";var c="",d="",e=0,f=!0;do{if(this.pos>=this.input.length)return d;if(c=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(c,this.Utils.whitespace)){if(!f){this.line_char_count--;continue}if("\n"===c||"\r"===c){d+="\n",this.line_char_count=0;continue}}d+=c,this.line_char_count++,f=!0,q&&"{"===c&&d.length&&"{"===d[d.length-2]&&(d+=this.get_unformatted("}}"),e=d.length)}while(-1===d.toLowerCase().indexOf(a,e));return d},this.get_token=function(){var a;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var b=this.last_token.substr(7);return a=this.get_contents_to(b),"string"!=typeof a?a:[a,"TK_"+b]}if("CONTENT"===this.current_mode)return a=this.get_content(),"string"!=typeof a?a:[a,"TK_CONTENT"];if("TAG"===this.current_mode){if(a=this.get_tag(),"string"!=typeof a)return a;var c="TK_TAG_"+this.tag_type;return[a,c]}},this.get_full_indent=function(a){return a=this.indent_level+a||0,1>a?"":Array(a+1).join(this.indent_string)},this.is_unformatted=function(a,b){if(!this.Utils.in_array(a,b))return!1;if("a"!==a.toLowerCase()||!this.Utils.in_array("a",b))return!0;var c=this.get_tag(!0),d=(c||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!d||this.Utils.in_array(d,b)?!0:!1},this.printer=function(c,d,e,f,g){this.input=c||"",this.output=[],this.indent_character=d,this.indent_string="",this.indent_size=e,this.brace_style=g,this.indent_level=0,this.wrap_line_length=f,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(a,c){this.line_char_count=0,c&&c.length&&(a||"\n"!==c[c.length-1])&&("\n"!==c[c.length-1]&&(c[c.length-1]=b(c[c.length-1])),c.push("\n"))},this.print_indentation=function(a){for(var b=0;b<this.indent_level;b++)a.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(b){(!this.is_whitespace(b)||this.output.length)&&((b||""!==b)&&this.output.length&&"\n"===this.output[this.output.length-1]&&(this.print_indentation(this.output),b=a(b)),this.print_token_raw(b))},this.print_token_raw=function(a){this.newlines>0&&(a=b(a)),a&&""!==a&&(a.length>1&&"\n"===a[a.length-1]?(this.output.push(a.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(a));for(var c=0;c<this.newlines;c++)this.print_newline(c>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(d=d||{},void 0!==d.wrap_line_length&&0!==parseInt(d.wrap_line_length,10)||void 0===d.max_char||0===parseInt(d.max_char,10)||(d.wrap_line_length=d.max_char),i=void 0===d.indent_inner_html?!1:d.indent_inner_html,j=void 0===d.indent_size?4:parseInt(d.indent_size,10),k=void 0===d.indent_char?" ":d.indent_char,m=void 0===d.brace_style?"collapse":d.brace_style,l=0===parseInt(d.wrap_line_length,10)?32786:parseInt(d.wrap_line_length||250,10),n=d.unformatted||["a","span","img","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","pre","address","dt","h1","h2","h3","h4","h5","h6"],o=void 0===d.preserve_newlines?!0:d.preserve_newlines,p=o?isNaN(parseInt(d.max_preserve_newlines,10))?32786:parseInt(d.max_preserve_newlines,10):0,q=void 0===d.indent_handlebars?!1:d.indent_handlebars,r=void 0===d.wrap_attributes?"auto":d.wrap_attributes,s=void 0===d.wrap_attributes_indent_size?j:parseInt(d.wrap_attributes_indent_size,10)||j,t=void 0===d.end_with_newline?!1:d.end_with_newline,u=Array.isArray(d.extra_liners)?d.extra_liners.concat():"string"==typeof d.extra_liners?d.extra_liners.split(","):"head,body,/html".split(","),h=new g,h.printer(c,k,j,l,m);;){var v=h.get_token();if(h.token_text=v[0],h.token_type=v[1],"TK_EOF"===h.token_type)break;switch(h.token_type){case"TK_TAG_START":h.print_newline(!1,h.output),h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===h.last_token&&""===h.last_text){var w=h.token_text.match(/\w+/)[0],x=null;h.output.length&&(x=h.output[h.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null===x||x[1]!==w&&!h.Utils.in_array(x[1],n))&&h.print_newline(!1,h.output)}h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var y=h.token_text.match(/^\s*<([a-z-]+)/i);y&&h.Utils.in_array(y[1],n)||h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_CONTENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==h.token_text){h.print_newline(!1,h.output);var z,A=h.token_text,B=1;"TK_SCRIPT"===h.token_type?z="function"==typeof e&&e:"TK_STYLE"===h.token_type&&(z="function"==typeof f&&f),"keep"===d.indent_scripts?B=0:"separate"===d.indent_scripts&&(B=-h.indent_level);var C=h.get_full_indent(B);if(z)A=z(A.replace(/^\s*/,C),d);else{var D=A.match(/^\s*/)[0],E=D.match(/[^\n\r]*$/)[0].split(h.indent_string).length-1,F=h.get_full_indent(B-E);A=A.replace(/^\s*/,C).replace(/\r\n|\r|\n/g,"\n"+F).replace(/\s+$/,"")}A&&(h.print_token_raw(A),h.print_newline(!0,h.output))}h.current_mode="TAG";break;default:""!==h.token_text&&h.print_token(h.token_text)}h.last_token=h.token_type,h.last_text=h.token_text}var G=h.output.join("").replace(/[\r\n\t ]+$/,"");return t&&(G+="\n"),G}if("function"==typeof define&&define.amd)define(["require","./beautify","./beautify-css"],function(a){var b=a("./beautify"),d=a("./beautify-css");return{html_beautify:function(a,e){return c(a,e,b.js_beautify,d.css_beautify)}}});else if("undefined"!=typeof exports){var d=require("./beautify.js"),e=require("./beautify-css.js");exports.html_beautify=function(a,b){return c(a,b,d.js_beautify,e.css_beautify)}}else"undefined"!=typeof window?window.html_beautify=function(a,b){return c(a,b,window.js_beautify,window.css_beautify)}:"undefined"!=typeof global&&(global.html_beautify=function(a,b){return c(a,b,global.js_beautify,global.css_beautify)})}();