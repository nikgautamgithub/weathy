import './App.css';
import wther from './weather';
import React from 'react';
import forofor from './assets/404.png';
import { SlLocationPin } from "react-icons/sl";
import { WiStrongWind } from "react-icons/wi";
import { SlMagnifier } from "react-icons/sl";
import { WiDust } from "react-icons/wi";


function App() {
  return (
  <>
    <div className="body">
      <div className="App">
        <div className="search-bar">
          <p className="Locate-icon"><SlLocationPin/></p>
          <input className="getcity-input" type="text" placeholder='Enter your location'/>
          <button onClick={wther} className="Find-icon"><SlMagnifier/></button>
        </div>
        
        <div className="not-found">
          <img src={forofor} alt="" />
          <p>Oops! Try Another Location :/</p>
        </div>

        <div className="weather-cont">
          <img src="" alt="..." className="clear-sky romtamte"/>
          <p className='Temp'></p>
          <p className='Des'></p>
        </div>

        <div className="weather-details">

          <div className="humidity">
            <p className="humidity-icon"><WiDust/></p>
            <div className="h-details">
              <span></span>
              <p>Humidity</p>
            </div>
          </div>

          <div className="wind">
            <p className="wind-icon"><WiStrongWind/></p>
            <div className="w-details">
              <span></span>
              <p>Wind Speed</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  );
}

export default App;
