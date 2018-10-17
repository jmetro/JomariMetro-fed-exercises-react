import React from 'react';

export default (props) => {
    const options = props.options.map((opt, i)=>{
        return (<option value={opt.value} checked={i===0} key={`${props.id}-${i}`}>{opt.label}</option>)
    });
    return (
        <select id={props.id} name={props.name} onChange={props.onChange} key={props.key}>
            {options}
        </select>
    );
}