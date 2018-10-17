import React, { Component } from 'react';

import TextInput from '../controls/TextInput';
import SelectInput from '../controls/SelectInput';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.inputChangehandler = this.inputChangehandler.bind(this);
        this.getSearchPayload = this.getSearchPayload.bind(this);
        this.showFiltersHandler = this.showFiltersHandler.bind(this);
    }
    state = {
        showFilters: false,
        filters: [
            {
                gridClass: 'col-3 col-tb-15',
                type: 'text',
                placeholder: 'eg Falcon',
                label: 'Keywords',
                value: '',
                id: 'keyword'
            },
            {
                gridClass: 'col-4 col-tb-15',
                type: 'select',
                label: 'Launch Pad',
                value: 'Any',
                id: 'launchPad',
                options: [{
                    value: null,
                    label: 'Any'
                }, ...this.props.launchPadOptions.map(opt=>{
                    return {value: opt.id,label: opt.full_name}
                })]
            },
            {
                gridClass: 'col-3 col-tb-15',
                type: 'select',
                label: 'Min Year',
                value: 'Any',
                id: 'minYear',
                options: [{
                    value: null,
                    label: 'Any'
                }, ...this.props.yearOptions.map(opt=>{
                    return {value: opt,label: opt}
                })]
            },
            {
                gridClass: 'col-3 col-tb-15',
                type: 'select',
                label: 'Max Year',
                value: 'Any',
                id: 'maxYear',
                options: [{
                    value: null,
                    label: 'Any'
                }, ...this.props.yearOptions.map(opt=>{
                    return {value: opt,label: opt}
                })]
            },
            {
                gridClass: 'col-2 col-tb-15',
                type: 'button',
                label: 'Apply',
                id: 'apply',
                onClick: ()=>{
                    const searchPayload = this.getSearchPayload();
                    this.props.filterResults(searchPayload);
                }
            }
        ]
    };
    
    getSearchPayload() {
        const payload = {};
        this.state.filters.forEach(filter=>{
            if(filter.id === 'keyword' || filter.id === 'launchPad' || filter.id === 'minYear' || filter.id === 'maxYear'){
                payload[filter.id] = filter.value || '';
            }
        });
        return payload;
    }
    
    inputChangehandler(e) {
        const index = this.state.filters.findIndex(filter=>filter.id === e.target.id);
        const newVal = e.target.value;
        this.setState((state)=>{
            const newFilterVals = [...state.filters];
            newFilterVals[index] = {
                ...newFilterVals[index],
                value: newVal
            }
            return {
                ...state,
                filters: newFilterVals
            }
        });
    }
    showFiltersHandler() {
        this.setState(state=>{
            return {
                showFilters: !state.showFilters
            }
        });
    }
    render() {
        const getInputByType = (filter)=>{
            if(filter.type === 'text'){
                return <TextInput placeholder={filter.placeholder} onChange={this.inputChangehandler} 
                value={filter.value} id={filter.id}/>
            }
            if(filter.type === 'select'){
                return <SelectInput placeholder={filter.placeholder} onChange={this.inputChangehandler} 
                value={filter.value} id={filter.id} options={filter.options} />
            }
            if(filter.type === 'button'){
                return <button onClick={()=>filter.onClick()} id={filter.id} type="button">{filter.label}</button>
            }
        }
        
        const inputs = this.state.filters.map(filter => {
            return (
                <div className={filter.gridClass} key={filter.id}>
                    <div className="control-container">
                        <label>{filter.type === 'button' ? (<span>&nbsp;</span>) : filter.label}</label>
                        {getInputByType(filter)}
                    </div>
                </div>
            )
        });
        const showFiltersBtn = (<div className="text-right">
            <a className="hide-pc show-tb pointer"
            onClick={this.showFiltersHandler}>{this.state.showFilters ? 'Hide' : 'Show'} filters</a>
        </div>)
        return (
            <div className="clearfix filter-container">
                {showFiltersBtn}
                <div className={this.state.showFilters ? '' : 'hide-tb'}>
                    {inputs}
                </div>
            </div>
        )
    }
}

export default Filter;