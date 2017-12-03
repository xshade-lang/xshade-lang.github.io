import React, { Component } from 'react';
import {render}  from 'react-dom';

export default class PaneComponent extends React.Component {
    render() {
        return (
        <div>
            {this.props.children}
        </div>
        );
    }
};

PaneComponent.propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
};