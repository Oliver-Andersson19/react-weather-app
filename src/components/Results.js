import React from 'react'
import '../results.css';

function Results(props) {
  return (
    <div className="results">

        <span className="degrees">{props.weatherData.degrees}°</span>

        <div className="location-container">
          <span className="location">{props.weatherData.location}</span>
          <span className="time">{props.weatherData.time}</span>
        </div>

        <div className="weather-container">
          <img src={`http://openweathermap.org/img/wn/${props.weatherData.icon}.png`} alt="weather status"></img>
          <span className="weather">{props.weatherData.weather}</span>
        </div>
      </div>
  )
}

export default Results