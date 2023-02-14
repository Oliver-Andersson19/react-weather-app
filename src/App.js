import { useState } from "react";
import Results from "./components/Results";
import { fetchWeatherData } from "./components/weatherFetch";

function App() {

  const [backgroundImage, setBackgroundImage] = useState("imgs/cloudy-bg.jpg");
  const [locationValue, setLocationValue] = useState();
  const [weatherData, setWeatherData] = useState(null);

  const [fade, setFade] = useState(false);

  const handleChange = (event) => {
    setLocationValue(event.target.value)
  }

  function renderWeatherData(data) {
    // Hämta lokal tid i sekunder
    let time = Math.floor(Date.now() / 1000)

    // Ändra till rätt tidszon
    time += data.timezone;
    // Konvertera till rätt format
    time = new Date(time * 1000).toISOString().slice(11, 19)
    
    data.time = time;

    setWeatherData(data)
    // Fade in
    setFade(1)
    setCorrectBackground(data.weather)
  }

  function setCorrectBackground(data) {
    console.log(data);
    if (data === "Snow") {
      setBackgroundImage("imgs/snow-bg.jpg")
    } else if (data === "Clouds") {
      setBackgroundImage("imgs/cloudy-bg.jpg")
    } else if (data === "Fog") {
      setBackgroundImage("imgs/fog-bg.jpg")
    } else {
      setBackgroundImage("imgs/sunny-bg.jpg")
    }
  }


  return (
    <div className="page-wrapper" style={{backgroundImage: 'url(' + backgroundImage + ')'}} fadeIn={fade}>

      <div className="side-wrapper">

        <header>
          <input type="text" placeholder="City..." className="location-input" onChange={handleChange}/>
          <button className="search-btn" onClick={() => fetchWeatherData(locationValue, renderWeatherData)}><i className="fa-solid fa-magnifying-glass"></i></button>
        </header>

        <ul className="sample-locations-list">
          <li className="sample-location" onClick={() => fetchWeatherData("New York", renderWeatherData)}>New York</li>
          <li className="sample-location" onClick={() => fetchWeatherData("Stockholm", renderWeatherData)}>Stockholm</li>
          <li className="sample-location" onClick={() => fetchWeatherData("Moscow", renderWeatherData)}>Moscow</li>
          <li className="sample-location" onClick={() => fetchWeatherData("Yakutsk", renderWeatherData)}>Yakutsk</li>
        </ul>

        <footer>
          <p>by Oliver Andersson</p>
          <p>Made with React and OpenWeatherApi</p>
        </footer>

      </div>

      { weatherData && <Results weatherData={weatherData} fadeIn={fade} setFade={setFade}></Results>}

    </div>
  );
}

export default App;

/*

<div className="results">

        <span className="degrees">{weatherData.degrees}°</span>

        <div className="location-container">
          <span className="location">{weatherData.location}</span>
          <span className="time">{weatherData.time}</span>
        </div>

        <div className="weather-container">
          <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="weather status"></img>
          <span className="weather">{weatherData.weather}</span>
        </div>
      </div>

*/