

let dateTime = new Date();

let docDate = document.querySelector("#date");

let hours = dateTime.getHours();
let minutes = String(dateTime.getMinutes()).padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[dateTime.getDay()];

docDate.innerHTML = `${day} ${hours}:${minutes}`;

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
