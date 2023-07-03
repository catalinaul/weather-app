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

function displayTemp(response) {
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = response.data.name;
  let temp = document.querySelector(".current-temp");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let minMax = document.querySelector(".minMax");
  minMax.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°c | ${Math.round(response.data.main.temp_max)}°c`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
}

function search(event) {
  event.preventDefault();
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let cityBtn = document.querySelector("#search-btn");
cityBtn.addEventListener("click", search);

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
