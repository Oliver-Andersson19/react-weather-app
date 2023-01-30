const apiKey = "98c9d96c371db16039d3ee409fc1b3d1";

function getLocation(city, callback) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`).then((respone) => respone.json());
}

function getWeather(location, callback) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`).then((respone) => respone.json());
}


export function fetchWeatherData(city, callback) {

    if(city === "") return;

    let weatherData = {};

    getLocation(city).then( (data) => {

        weatherData.lat = data[0].lat;
        weatherData.lon = data[0].lon;

        return getWeather(weatherData);
    
    }).then((data) => {

        console.log(data)

        weatherData.location = data.name;
        weatherData.degrees = Math.round(data.main.temp);
        weatherData.feelslike = data.main.feels_like;
        weatherData.wind = data.wind.speed;
        weatherData.icon = data.weather[0].icon;
        weatherData.weather = data.weather[0].main;
        weatherData.timezone = data.timezone;

        callback(weatherData);
    })
}