import React, { Component } from 'react';
import styled from 'styled-components';
import { Quicksand } from '../../style/font';
import brace     from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/rust';
import 'brace/theme/github';

require('brace/ext/beautify.js') // <script src="../build/src-noconflict/ext-language_tools.js">

const Container = styled.div`
  width: 100%;
  height: 700px;
  margin: 0px auto;
  text-align:left;
  margin-top: 20px;
`

const Header = styled.h1`
  font-size: 1.4em;
  font-family: ${ Quicksand };
`;

const LeftBlock = styled.div`
  float:left;
  display:inline-block;
  width: 33%;
  height: 600px;
  background:#ddd;
`;

const CenterBlock = styled.div`
  display:inline-block;
  width:33%;
  height: 600px;
  background:#aaa;  
  margin-left:0px;
  margin-right:0px;
  padding-left:2px;
  padding-right:0px;
`;

const RightBlock = styled.div`
  float:right;
  display:inline-block;
  width:  33%;
  height: 600px;
  background:#555;
`;

const TextAreaBlock = styled.textarea`
  overflow-y: scroll;
  width: 100%;
  height: 600px;
  resize: none; /* Remove this if you want the user to resize the textarea */
`;

const ClearBlock = styled.div`
  clear:both;
`;

var editorInstance        = null;
var currentEditorContents = "";
function onChange({ newValue }) {
  // currentEditorContents = newValue;
}

const create = () => class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount(nextProps, nextState) {
    var playground_script   = document.createElement("script"); 
    playground_script.src   = "./src/component/playground/playground-v1-wasm.js"; 
    var wasm_adapter_script = document.createElement("script"); 
    wasm_adapter_script.src = "./playground.js"; 
    var beautify_script = document.createElement("beautify");
    beautify_script.src     = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-be‌​autify.js";
    beautify_script.charset = "utf-8"
    var playground_css = document.createElement("link");
    
    playground_css.rel   = "stylesheet"; 
    playground_css.href  = "./src/component/playground/playground.generated.css";
    playground_css.type  = "text/css";
    playground_css.media = "screen";
  
    global.document.body.appendChild(playground_script);
    global.document.body.appendChild(wasm_adapter_script);
    global.document.body.appendChild(beautify_script);
    global.document.head.appendChild(playground_css);

    var compileOutputField = document.getElementById("compile_output");
    
    var btnSetCode = document.getElementById("xsc_set");
    btnSetCode.onclick = function() { 
        var moduleCode = `struct Vec4 {
                          x: f32,
                          y: f32,
                          z: f32,
                          w: f32,
                        }
  
                        fn vec4(x: f32, y: f32, z: f32, w: f32) -> Vec4 {
                          return Vec4 {
                            x: x,
                            y: y,
                            z: z,
                            w: w,
                          };
                        }
      
                        fn main() -> Vec4 {
                          return vec4(0.0, 0.0, 0.0, 0.0);
                        }`;
                        
        editorInstance.setValue(moduleCode);
    }

    // Inject beautify configuration!    
    // ace.define(
    //   "ace/ext/beautify",
    //   [
    //     "require",
    //     "exports",
    //     "module",
    //     "ace/token_iterator",
    //     "./beautify/xshade_rules"
    //   ], 
    //   function(acequire, exports, module) {
    //     "use strict";
    //     var TokenIterator = acequire("ace/token_iterator").TokenIterator;          
    //     var phpTransform  = acequire("./beautify/php_rules").transform;
      
    //     exports.beautify = function(session) {
    //       var iterator = new TokenIterator(session, 0, 0);
    //       var token = iterator.getCurrentToken();
      
    //       var context = session.$modeId.split("/").pop();
      
    //       var code = phpTransform(iterator, context);
    //       session.doc.setValue(code);
    //     };
      
    //     exports.commands = [{
    //       name: "beautify",
    //       exec: function(editor) {
    //           exports.beautify(editor.session);
    //       },
    //       bindKey: "Ctrl-Shift-B"
    //     }];          
    //   }
    // );
    // (function() {
    //     ace.acequire(["ace/ext/beautify"], function() {});
    // })();
    
    var btnXSC = document.getElementById("xsc_it");
    btnXSC.onclick = function () {  
        var moduleCode = editorInstance.getValue();    
  
        var invokeXSCWithCode = Module.cwrap('xsc_call_w_code', 'string', ['string']);
        compileOutputField.value = (invokeXSCWithCode(moduleCode));

        // Deactivated until we have a god damn beautifier rule set :D

        // var beautify = ace.acequire("ace/ext/beautify"); // get reference to extension
        // beautify.beautify(editorInstance.session);
    };
  }

  render() {

    const header  = this.props.header;
    const content = this.props.content;

    return (
      <Container class="container">        
        <Header>
          {header}
        </Header>
        <hr/>
        <LeftBlock id="editor_container">
          <AceEditor
            id="editor"
            mode="rust"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            onLoad={
              (editor) => {
                editorInstance = editor;
                editor.focus();
              }
            }
            onChange={onChange}
            editorProps={
              {$blockScrolling: true}
            }
            width="100%"
            height="600px"
          />
          <button id="xsc_set">Set example program!</button>
          <button id="xsc_it">XSC it!</button>
        </LeftBlock>
        <CenterBlock id="output_container">      
          <TextAreaBlock id="compile_output" rows="8" readonly></TextAreaBlock>
        </CenterBlock>
        <RightBlock class="emscripten_border">
            <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>
        </RightBlock>        
        <ClearBlock class="clear" />
      </Container>
    );
  }
};

export default create;
