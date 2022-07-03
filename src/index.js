function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 
  let weekDay = weekDays[date.getDay()];
  return `${weekDay}, ${hours}:${minutes}`;
 
}

function formatDay(timestamp){
let date=new Date(timestamp*1000);
let day=date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayDayForecast(response){
 let forecast = response.data.daily;
  
  let dayForecastElement=document.querySelector("#day-forecast");
  let dayForecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 5) {
      dayForecastHTML =
      dayForecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date"> ${formatDay(forecastDay.dt) }</div>
               
                <div>
             <img
                  src=" http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
              id="icon"
                width="36"
                            />
             <br>
                          </div>
                <div class="weather-forecast-temperature"> 
                  <span class="weather-forecast-temperature-day">
                    ${Math.round(forecastDay.temp.max)}°
                  </span>  
                  <span class="weather-forecast-temperature-night">
                  ${Math.round(forecastDay.temp.min)}°
                  </span>
                  
                </div>
              </div>
           
  `
    }
   ;
  });

  dayForecastHTML = dayForecastHTML + `</div>`;
  dayForecastElement.innerHTML = dayForecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d08b5ff65675f4663f3c5d9f116c9748";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayDayForecast);


}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weekDayElement = document.querySelector("#weekday");
  let actualDateElement=document.querySelector("#actualDate");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  weekDayElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(cityName) {
  let apiKey = "d08b5ff65675f4663f3c5d9f116c9748";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
  
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}


function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");

