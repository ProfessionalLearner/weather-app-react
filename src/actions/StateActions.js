export function changeUnits(units) {
    return {
        type: 'CHANGE_UNITS',
        payload: units
    }
}

export function loadWeatherData(weatherData) {
    return {
        type: 'LOAD_WEATHER',
        payload: weatherData.weather,
        error: weatherData.error
    }
}
