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
  let minMax = document.querySelector(".minMax");
  let cityDisplay = document.querySelector("#city");
  let temp = document.querySelector(".current-temp");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconCode = response.data.weather[0].icon;
  let iconImg = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  cityDisplay.innerHTML = response.data.name;
  temp.innerHTML = `${Math.round(celsiusTemp)}`;
  minMax.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°c | ${Math.round(response.data.main.temp_max)}°c`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
   
  iconImg.setAttribute("src", `/images/${iconCode}.svg`);
  iconImg.setAttribute("alt", response.data.weather[0].description);

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
  fahrenheitBtn.classList.add("inactive-btn")
}

let celsiusTemp = null;

let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
fahrenheitBtn.addEventListener("click", convertF)

let celsiusBtn = document.querySelector("#celsius-btn");
celsiusBtn.addEventListener("click", convertC)

cityBtn.addEventListener("click", search);