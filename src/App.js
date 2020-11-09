import React from 'react';
import AppTitle from './components/AppTitle';
import InputForm from './components/InputForm';
import WeatherInfo from './components/WeatherInfo';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {connect} from 'react-redux';

function App() {

  return (
    <div className="App">
      <AppTitle/>
      <InputForm/>
      <WeatherInfo/>
      <footer>
      <div className='acknowledgment'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </footer>
    </div>
  );
}

export default connect()(App);
