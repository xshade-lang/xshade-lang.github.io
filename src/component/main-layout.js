import React, { Component } from 'react';
import styled from 'styled-components';
import { Phone, Tablet, Laptop, Desktop } from '../style/responsive';

const AppContainer = styled.div`
  
`;

const ContentContainer = styled.div`
  margin: 0;
  padding: 0;
  
  @media ${ Phone } {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  @media ${ Tablet } {
    width: 40em;
  }
  @media ${ Laptop } {
    width: 55em;
  }
  @media ${ Desktop } {
    width: 100%;
  }
`;

const create = (TopNav, Playground) => class MainLayout extends Component {
  render() {

    const playground = <Playground />

    return (
    <AppContainer>
      <TopNav />
      <ContentContainer>
        {playground}
      </ContentContainer>
    </AppContainer>
  );
  }
};

export default create;
