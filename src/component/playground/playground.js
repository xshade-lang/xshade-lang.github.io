import React, { Component } from 'react';
import {render as renderReactDOM}  from 'react-dom';
import brace     from 'brace';
import {split as SplitEditor} from 'react-ace';
import AceEditor, {AceEditorProps} from 'react-ace';

import TabEditorComponent  from '../tabbed_editor/TabEditorComponent';
import PaneComponent from '../tabbed_editor/PaneComponent';

import styled from 'styled-components';
import { Quicksand } from '../../style/font';

import 'brace/mode/rust'
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';

import '../../../editor/mode/xshade';
import '../../../editor/theme/xshade';

import {program as default_program} from './example_program.xs'

import 'brace/ext/split'
import LinkedList from '../tabbed_editor/LinkedList';
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

var editorContainer = null;
var editorComponent = null;

const create = () => class Playground extends Component {
  constructor(props) {
    super(props);

    let max_tabs = 6;

    this.state = {
      editorData: [],
      resultEditorData: [{ 
        name: "",
        id: "",
        value: "",
        cursorPosition: null,
        editorInstance: null
      }],
      selectedId: -1,
      max_tabs: max_tabs
    };
  }

  updateDimensions() {
    Object.keys(this.state.editorData).map((key) => {
      if(this.state.editorData[key].editorInstance) 
        this.state.editorData[key].editorInstance.resize();
    });
    if(this.state.resultEditorData
       && this.state.resultEditorData[0]
       && this.state.resultEditorData[0].editorInstance) {
      this.state.resultEditorData[0].editorInstance.resize();
    }
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
    
    let pg = this;

    var btnXSC = document.getElementById("xshade_compile");
    btnXSC.onclick = function () { pg.handleRunRequest(); };

    this.refs.TabEditorComponent.appendTab("main");

    // Manullay trigger resize event to have the editors be resized appropriately.
    this.updateDimensions();
    window.dispatchEvent(new Event("resize"));
  }

  handleRunRequest() { 
    
    var moduleCode        = this.state.editorData[this.state.selectedId].editorInstance.getValue();      
    var invokeXSCWithCode = Module.cwrap('xsc_call_w_code', 'string', ['string']);
    
    this.state.resultEditorData[0].editorInstance.setValue(invokeXSCWithCode(moduleCode), 1);

    // Deactivated until we have a god damn beautifier rule set :D

    // var beautify = ace.acequire("ace/ext/beautify"); // get reference to extension
    // beautify.beautify(editorInstance.session);
  }

  componentDidUpdate() {
    console.log("Update done");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  onInputEditorLoad(editor, id) {  
    console.log("Loading editor: " + id + "!");

    const customMode = new XShadeMode();
    
    this.state.editorData[id].editorInstance = editor;
    editor.className += "input_editor";        
    editor.getSession().setMode(customMode);        
    editor.focus();
    // inputEditorInstance.setHighlightSelectedWord(true);
    editor.setHighlightActiveLine(true);
    editor.setValue(default_program, 1);
  }

  onResultEditorLoad(editor) {
    this.state.resultEditorData[0].name  = "ResultEditor";
    this.state.resultEditorData[0].id    = "ResultEditor_TabIdDefault_1337";
    this.state.resultEditorData[0].value = 
  `/*
  RESULT WINDOW:
  Write your XShade program in the editor to the left and click \"Run\". 
  Compilation results will then be displayed here.
  */`;

    const customMode = new XShadeMode();

    this.state.resultEditorData[0].editorInstance = editor;
    this.state.resultEditorData[0].cursorPosition = this.state.resultEditorData[0].editorInstance.getCursorPosition();
    this.state.resultEditorData[0].editorInstance.className += "result_editor";

    this.state.resultEditorData[0].editorInstance.setValue(this.state.resultEditorData[0].value , 1);
    this.state.resultEditorData[0].editorInstance.setReadOnly(true);
  }

  onEditorChange( id, newValue ) {
    this.state.editorData[id].value          = newValue;
    this.state.editorData[id].cursorPosition = this.state.editorData[id].editorInstance.getCursorPosition();
    this.setState({editorData: this.state.editorData});
  }
  
  onResultEditorChange( newValue ) {
    this.state.resultEditorData[0].value          = newValue;
    this.state.resultEditorData[0].cursorPosition = this.state.resultEditorData[0].editorInstance.getCursorPosition();
  }

  onTabEditorSelectedChanged(instance, newIndex, id) {
    return instance.onTabEditorSelectedChangedImpl(newIndex, id);
  }

  onTabEditorSelectedChangedImpl(newIndex, id) {
    // currentEditorContents = newValue;
    console.log("New tab (" + id + ") index: " + newIndex );

    this.state.selectedId = id;
    this.state.editorData[id].editorInstance.focus();
    
    // if(newIndex < 0) {
    //   this.currentEditorData = null;
    //   this.inputEditorInstance.setValue("// Enter XShade-Code here", 1);
    //   return;
    // }
    //if(this.currentEditorData && this.currentEditorData.value)
     // this.inputEditorInstance.setValue(this.currentEditorData.value, 1);
  }

  onTabEditorCreateTabRequest(instance, name) {
    return instance.onTabEditorCreateTabRequestImpl(name);
  }

  onTabEditorCreateTabRequestImpl(name) {
    let editorData = {
      name: null,
      id: null,
      value: "",
      cursorPosition: 0,
      editorInstance: null
    };

    const tab_id  = name.replace(/\s/g, "") + '_' + Math.floor((Math.random() * 100000) + 1);

    editorData.name  = name;
    editorData.id    = tab_id;
    editorData.value = default_program;
    this.state.editorData[tab_id] = editorData;

    this.setState({editorData: this.state.editorData});

    const tab = {
      tab_id: tab_id,
      name:   editorData.name,
    }
    return (tab);
  }

  onTabEditorClose(instance, id) { 
    return instance.onTabEditorCloseImpl(id);
  }

  onTabEditorCloseImpl(id) {
    console.log("Deleting tab " + id);
    delete this.state.editorData[id];
    this.setState({editorData: this.state.editorData});
  }

  render() {

    const header  = this.props.header;
    const content = this.props.content;

    console.log("Rendering playground");

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
            <div className="tabbed_editor_container">
              <TabEditorComponent 
                id="TabHolder"
                ref="TabEditorComponent"
                selected={0} 
                max_tabs={this.state.max_tabs}
                onCreateTab={(id, name) => { return this.onTabEditorCreateTabRequest(this, id, name); }}
                onSelectedChanged={(index, id) => { return this.onTabEditorSelectedChanged(this, index, id); }}
                onCloseTab={(id) => { return this.onTabEditorClose(this, id); }} >
                {Object.keys(this.state.editorData).map((data, index) => 
                  <AceEditor
                    theme="tomorrow"
                    key={data}
                    className={"input_editor_instance " + "input_editor_" + data}
                    name="input_editor_instance"
                    mode="rust"            
                    onLoad={(editor) => { this.onInputEditorLoad(editor, data); }}
                    onChange={(newValue) => { this.onEditorChange(data, newValue); }}
                    editorProps={
                      {$blockScrolling: true}
                    }
                    width="100%"
                    height="600px"
                    value={this.state.editorData[data].value}
                    cursorStart={this.state.editorData[data].cursorPosition}
                    ref={data}
                    assigned_tab_id={data}
                    assigned_name={this.state.editorData[data].name}
                  />
                )}
              </TabEditorComponent>
            </div>
            
            <AceEditor
              theme="tomorrow"
              className="result_editor_instance"
              name="result_editor_instance"
              mode="rust"            
              onLoad={(editor) => { this.onResultEditorLoad(editor); }}
              onChange={(newValue) => { this.onResultEditorChange(newValue); }}
              editorProps={
                {$blockScrolling: true}
              }
              value={this.state.resultEditorData[0].value}
              cursorStart={this.state.resultEditorData[0].cursorPosition}
              width="50%"
              height="600px"
              ref="resultEditor"
            />        
            <div className="clear" />     
        </div>
      </Container>
    );
  }
};

export default create;
