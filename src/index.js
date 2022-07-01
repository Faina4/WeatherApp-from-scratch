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
function displayDayForecast(){
  let dayForecastElement=document.querySelector("#day-forecast");

let dayForecastHTML=`<div class="row">`;
let days=["Sun", "Mon", "Tue", "Wed","Thu","Fri","Sat"]
days.forEach(function(day){
  dayForecastHTML= dayForecastHTML +`
              <div class="col-2">
                <div class="weather-forecast-date"> ${day}</div>
                <div>
             <img
                  src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt=""
              id="icon"
                width="36"
                            />
             <br>
                          </div>
                <div class="weather-forecast-temperature"> 
                  <span class="weather-forecast-temperature-day">
                    18°
                  </span>  
                  <span class="weather-forecast-temperature-night">
                    12°
                  </span>
                  
                </div>
              </div>
           
  `})

  
dayForecastHTML=dayForecastHTML+`</div>`;
dayForecastElement.innerHTML=dayForecastHTML;
}


function displayTemperature(response) {
  console.log(response.data.main);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let weekDayElement = document.querySelector("#weekday");
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
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
displayDayForecast();
