import React, { Component } from 'react';
import {render}  from 'react-dom';

export default class TabEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            displayClassName: "tabs_content_inactive",
        }
    }

    componentDidMount() {        
        this.state.selected = this.props.selected;
    }

    handleTabClick(index, event) {
        event.preventDefault();
        this.setState({
          selected: index
        }, () => { 
            if(this.props.onSelectedChanged)
                this.props.onSelectedChanged(this.state.selected);
        });        
    }

    _renderTitles() {
        return (
          <ul className="tabs_labels">           
            {React.Children.map(this.props.children, (child, i) => 
                <li className={'tabs_labels_item ' + ((i == this.state.selected) ? 'content_active' : 'content_inactive')} key={i}>
                    <a href="#" 
                        className={((i == this.state.selected) ? 'active' : '')}
                        onClick={this.handleTabClick.bind(this, i)}>
                        {child.props.label}
                    </a>
                </li>
            )}
          </ul>
        );
    }

    _renderContent() {
        return (         
            <div className="tabs_content">
                {React.Children.map(this.props.children, (child, i) => 
                    <div className={'wrapper searchDiv ' + ((i == this.state.selected) ? 'tabs_content_active' : 'tabs_content_inactive')}>
                        {child}
                    </div>
                )}
            </div>
        );
    }

    render() {
      return (
        <div className="tabs">
            {this._renderTitles()}
            {this._renderContent()}
        </div>
      );
    }
};

TabEditorComponent.propTypes = {
    selected: React.PropTypes.number,
    onSelectedChanged: React.PropTypes.func,
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
    ]).isRequired
};

TabEditorComponent.defaultProps = {
    selected: 0,
    onSelectedChanged: null,
    children: []
};