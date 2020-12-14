const url = "https://api.openweathermap.org/data/2.5/weather?";
const appid = "33764f1ab797bd11d6dea580584249e7";
const currentAndForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?"

async function makeHttpRequest(url){
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

const API = {
  GetCurrentWeather: (city, callback) => {
    var url = `${url}q=${city}&appid=${appid}&units=metric`
    makeHttpRequest(url).then((json) => {
      callback(json);
    });
  },
  GetWeatherForecast: (lat, lon, callback) => {
    var url = `${currentAndForecastUrl}lat=${lat}&lon=${lon}&exclude=hourly&appid=${appid}`
    makeHttpRequest(url).then((json) => {
      callback(json);
    });
  },
}

export default API;
