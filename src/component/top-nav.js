import React, { Component } from 'react';
import styled from 'styled-components';
import { Apricot, LightAzure } from '../style/color';
import { PtSans } from '../style/font';

const Container = styled.div`
  margin: none;
  height: 5em;
  background-color: #FFF;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

const Brand = styled.span`
  font-family: 'Nothing You Could Do';
  font-size: 2em;
  cursor: default;
  margin-left: 90px;
  color: #A00000;
  position:relative;
  top:40px;
`;

const create = () => class TopNav extends Component {
  render() {
    return (
      <Container>
        <div id="wheel_container">
          <div id="wheel_container_proportions">
            <div id="wheel" className="wheel">
              <ul id="wheel_umbrella"  className="wheel_umbrella">
                <li id="wheel_color_0"  className="wheel_color"></li>
                <li id="wheel_color_1"  className="wheel_color"></li>
                <li id="wheel_color_2"  className="wheel_color"></li>
                <li id="wheel_color_3"  className="wheel_color"></li>
                <li id="wheel_color_4"  className="wheel_color"></li>
                <li id="wheel_color_5"  className="wheel_color"></li>
                <li id="wheel_color_6"  className="wheel_color"></li>
                <li id="wheel_color_7"  className="wheel_color"></li>
                <li id="wheel_color_8"  className="wheel_color"></li>
                <li id="wheel_color_9"  className="wheel_color"></li>
                <li id="wheel_color_10" className="wheel_color"></li>
                <li id="wheel_color_11" className="wheel_color"></li>
              </ul>
              <span id="wheel_label" className="wheel_label">X</span>
            </div>
          </div>          
        </div>        
        <div id="wheel_clear" className="wheel_clear"/>
        <Brand>Shade-Playground</Brand>
      </Container>
    );
  }
};

export default create;
