import {createStore} from 'redux';
import {reducer} from './reducers/WeatherReducer'

const store = createStore(
    reducer
  );

export default store;