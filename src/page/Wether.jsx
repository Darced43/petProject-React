import React from "react";
import { MyInput } from '../components/UI/input/MyInput'
import axios from "axios";
import { useState } from "react";
import WeatherINfo from "../components/WeatherInfo";

export const Wether = () => {
    const [IcityEnter, setSityEnter] = useState('')
    const [IshowWeather, setIshowWeather] = useState('false')
    const [Iresponse, setResponse] = useState()

    async function getWeather () {
        try{
            const respons = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${IcityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`)
            console.log(respons.data.weather[0].icon)
            setIshowWeather(true)
            setResponse({name: respons.data.name, temp: respons.data.main.temp, weather: respons.data.weather[0].description, icon: respons.data.weather[0].icon})
        }
        catch{
            setIshowWeather(false)
            console.log('error')
        }
    }

    function selectCity(event){
        event.preventDefault()
        getWeather()
        console.log(IshowWeather)
    }
    
    return(
        <div style={{width:'100%', height:'100%', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <form action="" style={{marginTop: '10px', textAlign: 'center'}}>
                    <MyInput
                        type='text'
                        placeholder='выберите город'
                        value={IcityEnter}
                        onChange={e => setSityEnter(e.target.value)}
                    />
                    <button style={{marginTop: '10px'}} onClick={selectCity}>выбрать</button>
                </form>
                {IshowWeather === true?
                    <WeatherINfo Iresponse={Iresponse}/>
                    :
                    <p>город не выбран</p>
                }
            </div>
        </div>
    )
}
