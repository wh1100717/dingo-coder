
/**
 * dingo-coder
 * Version: 0.1.2
 * Copyright 2015 - 2015 Forest
 */
 define(function(require,a,b){"use strict";function c(a,b){for(var c=0;c<b.length;c+=1)if(b[c]===a)return!0;return!1}function d(a){return a.replace(/^\s+|\s+$/g,"")}function e(a){return a.replace(/^\s+/g,"")}function f(a){return a.replace(/\s+$/g,"")}function g(a,b){function c(){return t=a.charAt(++v),t||""}function d(b){var d="",e=v;return b&&h(),d=a.charAt(v+1)||"",v=e-1,c(),d}function e(b){for(var d=v;c();)if("\\"===t)c();else{if(-1!==b.indexOf(t))break;if("\n"===t)break}return a.substring(d,v+1)}function f(a){var b=v,d=e(a);return v=b-1,c(),d}function h(){for(var a="";u.test(d());)c(),a+=t;return a}function i(){var a="";for(t&&u.test(t)&&(a=t);u.test(c());)a+=t;return a}function j(b){var e=v;for(b="/"===d(),c();c();){if(!b&&"*"===t&&"/"===d()){c();break}if(b&&"\n"===t)return a.substring(e,v)}return a.substring(e,v)+t}function k(b){return a.substring(v-b.length,v).toLowerCase()===b}function l(){for(var b=v+1;b<a.length;b++){var c=a.charAt(b);if("{"===c)return!0;if(";"===c||"}"===c||")"===c)return!1}return!1}function m(){z++,x+=y}function n(){z--,x=x.slice(0,-o)}b=b||{};var o=b.indent_size||4,p=b.indent_char||" ",q=void 0===b.selector_separator_newline?!0:b.selector_separator_newline,r=void 0===b.end_with_newline?!1:b.end_with_newline,s=void 0===b.newline_between_rules?!0:b.newline_between_rules;"string"==typeof o&&(o=parseInt(o,10));var t,u=/^\s+$/,v=-1,w=0,x=a.match(/^[\t ]*/)[0],y=new Array(o+1).join(p),z=0,A=0,B={};B["{"]=function(a){B.singleSpace(),C.push(a),B.newLine()},B["}"]=function(a){B.newLine(),C.push(a),B.newLine()},B._lastCharWhitespace=function(){return u.test(C[C.length-1])},B.newLine=function(a){a||B.trim(),C.length&&C.push("\n"),x&&C.push(x)},B.singleSpace=function(){C.length&&!B._lastCharWhitespace()&&C.push(" ")},B.trim=function(){for(;B._lastCharWhitespace();)C.pop()};var C=[];x&&C.push(x);for(var D=!1,E=!1,F="",G="";;){var H=i(),I=""!==H,J=-1!==H.indexOf("\n");if(G=F,F=t,!t)break;if("/"===t&&"*"===d()){var K=k("");B.newLine(),C.push(j()),B.newLine(),K&&B.newLine(!0)}else if("/"===t&&"/"===d())J||"{"===G||B.trim(),B.singleSpace(),C.push(j()),B.newLine();else if("@"===t){I&&B.singleSpace(),C.push(t);var L=f(": ,;{}()[]/='\"");L.match(/[ :]$/)&&(c(),L=e(": ").replace(/\s$/,""),C.push(L),B.singleSpace()),L=L.replace(/\s$/,""),L in g.NESTED_AT_RULE&&(A+=1,L in g.CONDITIONAL_GROUP_RULE&&(E=!0))}else"{"===t?"}"===d(!0)?(h(),c(),B.singleSpace(),C.push("{}"),B.newLine(),s&&0===z&&B.newLine(!0)):(m(),B["{"](t),E?(E=!1,D=z>A):D=z>=A):"}"===t?(n(),B["}"](t),D=!1,A&&A--,s&&0===z&&B.newLine(!0)):":"===t?(h(),!D&&!E||k("&")||l()?":"===d()?(c(),C.push("::")):C.push(":"):(C.push(":"),B.singleSpace())):'"'===t||"'"===t?(I&&B.singleSpace(),C.push(e(t))):";"===t?(C.push(t),B.newLine()):"("===t?k("url")?(C.push(t),h(),c()&&(")"!==t&&'"'!==t&&"'"!==t?C.push(e(")")):v--)):(w++,I&&B.singleSpace(),C.push(t),h()):")"===t?(C.push(t),w--):","===t?(C.push(t),h(),!D&&q&&1>w?B.newLine():B.singleSpace()):"]"===t?C.push(t):"["===t?(I&&B.singleSpace(),C.push(t)):"="===t?(h(),t="=",C.push(t)):(I&&B.singleSpace(),C.push(t))}var M=C.join("").replace(/[\r\n\t ]+$/,"");return r&&(M+="\n"),M}function h(a,b){var c=new i(a,b);return c.beautify()}function i(a,b){function f(a,b){var c=0;a&&(c=a.indentation_level,!R.just_added_newline()&&a.line_indent_level>c&&(c=a.line_indent_level));var d={mode:b,parent:a,last_text:a?a.last_text:"",last_word:a?a.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:c,line_indent_level:a?a.line_indent_level:c,start_line_index:R.get_line_number(),ternary_depth:0};return d}function g(a){var b=a.newlines,c=ba.keep_array_indentation&&s(Y.mode);if(c)for(d=0;b>d;d+=1)j(d>0);else if(ba.max_preserve_newlines&&b>ba.max_preserve_newlines&&(b=ba.max_preserve_newlines),ba.preserve_newlines&&a.newlines>1){j();for(var d=1;b>d;d+=1)j(!0)}U=a,aa[U.type]()}function h(a){a=a.replace(/\x0d/g,"");for(var b=[],c=a.indexOf("\n");-1!==c;)b.push(a.substring(0,c)),a=a.substring(c+1),c=a.indexOf("\n");return a.length&&b.push(a),b}function i(a){if(a=void 0===a?!1:a,!R.just_added_newline())if(ba.preserve_newlines&&U.wanted_newline||a)j(!1,!0);else if(ba.wrap_line_length){var b=R.current_line.get_character_count()+U.text.length+(R.space_before_token?1:0);b>=ba.wrap_line_length&&j(!1,!0)}}function j(a,b){if(!b&&";"!==Y.last_text&&","!==Y.last_text&&"="!==Y.last_text&&"TK_OPERATOR"!==V)for(;Y.mode===p.Statement&&!Y.if_block&&!Y.do_block;)u();R.add_new_line(a)&&(Y.multiline_frame=!0)}function m(){R.just_added_newline()&&(ba.keep_array_indentation&&s(Y.mode)&&U.wanted_newline?(R.current_line.push(U.whitespace_before),R.space_before_token=!1):R.set_indent(Y.indentation_level)&&(Y.line_indent_level=Y.indentation_level))}function n(a){ba.comma_first&&"TK_COMMA"===V&&R.just_added_newline()&&","===R.previous_line.last()&&(R.previous_line.pop(),m(),R.add_token(","),R.space_before_token=!0),a=a||U.text,m(),R.add_token(a)}function o(){Y.indentation_level+=1}function q(){Y.indentation_level>0&&(!Y.parent||Y.indentation_level>Y.parent.indentation_level)&&(Y.indentation_level-=1)}function r(a){Y?($.push(Y),Z=Y):Z=f(null,a),Y=f(Z,a)}function s(a){return a===p.ArrayLiteral}function t(a){return c(a,[p.Expression,p.ForInitializer,p.Conditional])}function u(){$.length>0&&(Z=Y,Y=$.pop(),Z.mode===p.Statement&&R.remove_redundant_indentation(Z))}function v(){return Y.parent.mode===p.ObjectLiteral&&Y.mode===p.Statement&&(":"===Y.last_text&&0===Y.ternary_depth||"TK_RESERVED"===V&&c(Y.last_text,["get","set"]))}function w(){return"TK_RESERVED"===V&&c(Y.last_text,["var","let","const"])&&"TK_WORD"===U.type||"TK_RESERVED"===V&&"do"===Y.last_text||"TK_RESERVED"===V&&"return"===Y.last_text&&!U.wanted_newline||"TK_RESERVED"===V&&"else"===Y.last_text&&("TK_RESERVED"!==U.type||"if"!==U.text)||"TK_END_EXPR"===V&&(Z.mode===p.ForInitializer||Z.mode===p.Conditional)||"TK_WORD"===V&&Y.mode===p.BlockStatement&&!Y.in_case&&"--"!==U.text&&"++"!==U.text&&"TK_WORD"!==U.type&&"TK_RESERVED"!==U.type||Y.mode===p.ObjectLiteral&&(":"===Y.last_text&&0===Y.ternary_depth||"TK_RESERVED"===V&&c(Y.last_text,["get","set"]))?(r(p.Statement),o(),"TK_RESERVED"===V&&c(Y.last_text,["var","let","const"])&&"TK_WORD"===U.type&&(Y.declaration_statement=!0),v()||i("TK_RESERVED"===U.type&&c(U.text,["do","for","if","while"])),!0):!1}function x(a,b){for(var c=0;c<a.length;c++){var e=d(a[c]);if(e.charAt(0)!==b)return!1}return!0}function y(a,b){for(var c,d=0,e=a.length;e>d;d++)if(c=a[d],c&&0!==c.indexOf(b))return!1;return!0}function z(a){return c(a,["case","return","do","if","throw","else"])}function A(a){var b=S+(a||0);return 0>b||b>=ca.length?null:ca[b]}function B(){w();var a=p.Expression;if("["===U.text){if("TK_WORD"===V||")"===Y.last_text)return"TK_RESERVED"===V&&c(Y.last_text,T.line_starters)&&(R.space_before_token=!0),r(a),n(),o(),void(ba.space_in_paren&&(R.space_before_token=!0));a=p.ArrayLiteral,s(Y.mode)&&("["===Y.last_text||","===Y.last_text&&("]"===W||"}"===W))&&(ba.keep_array_indentation||j())}else"TK_RESERVED"===V&&"for"===Y.last_text?a=p.ForInitializer:"TK_RESERVED"===V&&c(Y.last_text,["if","while"])&&(a=p.Conditional);";"===Y.last_text||"TK_START_BLOCK"===V?j():"TK_END_EXPR"===V||"TK_START_EXPR"===V||"TK_END_BLOCK"===V||"."===Y.last_text?i(U.wanted_newline):"TK_RESERVED"===V&&"("===U.text||"TK_WORD"===V||"TK_OPERATOR"===V?"TK_RESERVED"===V&&("function"===Y.last_word||"typeof"===Y.last_word)||"*"===Y.last_text&&"function"===W?ba.space_after_anon_function&&(R.space_before_token=!0):"TK_RESERVED"!==V||!c(Y.last_text,T.line_starters)&&"catch"!==Y.last_text||ba.space_before_conditional&&(R.space_before_token=!0):R.space_before_token=!0,"("===U.text&&"TK_RESERVED"===V&&"await"===Y.last_word&&(R.space_before_token=!0),"("===U.text&&("TK_EQUALS"===V||"TK_OPERATOR"===V)&&(v()||i()),r(a),n(),ba.space_in_paren&&(R.space_before_token=!0),o()}function C(){for(;Y.mode===p.Statement;)u();Y.multiline_frame&&i("]"===U.text&&s(Y.mode)&&!ba.keep_array_indentation),ba.space_in_paren&&("TK_START_EXPR"!==V||ba.space_in_empty_paren?R.space_before_token=!0:(R.trim(),R.space_before_token=!1)),"]"===U.text&&ba.keep_array_indentation?(n(),u()):(u(),n()),R.remove_redundant_indentation(Z),Y.do_while&&Z.mode===p.Conditional&&(Z.mode=p.Expression,Y.do_block=!1,Y.do_while=!1)}function D(){var a=A(1),b=A(2);r(b&&(":"===b.text&&c(a.type,["TK_STRING","TK_WORD","TK_RESERVED"])||c(a.text,["get","set"])&&c(b.type,["TK_WORD","TK_RESERVED"]))?c(W,["class","interface"])?p.BlockStatement:p.ObjectLiteral:p.BlockStatement);var d=!a.comments_before.length&&"}"===a.text,e=d&&"function"===Y.last_word&&"TK_END_EXPR"===V;"expand"===ba.brace_style||"none"===ba.brace_style&&U.wanted_newline?"TK_OPERATOR"!==V&&(e||"TK_EQUALS"===V||"TK_RESERVED"===V&&z(Y.last_text)&&"else"!==Y.last_text)?R.space_before_token=!0:j(!1,!0):"TK_OPERATOR"!==V&&"TK_START_EXPR"!==V?"TK_START_BLOCK"===V?j():R.space_before_token=!0:s(Z.mode)&&","===Y.last_text&&("}"===W?R.space_before_token=!0:j()),n(),o()}function E(){for(;Y.mode===p.Statement;)u();var a="TK_START_BLOCK"===V;"expand"===ba.brace_style?a||j():a||(s(Y.mode)&&ba.keep_array_indentation?(ba.keep_array_indentation=!1,j(),ba.keep_array_indentation=!0):j()),u(),n()}function F(){if("TK_RESERVED"===U.type&&Y.mode!==p.ObjectLiteral&&c(U.text,["set","get"])&&(U.type="TK_WORD"),"TK_RESERVED"===U.type&&Y.mode===p.ObjectLiteral){var a=A(1);":"==a.text&&(U.type="TK_WORD")}if(w()||!U.wanted_newline||t(Y.mode)||"TK_OPERATOR"===V&&"--"!==Y.last_text&&"++"!==Y.last_text||"TK_EQUALS"===V||!ba.preserve_newlines&&"TK_RESERVED"===V&&c(Y.last_text,["var","let","const","set","get"])||j(),Y.do_block&&!Y.do_while){if("TK_RESERVED"===U.type&&"while"===U.text)return R.space_before_token=!0,n(),R.space_before_token=!0,void(Y.do_while=!0);j(),Y.do_block=!1}if(Y.if_block)if(Y.else_block||"TK_RESERVED"!==U.type||"else"!==U.text){for(;Y.mode===p.Statement;)u();Y.if_block=!1,Y.else_block=!1}else Y.else_block=!0;if("TK_RESERVED"===U.type&&("case"===U.text||"default"===U.text&&Y.in_case_statement))return j(),(Y.case_body||ba.jslint_happy)&&(q(),Y.case_body=!1),n(),Y.in_case=!0,void(Y.in_case_statement=!0);if("TK_RESERVED"===U.type&&"function"===U.text&&((c(Y.last_text,["}",";"])||R.just_added_newline()&&!c(Y.last_text,["[","{",":","=",","]))&&(R.just_added_blankline()||U.comments_before.length||(j(),j(!0))),"TK_RESERVED"===V||"TK_WORD"===V?"TK_RESERVED"===V&&c(Y.last_text,["get","set","new","return","export","async"])?R.space_before_token=!0:"TK_RESERVED"===V&&"default"===Y.last_text&&"export"===W?R.space_before_token=!0:j():"TK_OPERATOR"===V||"="===Y.last_text?R.space_before_token=!0:(Y.multiline_frame||!t(Y.mode)&&!s(Y.mode))&&j()),("TK_COMMA"===V||"TK_START_EXPR"===V||"TK_EQUALS"===V||"TK_OPERATOR"===V)&&(v()||i()),"TK_RESERVED"===U.type&&c(U.text,["function","get","set"]))return n(),void(Y.last_word=U.text);if(_="NONE","TK_END_BLOCK"===V?"TK_RESERVED"===U.type&&c(U.text,["else","catch","finally"])?"expand"===ba.brace_style||"end-expand"===ba.brace_style||"none"===ba.brace_style&&U.wanted_newline?_="NEWLINE":(_="SPACE",R.space_before_token=!0):_="NEWLINE":"TK_SEMICOLON"===V&&Y.mode===p.BlockStatement?_="NEWLINE":"TK_SEMICOLON"===V&&t(Y.mode)?_="SPACE":"TK_STRING"===V?_="NEWLINE":"TK_RESERVED"===V||"TK_WORD"===V||"*"===Y.last_text&&"function"===W?_="SPACE":"TK_START_BLOCK"===V?_="NEWLINE":"TK_END_EXPR"===V&&(R.space_before_token=!0,_="NEWLINE"),"TK_RESERVED"===U.type&&c(U.text,T.line_starters)&&")"!==Y.last_text&&(_="else"===Y.last_text||"export"===Y.last_text?"SPACE":"NEWLINE"),"TK_RESERVED"===U.type&&c(U.text,["else","catch","finally"]))if("TK_END_BLOCK"!==V||"expand"===ba.brace_style||"end-expand"===ba.brace_style||"none"===ba.brace_style&&U.wanted_newline)j();else{R.trim(!0);var b=R.current_line;"}"!==b.last()&&j(),R.space_before_token=!0}else"NEWLINE"===_?"TK_RESERVED"===V&&z(Y.last_text)?R.space_before_token=!0:"TK_END_EXPR"!==V?"TK_START_EXPR"===V&&"TK_RESERVED"===U.type&&c(U.text,["var","let","const"])||":"===Y.last_text||("TK_RESERVED"===U.type&&"if"===U.text&&"else"===Y.last_text?R.space_before_token=!0:j()):"TK_RESERVED"===U.type&&c(U.text,T.line_starters)&&")"!==Y.last_text&&j():Y.multiline_frame&&s(Y.mode)&&","===Y.last_text&&"}"===W?j():"SPACE"===_&&(R.space_before_token=!0);n(),Y.last_word=U.text,"TK_RESERVED"===U.type&&"do"===U.text&&(Y.do_block=!0),"TK_RESERVED"===U.type&&"if"===U.text&&(Y.if_block=!0)}function G(){for(w()&&(R.space_before_token=!1);Y.mode===p.Statement&&!Y.if_block&&!Y.do_block;)u();n()}function H(){w()?R.space_before_token=!0:"TK_RESERVED"===V||"TK_WORD"===V?R.space_before_token=!0:"TK_COMMA"===V||"TK_START_EXPR"===V||"TK_EQUALS"===V||"TK_OPERATOR"===V?v()||i():j(),n()}function I(){w(),Y.declaration_statement&&(Y.declaration_assignment=!0),R.space_before_token=!0,n(),R.space_before_token=!0}function J(){return Y.declaration_statement?(t(Y.parent.mode)&&(Y.declaration_assignment=!1),n(),void(Y.declaration_assignment?(Y.declaration_assignment=!1,j(!1,!0)):(R.space_before_token=!0,ba.comma_first&&i()))):(n(),void(Y.mode===p.ObjectLiteral||Y.mode===p.Statement&&Y.parent.mode===p.ObjectLiteral?(Y.mode===p.Statement&&u(),j()):(R.space_before_token=!0,ba.comma_first&&i())))}function K(){if(w(),"TK_RESERVED"===V&&z(Y.last_text))return R.space_before_token=!0,void n();if("*"===U.text&&"TK_DOT"===V)return void n();if(":"===U.text&&Y.in_case)return Y.case_body=!0,o(),n(),j(),void(Y.in_case=!1);if("::"===U.text)return void n();"TK_OPERATOR"===V&&i();var a=!0,b=!0;c(U.text,["--","++","!","~"])||c(U.text,["-","+"])&&(c(V,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||c(Y.last_text,T.line_starters)||","===Y.last_text)?(a=!1,b=!1,!U.wanted_newline||"--"!==U.text&&"++"!==U.text||j(!1,!0),";"===Y.last_text&&t(Y.mode)&&(a=!0),"TK_RESERVED"===V?a=!0:"TK_END_EXPR"===V?a=!("]"===Y.last_text&&("--"===U.text||"++"===U.text)):"TK_OPERATOR"===V&&(a=c(U.text,["--","-","++","+"])&&c(Y.last_text,["--","-","++","+"]),c(U.text,["+","-"])&&c(Y.last_text,["--","++"])&&(b=!0)),Y.mode!==p.BlockStatement&&Y.mode!==p.Statement||"{"!==Y.last_text&&";"!==Y.last_text||j()):":"===U.text?0===Y.ternary_depth?a=!1:Y.ternary_depth-=1:"?"===U.text?Y.ternary_depth+=1:"*"===U.text&&"TK_RESERVED"===V&&"function"===Y.last_text&&(a=!1,b=!1),R.space_before_token=R.space_before_token||a,n(),R.space_before_token=b}function L(){var a,b=h(U.text),c=!1,d=!1,f=U.whitespace_before,g=f.length;for(j(!1,!0),b.length>1&&(x(b.slice(1),"*")?c=!0:y(b.slice(1),f)&&(d=!0)),n(b[0]),a=1;a<b.length;a++)j(!1,!0),c?n(" "+e(b[a])):d&&b[a].length>g?n(b[a].substring(g)):R.add_token(b[a]);j(!1,!0)}function M(){R.space_before_token=!0,n(),R.space_before_token=!0}function N(){U.wanted_newline?j(!1,!0):R.trim(!0),R.space_before_token=!0,n(),j(!1,!0)}function O(){w(),"TK_RESERVED"===V&&z(Y.last_text)?R.space_before_token=!0:i(")"===Y.last_text&&ba.break_chained_methods),n()}function P(){n(),"\n"===U.text[U.text.length-1]&&j()}function Q(){for(;Y.mode===p.Statement;)u()}var R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca=[],da="";for(aa={TK_START_EXPR:B,TK_END_EXPR:C,TK_START_BLOCK:D,TK_END_BLOCK:E,TK_WORD:F,TK_RESERVED:F,TK_SEMICOLON:G,TK_STRING:H,TK_EQUALS:I,TK_OPERATOR:K,TK_COMMA:J,TK_BLOCK_COMMENT:L,TK_INLINE_COMMENT:M,TK_COMMENT:N,TK_DOT:O,TK_UNKNOWN:P,TK_EOF:Q},b=b?b:{},ba={},void 0!==b.braces_on_own_line&&(ba.brace_style=b.braces_on_own_line?"expand":"collapse"),ba.brace_style=b.brace_style?b.brace_style:ba.brace_style?ba.brace_style:"collapse","expand-strict"===ba.brace_style&&(ba.brace_style="expand"),ba.indent_size=b.indent_size?parseInt(b.indent_size,10):4,ba.indent_char=b.indent_char?b.indent_char:" ",ba.eol=b.eol?b.eol:"\n",ba.preserve_newlines=void 0===b.preserve_newlines?!0:b.preserve_newlines,ba.break_chained_methods=void 0===b.break_chained_methods?!1:b.break_chained_methods,ba.max_preserve_newlines=void 0===b.max_preserve_newlines?0:parseInt(b.max_preserve_newlines,10),ba.space_in_paren=void 0===b.space_in_paren?!1:b.space_in_paren,ba.space_in_empty_paren=void 0===b.space_in_empty_paren?!1:b.space_in_empty_paren,ba.jslint_happy=void 0===b.jslint_happy?!1:b.jslint_happy,ba.space_after_anon_function=void 0===b.space_after_anon_function?!1:b.space_after_anon_function,ba.keep_array_indentation=void 0===b.keep_array_indentation?!1:b.keep_array_indentation,ba.space_before_conditional=void 0===b.space_before_conditional?!0:b.space_before_conditional,ba.unescape_strings=void 0===b.unescape_strings?!1:b.unescape_strings,ba.wrap_line_length=void 0===b.wrap_line_length?0:parseInt(b.wrap_line_length,10),ba.e4x=void 0===b.e4x?!1:b.e4x,ba.end_with_newline=void 0===b.end_with_newline?!1:b.end_with_newline,ba.comma_first=void 0===b.comma_first?!1:b.comma_first,ba.jslint_happy&&(ba.space_after_anon_function=!0),b.indent_with_tabs&&(ba.indent_char="	",ba.indent_size=1),ba.eol=ba.eol.replace(/\\r/,"\r").replace(/\\n/,"\n"),X="";ba.indent_size>0;)X+=ba.indent_char,ba.indent_size-=1;var ea=0;if(a&&a.length){for(;" "===a.charAt(ea)||"	"===a.charAt(ea);)da+=a.charAt(ea),ea+=1;a=a.substring(ea)}V="TK_START_BLOCK",W="",R=new k(X,da),$=[],r(p.BlockStatement),this.beautify=function(){var b,c;for(T=new l(a,ba,X),ca=T.tokenize(),S=0;b=A();){for(var d=0;d<b.comments_before.length;d++)g(b.comments_before[d]);g(b),W=Y.last_text,V=b.type,Y.last_text=b.text,S+=1}return c=R.get_code(),ba.end_with_newline&&(c+="\n"),"\n"!=ba.eol&&(c=c.replace(/[\r]?[\n]/gm,ba.eol)),c}}function j(a){var b=0,c=-1,d=[],e=!0;this.set_indent=function(d){b=a.baseIndentLength+d*a.indent_length,c=d},this.get_character_count=function(){return b},this.is_empty=function(){return e},this.last=function(){return this._empty?null:d[d.length-1]},this.push=function(a){d.push(a),b+=a.length,e=!1},this.pop=function(){var a=null;return e||(a=d.pop(),b-=a.length,e=0===d.length),a},this.remove_indent=function(){c>0&&(c-=1,b-=a.indent_length)},this.trim=function(){for(;" "===this.last();){d.pop();b-=1}e=0===d.length},this.toString=function(){var b="";return this._empty||(c>=0&&(b=a.indent_cache[c]),b+=d.join("")),b}}function k(a,b){b=b||"",this.indent_cache=[b],this.baseIndentLength=b.length,this.indent_length=a.length;var c=[];this.baseIndentString=b,this.indent_string=a,this.previous_line=null,this.current_line=null,this.space_before_token=!1,this.get_line_number=function(){return c.length},this.add_new_line=function(a){return 1===this.get_line_number()&&this.just_added_newline()?!1:a||!this.just_added_newline()?(this.previous_line=this.current_line,this.current_line=new j(this),c.push(this.current_line),!0):!1},this.add_new_line(!0),this.get_code=function(){var a=c.join("\n").replace(/[\r\n\t ]+$/,"");return a},this.set_indent=function(a){if(c.length>1){for(;a>=this.indent_cache.length;)this.indent_cache.push(this.indent_cache[this.indent_cache.length-1]+this.indent_string);return this.current_line.set_indent(a),!0}return this.current_line.set_indent(0),!1},this.add_token=function(a){this.add_space_before_token(),this.current_line.push(a)},this.add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&this.current_line.push(" "),this.space_before_token=!1},this.remove_redundant_indentation=function(a){if(!a.multiline_frame&&a.mode!==p.ForInitializer&&a.mode!==p.Conditional)for(var b=a.start_line_index,d=c.length;d>b;)c[b].remove_indent(),b++},this.trim=function(d){for(d=void 0===d?!1:d,this.current_line.trim(a,b);d&&c.length>1&&this.current_line.is_empty();)c.pop(),this.current_line=c[c.length-1],this.current_line.trim();this.previous_line=c.length>1?c[c.length-2]:null},this.just_added_newline=function(){return this.current_line.is_empty()},this.just_added_blankline=function(){if(this.just_added_newline()){if(1===c.length)return!0;var a=c[c.length-2];return a.is_empty()}return!1}}function l(a,b,e){function f(){var f,t=[];if(k=0,l="",p>=r)return["","TK_EOF"];var u;u=n.length?n[n.length-1]:new q("TK_START_BLOCK","{");var v=a.charAt(p);for(p+=1;c(v,h);){if("\n"===v?(k+=1,t=[]):k&&(v===e?t.push(e):"\r"!==v&&t.push(" ")),p>=r)return["","TK_EOF"];v=a.charAt(p),p+=1}if(t.length&&(l=t.join("")),i.test(v)){var w=!0,x=!0,y=i;for("0"===v&&r>p&&/[Xx]/.test(a.charAt(p))?(w=!1,x=!1,v+=a.charAt(p),p+=1,y=/[0123456789abcdefABCDEF]/):(v="",p-=1);r>p&&y.test(a.charAt(p));)v+=a.charAt(p),p+=1,w&&r>p&&"."===a.charAt(p)&&(v+=a.charAt(p),p+=1,w=!1),x&&r>p&&/[Ee]/.test(a.charAt(p))&&(v+=a.charAt(p),p+=1,r>p&&/[+-]/.test(a.charAt(p))&&(v+=a.charAt(p),p+=1),x=!1,w=!1);return[v,"TK_WORD"]}if(o.isIdentifierStart(a.charCodeAt(p-1))){if(r>p)for(;o.isIdentifierChar(a.charCodeAt(p))&&(v+=a.charAt(p),p+=1,p!==r););return"TK_DOT"===u.type||"TK_RESERVED"===u.type&&c(u.text,["set","get"])||!c(v,s)?[v,"TK_WORD"]:"in"===v?[v,"TK_OPERATOR"]:[v,"TK_RESERVED"]}if("("===v||"["===v)return[v,"TK_START_EXPR"];if(")"===v||"]"===v)return[v,"TK_END_EXPR"];if("{"===v)return[v,"TK_START_BLOCK"];if("}"===v)return[v,"TK_END_BLOCK"];if(";"===v)return[v,"TK_SEMICOLON"];if("/"===v){var z="",A=!0;if("*"===a.charAt(p)){if(p+=1,r>p)for(;r>p&&("*"!==a.charAt(p)||!a.charAt(p+1)||"/"!==a.charAt(p+1))&&(v=a.charAt(p),z+=v,("\n"===v||"\r"===v)&&(A=!1),p+=1,!(p>=r)););return p+=2,A&&0===k?["/*"+z+"*/","TK_INLINE_COMMENT"]:["/*"+z+"*/","TK_BLOCK_COMMENT"]}if("/"===a.charAt(p)){for(z=v;"\r"!==a.charAt(p)&&"\n"!==a.charAt(p)&&(z+=a.charAt(p),p+=1,!(p>=r)););return[z,"TK_COMMENT"]}}if("`"===v||"'"===v||'"'===v||("/"===v||b.e4x&&"<"===v&&a.slice(p-1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))&&("TK_RESERVED"===u.type&&c(u.text,["return","case","throw","else","do","typeof","yield"])||"TK_END_EXPR"===u.type&&")"===u.text&&u.parent&&"TK_RESERVED"===u.parent.type&&c(u.parent.text,["if","while","for"])||c(u.type,["TK_COMMENT","TK_START_EXPR","TK_START_BLOCK","TK_END_BLOCK","TK_OPERATOR","TK_EQUALS","TK_EOF","TK_SEMICOLON","TK_COMMA"]))){var B=v,C=!1,D=!1;if(f=v,"/"===B)for(var E=!1;r>p&&(C||E||a.charAt(p)!==B)&&!o.newline.test(a.charAt(p));)f+=a.charAt(p),C?C=!1:(C="\\"===a.charAt(p),"["===a.charAt(p)?E=!0:"]"===a.charAt(p)&&(E=!1)),p+=1;else if(b.e4x&&"<"===B){var F=/<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,G=a.slice(p-1),H=F.exec(G);if(H&&0===H.index){for(var I=H[2],J=0;H;){var K=!!H[1],L=H[2],M=!!H[H.length-1]||"![CDATA["===L.slice(0,8);if(L!==I||M||(K?--J:++J),0>=J)break;H=F.exec(G)}var N=H?H.index+H[0].length:G.length;return G=G.slice(0,N),p+=N-1,[G,"TK_STRING"]}}else for(;r>p&&(C||a.charAt(p)!==B&&("`"===B||!o.newline.test(a.charAt(p))));)f+=a.charAt(p),"\r"===a.charAt(p)&&"\n"===a.charAt(p+1)&&(p+=1,f+="\n"),C?(("x"===a.charAt(p)||"u"===a.charAt(p))&&(D=!0),C=!1):C="\\"===a.charAt(p),p+=1;if(D&&b.unescape_strings&&(f=g(f)),r>p&&a.charAt(p)===B&&(f+=B,p+=1,"/"===B))for(;r>p&&o.isIdentifierStart(a.charCodeAt(p));)f+=a.charAt(p),p+=1;return[f,"TK_STRING"]}if("#"===v){if(0===n.length&&"!"===a.charAt(p)){for(f=v;r>p&&"\n"!==v;)v=a.charAt(p),f+=v,p+=1;return[d(f)+"\n","TK_UNKNOWN"]}var O="#";if(r>p&&i.test(a.charAt(p))){do v=a.charAt(p),O+=v,p+=1;while(r>p&&"#"!==v&&"="!==v);return"#"===v||("["===a.charAt(p)&&"]"===a.charAt(p+1)?(O+="[]",p+=2):"{"===a.charAt(p)&&"}"===a.charAt(p+1)&&(O+="{}",p+=2)),[O,"TK_WORD"]}}if("<"===v&&"<!--"===a.substring(p-1,p+3)){for(p+=3,v="<!--";"\n"!==a.charAt(p)&&r>p;)v+=a.charAt(p),p++;return m=!0,[v,"TK_COMMENT"]}if("-"===v&&m&&"-->"===a.substring(p-1,p+2))return m=!1,p+=2,["-->","TK_COMMENT"];if("."===v)return[v,"TK_DOT"];if(c(v,j)){for(;r>p&&c(v+a.charAt(p),j)&&(v+=a.charAt(p),p+=1,!(p>=r)););return","===v?[v,"TK_COMMA"]:"="===v?[v,"TK_EQUALS"]:[v,"TK_OPERATOR"]}return[v,"TK_UNKNOWN"]}function g(a){for(var b,c=!1,d="",e=0,f="",g=0;c||e<a.length;)if(b=a.charAt(e),e++,c){if(c=!1,"x"===b)f=a.substr(e,2),e+=2;else{if("u"!==b){d+="\\"+b;continue}f=a.substr(e,4),e+=4}if(!f.match(/^[0123456789abcdefABCDEF]+$/))return a;if(g=parseInt(f,16),g>=0&&32>g){d+="x"===b?"\\x"+f:"\\u"+f;continue}if(34===g||39===g||92===g)d+="\\"+String.fromCharCode(g);else{if("x"===b&&g>126&&255>=g)return a;d+=String.fromCharCode(g)}}else"\\"===b?c=!0:d+=b;return d}var h="\n\r	 ".split(""),i=/[0-9]/,j="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: => <%= <% %> <?= <? ?>".split(" ");this.line_starters="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var k,l,m,n,p,r,s=this.line_starters.concat(["do","in","else","get","set","new","catch","finally","typeof","yield","async","await"]);this.tokenize=function(){r=a.length,p=0,m=!1,n=[];for(var b,c,d,e=null,g=[],h=[];!c||"TK_EOF"!==c.type;){for(d=f(),b=new q(d[1],d[0],k,l);"TK_INLINE_COMMENT"===b.type||"TK_COMMENT"===b.type||"TK_BLOCK_COMMENT"===b.type||"TK_UNKNOWN"===b.type;)h.push(b),d=f(),b=new q(d[1],d[0],k,l);h.length&&(b.comments_before=h,h=[]),"TK_START_BLOCK"===b.type||"TK_START_EXPR"===b.type?(b.parent=c,e=b,g.push(b)):("TK_END_BLOCK"===b.type||"TK_END_EXPR"===b.type)&&e&&("]"===b.text&&"["===e.text||")"===b.text&&"("===e.text||"}"===b.text&&"}"===e.text)&&(b.parent=e.parent,e=g.pop()),n.push(b),c=b}return n}}function m(a,b,c,d){function g(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=i,this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?=".split(","),extra_liners:u,in_array:function(a,b){for(var c=0;c<b.length;c++)if(a===b[c])return!0;return!1}},this.is_whitespace=function(a){for(var b=0;b<a.length;a++)if(!this.Utils.in_array(a.charAt(b),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var a="";if(a=this.input.charAt(this.pos),this.Utils.in_array(a,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(a,this.Utils.whitespace);)o&&"\n"===a&&this.newlines<=p&&(this.newlines+=1),this.pos++,a=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(a){this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,a),this.print_indentation(a)):(this.line_char_count++,a.push(" "))},this.get_content=function(){for(var a="",b=[];"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(b);else{if(q){var c=this.input.substr(this.pos,3);if("{{#"===c||"{{/"===c)break;if("{{!"===c)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"===this.input.substr(this.pos,2)&&"{{else}}"===this.get_tag(!0))break}a=this.input.charAt(this.pos),this.pos++,this.line_char_count++,b.push(a)}}return b.length?b.join(""):""},this.get_contents_to=function(a){if(this.pos===this.input.length)return["","TK_EOF"];var b="",c=new RegExp("</"+a+"\\s*>","igm");c.lastIndex=this.pos;var d=c.exec(this.input),e=d?d.index:this.input.length;return this.pos<e&&(b=this.input.substring(this.pos,e),this.pos=e),b},this.record_tag=function(a){this.tags[a+"count"]?(this.tags[a+"count"]++,this.tags[a+this.tags[a+"count"]]=this.indent_level):(this.tags[a+"count"]=1,this.tags[a+this.tags[a+"count"]]=this.indent_level),this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent,this.tags.parent=a+this.tags[a+"count"]},this.retrieve_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!==b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]],this.tags.parent=this.tags[b+"parent"]),delete this.tags[a+this.tags[a+"count"]+"parent"],delete this.tags[a+this.tags[a+"count"]],1===this.tags[a+"count"]?delete this.tags[a+"count"]:this.tags[a+"count"]--}},this.indent_to_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!==b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]])}},this.get_tag=function(a){var b,c,d,e="",f=[],g="",h=!1,i=!0,j=this.pos,l=this.line_char_count;a=void 0!==a?a:!1;do{if(this.pos>=this.input.length)return a&&(this.pos=j,this.line_char_count=l),f.length?f.join(""):["","TK_EOF"];if(e=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(e,this.Utils.whitespace))h=!0;else{if(("'"===e||'"'===e)&&(e+=this.get_unformatted(e),h=!0),"="===e&&(h=!1),f.length&&"="!==f[f.length-1]&&">"!==e&&h){if(this.space_or_wrap(f),h=!1,!i&&"force"===r&&"/"!==e){this.print_newline(!0,f),this.print_indentation(f);for(var m=0;s>m;m++)f.push(k)}for(var o=0;o<f.length;o++)if(" "===f[o]){i=!1;break}}if(q&&"<"===d&&e+this.input.charAt(this.pos)==="{{"&&(e+=this.get_unformatted("}}"),f.length&&" "!==f[f.length-1]&&"<"!==f[f.length-1]&&(e=" "+e),h=!0),"<"!==e||d||(b=this.pos-1,d="<"),q&&!d&&f.length>=2&&"{"===f[f.length-1]&&"{"===f[f.length-2]&&(b="#"===e||"/"===e||"!"===e?this.pos-3:this.pos-2,d="{"),this.line_char_count++,f.push(e),f[1]&&"!"===f[1]){f=[this.get_comment(b)];break}if(q&&f[1]&&"{"===f[1]&&f[2]&&"!"===f[2]){f=[this.get_comment(b)];break}if(q&&"{"===d&&f.length>2&&"}"===f[f.length-2]&&"}"===f[f.length-1])break}}while(">"!==e);var p,t,u=f.join("");p=u.indexOf(-1!==u.indexOf(" ")?" ":"{"===u[0]?"}":">"),t="<"!==u[0]&&q?"#"===u[2]?3:2:1;var v=u.substring(t,p).toLowerCase();return"/"===u.charAt(u.length-2)||this.Utils.in_array(v,this.Utils.single_token)?a||(this.tag_type="SINGLE"):q&&"{"===u[0]&&"else"===v?a||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(v,n)?(g=this.get_unformatted("</"+v+">",u),f.push(g),c=this.pos-1,this.tag_type="SINGLE"):"script"===v&&(-1===u.search("type")||u.search("type")>-1&&u.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)>-1)?a||(this.record_tag(v),this.tag_type="SCRIPT"):"style"===v&&(-1===u.search("type")||u.search("type")>-1&&u.search("text/css")>-1)?a||(this.record_tag(v),this.tag_type="STYLE"):"!"===v.charAt(0)?a||(this.tag_type="SINGLE",this.traverse_whitespace()):a||("/"===v.charAt(0)?(this.retrieve_tag(v.substring(1)),this.tag_type="END"):(this.record_tag(v),"html"!==v.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(f),this.Utils.in_array(v,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!==this.output[this.output.length-2]&&this.print_newline(!0,this.output))),a&&(this.pos=j,this.line_char_count=l),f.join("")},this.get_comment=function(a){var b="",c=">",d=!1;for(this.pos=a,input_char=this.input.charAt(this.pos),this.pos++;this.pos<=this.input.length&&(b+=input_char,b[b.length-1]!==c[c.length-1]||-1===b.indexOf(c));)!d&&b.length<10&&(0===b.indexOf("<![if")?(c="<![endif]>",d=!0):0===b.indexOf("<![cdata[")?(c="]]>",d=!0):0===b.indexOf("<![")?(c="]>",d=!0):0===b.indexOf("<!--")?(c="-->",d=!0):0===b.indexOf("{{!")&&(c="}}",d=!0)),input_char=this.input.charAt(this.pos),this.pos++;return b},this.get_unformatted=function(a,b){if(b&&-1!==b.toLowerCase().indexOf(a))return"";var c="",d="",e=0,f=!0;do{if(this.pos>=this.input.length)return d;if(c=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(c,this.Utils.whitespace)){if(!f){this.line_char_count--;continue}if("\n"===c||"\r"===c){d+="\n",this.line_char_count=0;continue}}d+=c,this.line_char_count++,f=!0,q&&"{"===c&&d.length&&"{"===d[d.length-2]&&(d+=this.get_unformatted("}}"),e=d.length)}while(-1===d.toLowerCase().indexOf(a,e));return d},this.get_token=function(){var a;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var b=this.last_token.substr(7);return a=this.get_contents_to(b),"string"!=typeof a?a:[a,"TK_"+b]}if("CONTENT"===this.current_mode)return a=this.get_content(),"string"!=typeof a?a:[a,"TK_CONTENT"];if("TAG"===this.current_mode){if(a=this.get_tag(),"string"!=typeof a)return a;var c="TK_TAG_"+this.tag_type;return[a,c];
}},this.get_full_indent=function(a){return a=this.indent_level+a||0,1>a?"":Array(a+1).join(this.indent_string)},this.is_unformatted=function(a,b){if(!this.Utils.in_array(a,b))return!1;if("a"!==a.toLowerCase()||!this.Utils.in_array("a",b))return!0;var c=this.get_tag(!0),d=(c||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!d||this.Utils.in_array(d,b)?!0:!1},this.printer=function(a,b,c,d,g){this.input=a||"",this.output=[],this.indent_character=b,this.indent_string="",this.indent_size=c,this.brace_style=g,this.indent_level=0,this.wrap_line_length=d,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(a,b){this.line_char_count=0,b&&b.length&&(a||"\n"!==b[b.length-1])&&("\n"!==b[b.length-1]&&(b[b.length-1]=f(b[b.length-1])),b.push("\n"))},this.print_indentation=function(a){for(var b=0;b<this.indent_level;b++)a.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(a){(!this.is_whitespace(a)||this.output.length)&&((a||""!==a)&&this.output.length&&"\n"===this.output[this.output.length-1]&&(this.print_indentation(this.output),a=e(a)),this.print_token_raw(a))},this.print_token_raw=function(a){this.newlines>0&&(a=f(a)),a&&""!==a&&(a.length>1&&"\n"===a[a.length-1]?(this.output.push(a.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(a));for(var b=0;b<this.newlines;b++)this.print_newline(b>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(b=b||{},void 0!==b.wrap_line_length&&0!==parseInt(b.wrap_line_length,10)||void 0===b.max_char||0===parseInt(b.max_char,10)||(b.wrap_line_length=b.max_char),i=void 0===b.indent_inner_html?!1:b.indent_inner_html,j=void 0===b.indent_size?4:parseInt(b.indent_size,10),k=void 0===b.indent_char?" ":b.indent_char,m=void 0===b.brace_style?"collapse":b.brace_style,l=0===parseInt(b.wrap_line_length,10)?32786:parseInt(b.wrap_line_length||250,10),n=b.unformatted||["a","span","img","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","pre","address","dt","h1","h2","h3","h4","h5","h6"],o=void 0===b.preserve_newlines?!0:b.preserve_newlines,p=o?isNaN(parseInt(b.max_preserve_newlines,10))?32786:parseInt(b.max_preserve_newlines,10):0,q=void 0===b.indent_handlebars?!1:b.indent_handlebars,r=void 0===b.wrap_attributes?"auto":b.wrap_attributes,s=void 0===b.wrap_attributes_indent_size?j:parseInt(b.wrap_attributes_indent_size,10)||j,t=void 0===b.end_with_newline?!1:b.end_with_newline,u=Array.isArray(b.extra_liners)?b.extra_liners.concat():"string"==typeof b.extra_liners?b.extra_liners.split(","):"head,body,/html".split(","),h=new g,h.printer(a,k,j,l,m);;){var v=h.get_token();if(h.token_text=v[0],h.token_type=v[1],"TK_EOF"===h.token_type)break;switch(h.token_type){case"TK_TAG_START":h.print_newline(!1,h.output),h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===h.last_token&&""===h.last_text){var w=h.token_text.match(/\w+/)[0],x=null;h.output.length&&(x=h.output[h.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null===x||x[1]!==w&&!h.Utils.in_array(x[1],n))&&h.print_newline(!1,h.output)}h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var y=h.token_text.match(/^\s*<([a-z-]+)/i);y&&h.Utils.in_array(y[1],n)||h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_CONTENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==h.token_text){h.print_newline(!1,h.output);var z,A=h.token_text,B=1;"TK_SCRIPT"===h.token_type?z="function"==typeof c&&c:"TK_STYLE"===h.token_type&&(z="function"==typeof d&&d),"keep"===b.indent_scripts?B=0:"separate"===b.indent_scripts&&(B=-h.indent_level);var C=h.get_full_indent(B);if(z)A=z(A.replace(/^\s*/,C),b);else{var D=A.match(/^\s*/)[0],E=D.match(/[^\n\r]*$/)[0].split(h.indent_string).length-1,F=h.get_full_indent(B-E);A=A.replace(/^\s*/,C).replace(/\r\n|\r|\n/g,"\n"+F).replace(/\s+$/,"")}A&&(h.print_token_raw(A),h.print_newline(!0,h.output))}h.current_mode="TAG";break;default:""!==h.token_text&&h.print_token(h.token_text)}h.last_token=h.token_type,h.last_text=h.token_text}var G=h.output.join("").replace(/[\r\n\t ]+$/,"");return t&&(G+="\n"),G}var n;n={};var o={};!function(a){var b="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",c="̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿",d=new RegExp("["+b+"]"),e=new RegExp("["+b+c+"]");a.newline=/[\n\r\u2028\u2029]/,a.isIdentifierStart=function(a){return 65>a?36===a:91>a?!0:97>a?95===a:123>a?!0:a>=170&&d.test(String.fromCharCode(a))},a.isIdentifierChar=function(a){return 48>a?36===a:58>a?!0:65>a?!1:91>a?!0:97>a?95===a:123>a?!0:a>=170&&e.test(String.fromCharCode(a))}}(o),g.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},g.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0};var p={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"},q=function(a,b,c,d,e,f){this.type=a,this.text=b,this.comments_before=[],this.newlines=c||0,this.wanted_newline=c>0,this.whitespace_before=d||"",this.parent=null};return n.html_beautify=function(a,b){return m(a,b,h,g)},n.css_beautify=g,n.js_beautify=h,b.exports=n});