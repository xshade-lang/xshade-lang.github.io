import React, { Component } from 'react';
import {render}  from 'react-dom';
import brace     from 'brace';
import {split as SplitEditor} from 'react-ace';
import AceEditor from 'react-ace';

import styled from 'styled-components';
import { Quicksand } from '../../style/font';

import 'brace/mode/rust'
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';

import '../../../editor/mode/xshade';
import '../../../editor/theme/xshade';

import {program} from './example_program.xs'

import 'brace/ext/split'
ace.acequire(['ace/split'], function(s) { brace.Split = s.Split; })

const Container = styled.div`
  width: 100%;
  height: 700px;
  margin-top: 20px;
`
const Header = styled.h1`
  font-size: 1.4em;
  font-family: ${ Quicksand };
`;

const ClearBlock = styled.div`
  clear:both;
`;

const RenderedScene = styled.canvas`
  width: 100%;
`;

class XShadeMode extends ace.acequire('ace/mode/rust').Mode {
	constructor(){
		super();
		// Your code goes here
	}
}

var splitEditorInstance   = null;
var inputEditorInstance   = null;
var resultEditorInstance  = null;

var currentEditorContents = "";

function onInputEditorLoad(editor) {
  const customMode = new XShadeMode();

  inputEditorInstance = editor;
  inputEditorInstance.className  += "input_editor";

  inputEditorInstance.setValue(program, 1 /* Move cursor to end */);
  inputEditorInstance.getSession().setMode(customMode);

  inputEditorInstance.focus();
  // inputEditorInstance.setHighlightSelectedWord(true);
  inputEditorInstance.setHighlightActiveLine(true);

}

function onResultEditorLoad(editor) {
  const customMode = new XShadeMode();

  resultEditorInstance = editor;
  resultEditorInstance.className += "result_editor";

  resultEditorInstance.setValue(
`/*
  RESULT WINDOW:
   Write your XShade program in the editor to the left and click \"Run\". 
   Compilation results will then be displayed here.
*/`
    , 1);
  resultEditorInstance.setReadOnly(true);
  
}


function onEditorChange({ newValue }) {
  // currentEditorContents = newValue;
}

var editorContainer = null;
var editorComponent = null;

const create = () => class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  updateDimensions() {
    // Kanonen auf Spatzen... Yep, I'm annoyed...
    splitEditorInstance.resize();
    inputEditorInstance.resize();
    resultEditorInstance.resize();
  }

  componentDidMount(nextProps, nextState) {
    editorContainer = document.getElementById("editor_container");
    
    window.addEventListener("resize", this.updateDimensions.bind(this));

    var playground_script   = document.createElement("script"); 
    playground_script.src   = "./src/component/playground/playground-v1-wasm.js"; 
    var wasm_adapter_script = document.createElement("script"); 
    wasm_adapter_script.src = "./playground.js"; 
    var playground_css = document.createElement("link");
    
    playground_css.rel   = "stylesheet"; 
    playground_css.href  = "./src/component/playground/playground.generated.css";
    playground_css.type  = "text/css";
    playground_css.media = "screen";
  
    global.document.body.appendChild(playground_script);
    global.document.body.appendChild(wasm_adapter_script);
    global.document.head.appendChild(playground_css);  
    
    var btnXSC = document.getElementById("xshade_compile");
    btnXSC.onclick = function () {  
        var moduleCode        = inputEditorInstance.getValue();      
        var invokeXSCWithCode = Module.cwrap('xsc_call_w_code', 'string', ['string']);
        
        resultEditorInstance.setValue(invokeXSCWithCode(moduleCode), 1);

        // Deactivated until we have a god damn beautifier rule set :D

        // var beautify = ace.acequire("ace/ext/beautify"); // get reference to extension
        // beautify.beautify(editorInstance.session);
    };

    // Manullay trigger resize event to have the editors be resized appropriately.
    this.updateDimensions();
    window.dispatchEvent(new Event("resize"));
  }

  componentDidUpdate() {
    console.log("Update done");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {

    const header  = this.props.header;
    const content = this.props.content;

  // <div className="left_block">             
  //   <h1>Quick Guide</h1>
  //   <span>
  //     To be done but will be awesome!
  //   </span>
  // </div>
  // <RenderedScene class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" />
    return (
      <Container className="playground_container">        
        <Header>
          {header}
        </Header>        
        <div  id="editor_container" className="right_block">
            <div id="editor_toolbar" className="editor_toolbar">
              <input type="button" id="xshade_compile" className="editor_toolbar_button" value="Run" />
            </div>
            <AceEditor
              theme="tomorrow"
              className="input_editor_instance"
              name="input_editor_instance"
              mode="rust"            
              onLoad={onInputEditorLoad}
              onChange={onEditorChange}
              editorProps={
                {$blockScrolling: true}
              }
              width="50%"
              height="600px"
              ref="inputEditor"
            />  
            <AceEditor
              theme="tomorrow"
              className="result_editor_instance"
              name="result_editor_instance"
              mode="rust"            
              onLoad={onResultEditorLoad}
              onChange={onEditorChange}
              editorProps={
                {$blockScrolling: true}
              }
              width="50%"
              height="600px"
              ref="resultEditor"
            />             
        </div>        
      </Container>
    );
  }
};

export default create;
