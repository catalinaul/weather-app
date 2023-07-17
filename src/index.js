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
 let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
 let day = days[date.getDay()];
 return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {

  let date = new Date(timestamp * 1000);
    let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Mon",
  ];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay , index) {
    if (index < 5) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
                <div class="week-day">${formatDay(forecastDay.time * 1000)}</div>
                <img src="/images/${forecastDay.condition.icon}.svg" alt="">
                <div class="week-temp">
                    <span class="min">${Math.round(forecastDay.temperature.minimum)}°</span> <span class="max"><strong>${Math.round(forecastDay.temperature.maximum)}°</strong></span>
                </div>
            </div>
  `;
  }
});

  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates)
  let apiKey = "b234ft44ac33162fe6fb033o240936aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}
`
axios.get(apiUrl).then(displayForecast);

}

function displayTemp(response) {
  let cityDisplay = document.querySelector("#city");
  let temp = document.querySelector(".current-temp");
  let minMax = document.querySelector(".minMax");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconCode = response.data.weather[0].icon;
  let iconImg = document.querySelector("#icon");
  let minTemp = response.data.main.temp_min;
  let maxTemp = response.data.main.temp_max;

  celsiusTemp = response.data.main.temp;

  cityDisplay.innerHTML = response.data.name;
  temp.innerHTML = `${Math.round(celsiusTemp)}`;
  minMax.innerHTML = `${Math.round(
    minTemp
  )}° <strong>${Math.round(maxTemp)}</strong>°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  windPerc.innerHTML = `${Math.round(response.data.wind.speed * 3.6)}`;
  iconImg.setAttribute("src", `/images/${iconCode}.svg`);
  iconImg.setAttribute("alt", response.data.weather[0].description);
  
  getForecast(response.data.coord);
}


function search(event) {
  event.preventDefault();
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let cityBtn = document.querySelector("#search-btn");


function searchLocation(position) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temp = document.querySelector(".current-temp");
  temp.innerHTML = Math.round(fahrenheitTemp);
  let tempInd = document.querySelector("#temp-indicator");
  tempInd.innerHTML = "°F"
  celsiusBtn.classList.remove("active-btn")
  celsiusBtn.classList.add("inactive-btn")
  fahrenheitBtn.classList.remove("inactive-btn")
  fahrenheitBtn.classList.add("active-btn")
}

function convertC(event) {
  event.preventDefault();
  let temp = document.querySelector(".current-temp");
  temp.innerHTML = Math.round(celsiusTemp);
  let tempInd = document.querySelector("#temp-indicator");
  tempInd.innerHTML = "°C"
  celsiusBtn.classList.remove("inactive-btn")
  celsiusBtn.classList.add("active-btn")
  fahrenheitBtn.classList.add("active-btn")
}

let celsiusTemp = null;
let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let celsiusBtn = document.querySelector("#celsius-btn");

fahrenheitBtn.addEventListener("click", convertF)
celsiusBtn.addEventListener("click", convertC)
cityBtn.addEventListener("click", search);