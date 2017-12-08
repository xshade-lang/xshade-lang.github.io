import React, { Component } from 'react';
import {render as renderReactDOM}  from 'react-dom';
import createFragment from 'react-addons-create-fragment';

import PaneComponent from './PaneComponent';
import LinkedList from './LinkedList';

export default class TabEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            displayClassName: "tabs_content_inactive",
            max_tabs: 10,
            tabs: [],
        }
    }

    get selectedIndex() {
        return this.state.selected;
    }

    componentDidMount() {        
        this.state.selected = this.props.selected;
        this.state.max_tabs = this.props.max_tabs;
    }

    appendTab(named) {
        if(Object.keys(this.state.tabs).length == this.state.max_tabs) {
            // No more tabs allowed
            alert("The maximum of " + this.state.max_tabs + " is reached.");
            return;
        }
        
        const tab = this.props.onCreateTab(named);

        this.state.tabs.push(tab);
        this.setState(
            {
                selected: this.state.tabs.length - 1, 
                tabs: this.state.tabs
            },
            () => { 
                if(this.props.onSelectedChanged)
                    this.props.onSelectedChanged(this.state.selected, tab.tab_id);
            });
    }

    handleTabClick(index, id, event) {
        let tab_id = id;

        event.preventDefault();
        this.setState({
          selected: index
        }, () => { 
            if(this.props.onSelectedChanged)
                this.props.onSelectedChanged(this.state.selected, tab_id);
        });        
    }

    handleTabCloseClick(index, id, event) { 
        event.preventDefault();

        if(this.state.tabs[index].tab_id == id) {
            this.props.onCloseTab(id);
            
            let tab = this.state.tabs[index];
            let sel = 0;
            let tid = tab.tab_id;

            this.state.tabs.splice(index, 1);
            let selectedChanged = this.onSelectedChanged;

            this.setState({
                selected: 0,
                tabs: this.state.tabs
            }, () => { 
                if(selectedChanged)
                    selectedChanged(sel, tid);
            });
        }
    }

    _renderTitles() {
        return (
          <ul className="tabs_labels">  
            <li className="tabs_add_tab">
                <a href="#" onClick={this.appendTab.bind(this, "New Tab " + this.props.children.length)}>+</a>
            </li>         
            {React.Children.map(this.props.children, (child, i) => 
                <li className={'tabs_labels_item ' + ((i == this.state.selected) ? 'content_active' : 'content_inactive')} key={i}>
                    <div>
                        <a href="#" 
                            className={`tabs_labels_item_name ` + ((i == this.state.selected) ? 'active' : '')}
                            onClick={this.handleTabClick.bind(this, i, child.props.assigned_tab_id)}>
                            {child.props.assigned_tab_id}
                        </a>
                        <a href="#" className="tabs_labels_item_close" onClick={this.handleTabCloseClick.bind(this, i, child.props.assigned_tab_id)}>
                            X
                        </a>
                    </div>
                </li>
            )}
            
          </ul>
        );
    }

    _renderContent() { 
        console.log(this.props.children);
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
        console.log("Rendering tabs");
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
    max_tabs: React.PropTypes.number.isRequired,
    onSelectedChanged: React.PropTypes.func,
    onCreateTab: React.PropTypes.func.isRequired,
    onCloseTab: React.PropTypes.func.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
    ]).isRequired
};

TabEditorComponent.defaultProps = {
    selected: 0,
    max_tabs: 10,
    onSelectedChanged: null,
    onCreateTab: null,
    onCloseTab: null,
    children: []
};