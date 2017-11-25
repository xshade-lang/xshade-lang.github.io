ace.define("ace/theme/xshade",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-xshade";
exports.cssText = ".ace-xshade .ace_gutter {\
background: #2F3129;\
color: #8F908A\
}\
.ace-xshade .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-xshade {\
background-color: #272822;\
color: #F8F8F2\
}\
.ace-xshade .ace_cursor {\
color: #F8F8F0\
}\
.ace-xshade .ace_marker-layer .ace_selection {\
background: #49483E\
}\
.ace-xshade.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-xshade .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-xshade .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.ace-xshade .ace_marker-layer .ace_active-line {\
background: #202020\
}\
.ace-xshade .ace_gutter-active-line {\
background-color: #272727\
}\
.ace-xshade .ace_marker-layer .ace_selected-word {\
border: 1px solid #49483E\
}\
.ace-xshade .ace_invisible {\
color: #52524d\
}\
.ace-xshade .ace_entity.ace_name.ace_tag,\
.ace-xshade .ace_keyword,\
.ace-xshade .ace_meta.ace_tag,\
.ace-xshade .ace_storage {\
color: #F92672\
}\
.ace-xshade .ace_punctuation,\
.ace-xshade .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-xshade .ace_constant.ace_character,\
.ace-xshade .ace_constant.ace_language,\
.ace-xshade .ace_constant.ace_numeric,\
.ace-xshade .ace_constant.ace_other {\
color: #AE81FF\
}\
.ace-xshade .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-xshade .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-xshade .ace_support.ace_constant,\
.ace-xshade .ace_support.ace_function {\
color: #66D9EF\
}\
.ace-xshade .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-xshade .ace_storage.ace_type,\
.ace-xshade .ace_support.ace_class,\
.ace-xshade .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.ace-xshade .ace_entity.ace_name.ace_function,\
.ace-xshade .ace_entity.ace_other,\
.ace-xshade .ace_entity.ace_other.ace_attribute-name,\
.ace-xshade .ace_variable {\
color: #A6E22E\
}\
.ace-xshade .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-xshade .ace_string {\
color: #E6DB74\
}\
.ace-xshade .ace_comment {\
color: #75715E\
}\
.ace-xshade .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
