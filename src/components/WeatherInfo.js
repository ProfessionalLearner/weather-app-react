import React from "react";
import {connect} from 'react-redux';
import '../styles/WeatherInfo.css'
import iconTemp from '../img/icon-thermometer.png'
import iconHumidity from '../img/icon-humidity.png'
import iconPressure from '../img/icon-pressure.png'
import iconWind from '../img/icon-wind.png'
import clearSky from '../img/clear-sky.jpg'
import rain from '../img/rain.jpg'
import drizzle from '../img/drizzle.jpg'
import mist from '../img/mist.jpg'
import snow from '../img/snow.jpg'
import thunderstorm from '../img/thunderstorm.jpg'
import clouds from '../img/clouds.jpg'

function WeatherInfo(props) {
    function getWindUnits(units) {
        if(units === 'metric') {
            return 'm/s'
        } else if(units === 'imperial') {
            return 'mph'
        }
    }
    function getIconURL(icon) {
        return "http://openweathermap.org/img/wn/" + icon + ".png"
    }

    function changeBackground(id) {
        if(300 > id && id >= 200) {
        document.body.style.backgroundImage = `url(${thunderstorm})`
        } else if (400 > id && id >= 300) {
        document.body.style.backgroundImage = `url(${drizzle})` 
        } else if (600 > id && id >= 500) {
        document.body.style.backgroundImage = `url(${rain})`              
        } else if (700 > id && id >= 600) {
        document.body.style.backgroundImage = `url(${snow})`               
        } else if (800 > id && id >= 700) {
        document.body.style.backgroundImage = `url(${mist})`    
        } else if (id === 800) {
        document.body.style.backgroundImage = `url(${clearSky})`   
        } else if (id > 800) {
        document.body.style.backgroundImage = `url(${clouds})`   
        }
    }


    function checkError(error, weather) {
        if(error) {
            return (
            <div className='col-8 mx-auto weather-info' align='center'>
                <div className='text-center display-4'>
                    {error}
                </div>
            </div>
            );

        } else {
            if(weather) {
                changeBackground(weather.id)
                return (
                    <div className='col-8 mx-auto weather-info' align='center'>
                        <div className='weather-head'>
                            <h1 id='location' className='text-center'>{weather.city}, {weather.country}</h1>
                            <div className='row'>
                                <div id='conditions' className='col-6 text-center'>
                                    <img id='weather-icon' alt='weather icon'
                                    src={getIconURL(weather.icon)}
                                    />
                                    <p><h2>{weather.conditions}</h2></p>
                                </div>
                                <div id='temperature' className='col-6 text-center display-3'>
                                    <span>{weather.temperature} &deg;  </span><img id='temperature-icon' alt='temperature icon'
                                    src={iconTemp}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='weather-body'>
                            <div className='row'>
                                <div className='col-4 text-center'>
                                <img id='wind-icon' alt='wind icon'
                                    src={iconWind}/>
                                    Wind Speed
                                </div>
                                <div className='col-4 text-center'>
                                <img id='humidity-icon' alt='humidity icon'
                                    src={iconHumidity}/>
                                    Humidity
                                </div>
                                <div className='col-4 text-center'>
                                <img id='pressure-icon' alt='pressure icon'
                                    src={iconPressure}/>
                                    Pressure
                                </div>
                            </div>

                            <div className='row weather-data'> 
                                <div className='col-4 text-center'>
                                    {weather.wind} {getWindUnits(weather.units)}
                                </div>
                                <div className='col-4 text-center'>
                                    {weather.humidity} %
                                </div>
                                <div className='col-4 text-center'>
                                    {weather.pressure} hPA
                                </div>
                            </div>
                        </div>

                    </div>

                    ); 
            } else {
                return (
                    <div className='col-8 mx-auto weather-info' align='center'>
                        <div className='display-4 text-center'>
                            Enter a city and a country.
                        </div>
                    </div>
                );
            }
        }
    }

    return (
        <React.StrictMode>
            <div className='container'>
                <div className='row'>
                {checkError(props.error, props.weather)}
                </div>
            </div> 
        </React.StrictMode>
    )
}


function mapStateToProps(state) {
    return {
        units: state.units,
        weather: state.weatherData,
        error: state.error
    }
}

export default connect(mapStateToProps)(WeatherInfo)