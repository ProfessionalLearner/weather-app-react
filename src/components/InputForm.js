import React from "react";
import {changeUnits} from '../actions/StateActions';
import {loadWeatherData} from '../actions/StateActions';
import '../styles/InputForm.css';
import {connect} from 'react-redux';

function InputForm(props) {

    const handleChange = (e) => {
        props.changeUnits(e.target.value);
    }

    
    const getWeatherData = async(e) => {
        e.preventDefault()
        const city = e.target.elements.city.value
        const country = e.target.elements.country.value
        const currUnits = props.units
        console.log(props.apiKey)
        console.log(city)
        try {
        if(!country) {
            throw TypeError
        }
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${props.apiKey}&units=${props.units}`);
        const data = await response.json();
        const weatherData = {weather: {
                                id: data.weather[0].id,
                                temperature: data.main.temp,
                                city: data.name,
                                country: data.sys.country,
                                humidity: data.main.humidity,
                                wind: data.wind.speed,
                                pressure: data.main.pressure,
                                conditions: data.weather[0].description,
                                units: currUnits,
                                icon: data.weather[0].icon,
                            }, 

                            error: ''

                            }
        props.loadWeather(weatherData)
        } catch (er) {
            const weatherData = {weather: {},
                                error: 'Sorry your input is invalid. Enter valid city and/or country.'
                            } 
            props.loadWeather(weatherData)
        }
    }
    return (
        <React.StrictMode>
            <div className='container'>
                <div className='row'>
                    <div className='weather-form mx-auto col-8'>
                            <form onSubmit={getWeatherData} className="form-inline">
                                <select id='dropdown' onChange={handleChange}>
                                    <option value="metric">&#8451;</option>
                                    <option value="imperial">&#8457;</option>
                                </select>
                                <div className="form-group">
                                    <input className='input-city' type='text' name='city' placeholder='City...'/>
                                </div>
                                <div className="form-group">    
                                    <input className='input-country' type='text' name='country' placeholder='Country...'/>   
                                </div>
                                <button className='weather-button'>Find Weather</button>
                            </form>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );


}


const mapDispatchToProps = (dispatch) => {
    return {
        loadWeather: (weatherData) => {
            dispatch(loadWeatherData(weatherData));
        },

        changeUnits: (units) => {
            dispatch(changeUnits(units))
        }
    }
};

const mapStateToProps = state => {
    return {
        units: state.units,
        apiKey: state.apiKey
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)