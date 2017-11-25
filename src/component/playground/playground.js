import React, { Component } from 'react';
import {render}  from 'react-dom';
import brace     from 'brace';
import {split as SplitEditor} from 'react-ace';
import AceEditor from 'react-ace';

import styled from 'styled-components';
import { Quicksand } from '../../style/font';

import 'brace/mode/rust'
import 'brace/theme/monokai';

import '../../../editor/mode/xshade';
import '../../../editor/theme/xshade';

import {program} from './example_program.xs'

import 'brace/ext/split'
ace.acequire(['ace/split'], function(s) { brace.Split = s.Split; })

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
  width: 75%;
  height: 600px;
  background:#ddd;
`;

const RightBlock = styled.div`
  float:right;
  display:inline-block;
  width:  23%;
  height: 600px;
  padding:10px;
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

const RenderedScene = styled.canvas`
  width: 100%;
`;

class XShadeMode extends ace.acequire('ace/mode/rust').Mode {
	constructor(){
		super();
		// Your code goes here
	}
}

var inputEditorInstance   = null;
var resultEditorInstance  = null;

var currentEditorContents = "";

function onEditorLoad(editor) {
  inputEditorInstance  = editor.getEditor(0);
  resultEditorInstance = editor.getEditor(1);

  inputEditorInstance.setValue(program, 1 /* Move cursor to end */);
  resultEditorInstance.setValue(
`/*
  RESULT WINDOW:
   Write your XShade program in the editor to the left and click \"Run\". 
   Compilation results will then be displayed here.
*/`
    , 1);

  const customMode = new XShadeMode();
  inputEditorInstance.getSession().setMode(customMode);

  resultEditorInstance.setReadOnly(true);

  inputEditorInstance.focus();
}

function onEditorChange({ newValue }) {
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
    var playground_css = document.createElement("link");
    
    playground_css.rel   = "stylesheet"; 
    playground_css.href  = "./src/component/playground/playground.generated.css";
    playground_css.type  = "text/css";
    playground_css.media = "screen";
  
    global.document.body.appendChild(playground_script);
    global.document.body.appendChild(wasm_adapter_script);
    global.document.head.appendChild(playground_css);  
    
    var btnXSC = document.getElementById("xsc_it");
    btnXSC.onclick = function () {  
        var moduleCode        = inputEditorInstance.getValue();      
        var invokeXSCWithCode = Module.cwrap('xsc_call_w_code', 'string', ['string']);
        
        resultEditorInstance.setValue(invokeXSCWithCode(moduleCode), 1);

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
          <SplitEditor
            theme="xshade"
            name="UNIQUE_ID_OF_DIV"
            mode="rust"            
            splits={2}
            orientation="beside"
            onLoad={onEditorLoad}
            onChange={onEditorChange}
            editorProps={
              {$blockScrolling: true}
            }
            width="100%"
            height="600px"
          />           
          <button id="xsc_it">Run</button>
        </LeftBlock>
        <RightBlock class="emscripten_border">
            <h1>Quick Guide</h1>
            <span>
              To be done but will be awesome!
            </span>
        </RightBlock>        
        <ClearBlock class="clear" />        
        <RenderedScene class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" />
      </Container>
    );
  }
};

export default create;
