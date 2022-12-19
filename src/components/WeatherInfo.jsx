import React from "react";
import sun from '../image/sun.png'
import weeather from '../image/weather.png'

const WeatherINfo = ({Iresponse}) => {

    return(
        <div>
            <h2>{Iresponse.name}</h2>
            <div className='weather__info'>
                <span>Температура</span>
                <span>{Iresponse.temp}</span>
            </div>
            <div className='weather__info'>
                <span>Облачность</span>
                <span>{Iresponse.weather}</span>
            </div>
        </div>
    )
}

export default WeatherINfo