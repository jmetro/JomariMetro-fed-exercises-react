import React, {Component} from 'react';
import Filter from './Filter';
import axios from 'axios';
import SearchResults from './SearchResults';
class LaunchPad extends Component {
    constructor(props){
        super(props);
        this.filterResultsHandler = this.filterResultsHandler.bind(this);
    }
    state = {
        yearOptions: [],
        launchPadOptions: [],
        results: [],
        initializing: true
    };

    componentDidMount() {
        axios.get('http://localhost:8001/launchpads').then(lpData=>{
            axios.get('http://localhost:8001/launches').then(data=>{
            const years = data.data.map(launchPad=>new Date(launchPad.launch_date_local).getFullYear());
            const sortedYears = years.sort((a,b)=>b-a);
            const filteredYears = sortedYears.filter((yr, i, arr)=>arr.indexOf(yr) === i);
            const processedData = [...data.data.map(item=>{
                return {
                    ...item,
                    launch_site: {
                        ...item.launch_site,
                        full_name: lpData.data.find(lpItem=>lpItem.id === item.launch_site.site_id).full_name
                    }
                }
            })]
            this.setState({
                yearOptions: filteredYears,
                launchPadOptions: [...lpData.data],
                results: [...processedData],
                origResults: [...processedData],
                initializing: false
            });
        }).catch(error=>{
            console.log(error);
        });
        }).catch(error=>{
            console.log(error);
        });
    }

    filterResultsHandler(payload) {
        const keywordResults = this.state.origResults.filter((res)=>{
            if(!payload.keyword.length){
                return true;
            }
            const resString = JSON.stringify(res).toLocaleLowerCase();
            return resString.indexOf(payload.keyword) >= 0;
        });
        const launchPadResults = keywordResults.filter((res)=>{
            if(!payload.launchPad || payload.launchPad === 'Any'){
                return true;
            }
            return res.launch_site.site_id === payload.launchPad;
        });
        const minYearResults = launchPadResults.filter((res)=>{
            if(!payload.minYear || payload.minYear === 'Any'){
                return true;
            }
            return +(new Date(res.launch_date_local).getFullYear()) >= +payload.minYear;
        });
        const maxYearResults = minYearResults.filter((res)=>{
            if(!payload.maxYear || payload.maxYear === 'Any'){
                return true;
            }
            return +(new Date(res.launch_date_local).getFullYear()) <= +payload.maxYear;
        });
        const filteredResults = maxYearResults;
        this.setState(state=>{
            return {
                ...state,
                results: filteredResults
            }
        });
    }
    render(){
        return (
            <section className="container" id="search-page">
                <div className="table-container">
                    <div className="table-filter">
                        <div className="clearfix">
                            <div className="col-15">
                            {this.state.initializing ? null : <Filter launchPadOptions={this.state.launchPadOptions} 
                            yearOptions={this.state.yearOptions} filterResults={this.filterResultsHandler} />}
                            </div>
                            <div className="col-15">
                                <SearchResults results={this.state.results} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default LaunchPad;