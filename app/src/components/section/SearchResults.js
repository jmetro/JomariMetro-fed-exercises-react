import React from 'react';
import ResultItem from './resultItem/ResultItem';

const SearchResults = (props) => {
    const resultsList = props.results.map((res, i, arr)=>{
        return (
            <div className="result-item" key={res.launch_date_local}>
                <ResultItem {...res} />
                {i === arr.length-1 ? null: <hr />}
            </div>
        )
    });
    
    return (
        <div className="clearfix results-container">
            <h5 className="text-center">Showing {props.results.length} Missions</h5>
            {resultsList}
        </div>
    )
};

export default SearchResults;