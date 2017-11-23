import React     from 'react';
import brace     from 'brace';
import AceEditor from 'react-ace';7

import 'brace/mode/rust';
import 'brace/theme/github';

var editorInstance = null;
export {editorInstance};

var currentEditorContents = "";
export {currentEditorContents}

function onChange({ newValue }) {
  currentEditorContents = newValue;
}

export default function create({ markdown, rust }) {
  const getId = () => 'playground-v1';
  const getHeader = () => (<span>Have fun!</span>);
  const getContent = () => {
    return (
    <div class="container">
      <div id="editor_container" class="left">
        <AceEditor
          id="editor"
          mode="rust"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          onLoad={(editor) => {
            editorInstance = editor;
            editor.focus();
          }}
          onChange={onChange}
          editorProps={{$blockScrolling: true}}
        />
        <button id="xsc_set">Set example program!</button>
        <button id="xsc_it">XSC it!</button>
      </div>
      <div id="output_container" class="center">      
        <textarea id="output" rows="8"></textarea>
      </div>
      <div class="right emscripten_border">
          <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>
      </div>
      <script async type="text/javascript" src="playground.js"></script>
    </div>);
  };

  return {
    getId,
    getHeader,
    getContent
  };
}

export function initPlaygroundV1() {
  var playground_script   = document.createElement("script"); 
  playground_script.src   = "./src/article/playground/playground-v1-wasm.js"; 
  var wasm_adapter_script = document.createElement("script"); 
  wasm_adapter_script.src = "./playground.js"; 

  global.document.body.appendChild(playground_script);
  global.document.body.appendChild(wasm_adapter_script);
  
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
  };

  var btnXSC = document.getElementById("xsc_it");
  btnXSC.onclick = function () {
      console.log(editorInstance.getValue());

      var moduleCode = editorInstance.getValue();    

      var invokeXSCWithCode = Module.cwrap('xsc_call_w_code', 'string', ['string']);
      console.log(invokeXSCWithCode(moduleCode));
  };
}
