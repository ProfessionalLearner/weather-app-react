const API_KEY = ''; // Your api key goes here

const initialState = {
  apiKey: API_KEY,
  units: 'metric',
  weatherData: undefined,
  error: ''
};

export function reducer(state = initialState, action) {
    switch(action.type) {
      case 'CHANGE_UNITS':
        return {...state,
          units: action.payload}
      case 'LOAD_WEATHER':
          return {...state,
            weatherData: action.payload,
            error: action.error
          }
      default:
        return state;
    }
  }


  