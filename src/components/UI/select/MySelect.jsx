import React from "react";

export const MySelect = ({option, defaultValue, value, onChange}) => {
    return(
        <select 
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value='' >{defaultValue}</option>
            {option.map( item => 
                <option key={item.value} value={item.value}>
                    {item.name}
                </option>
                )}
        </select>
    )
}