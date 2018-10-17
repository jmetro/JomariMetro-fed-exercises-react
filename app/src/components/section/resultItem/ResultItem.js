import React from 'react';

const ResultItem = (props) =>{
    const payloadIdFormatted = props.payloads.map(p=>p.payload_id).join(', ');
    const flightStatus = !props.land_success || !props.launch_success ? (<span className="text-failed">- Failed Mission</span>) : null;
    
    const launchDate = new Date(props.launch_date_local).toDateString();
    const launchTime = new Date(props.launch_date_local).toLocaleTimeString();
    const tagLabels = {
        reddit_campaign: 'Reddit Campaign',
        reddit_launch: 'Reddit Launch',
        reddit_media: 'Reddit Media',
        reddit_recovery: 'Reddit Recovery',
        article_link: 'Article',
        press_link: 'Press',
        video_link: 'Watch Video'
    }
    const tags = [];
    for(let key in props.links){
        if(props.links[key] && tagLabels[key]){
            tags.push({
                label: tagLabels[key],
                url: props.links[key],
                id: key
            })
        }
    }
    const tagList = tags.map(tag=>{
        return (
            <a className="tag" href={tag.url} target="_blank" key={tag.id}>
                {tag.label}
            </a>
        );
    });
    return (
        <div className="clearfix result-item">
            <div className="col-2 col-mb-15 col-tb-15 text-center">
                <img src={props.links.mission_patch} alt={props.rocket.rocket_name} className="launch-patch" />
            </div>
            <div className="col-mb-15 flight-number text-center pull-right">
                <div className="number">
                #{props.flight_number}
                </div>
                <div className="sub">
                    Flight Number
                </div>
            </div>
            <div className="col-10 col-mb-15">
                <h4>{props.rocket.rocket_name} - {payloadIdFormatted} {flightStatus}</h4>
                <p>Launched on <b>{launchDate}</b> at <b>{launchTime}</b> from <b>{props.launch_site.full_name || props.launch_site.site_name}</b></p>
                {tagList}
            </div>
        </div>
    )
}

export default ResultItem;