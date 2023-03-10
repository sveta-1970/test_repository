//display the current date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formatted_date = `${day}, ${hours}:${minutes}`;
  return formatted_date;
}

let now = formatDate(new Date());
let currentDate = document.querySelector("p.day");
currentDate.innerHTML = now;

//search engine, when searching for a city,
//display the city name on the page after the user submits the form
//and the current temperature of the city.
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".weather").innerHTML = response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "52b789a53d83895c9bd9e318a67b4fa8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    searchCity(city);
  } else {
    alert("Please enter a city");
  }
}

function searchLocation(position) {
  let apiKey = "52b789a53d83895c9bd9e318a67b4fa8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTime = new Date();
document.querySelector("p.day").innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");

let currentPositionButton = document.querySelector(".button-current");
currentPositionButton.addEventListener("click", getCurrentPosition);

/*

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

//Celsius to Farenheit

function convertCelsiusToFarenheit(event) {
  event.preventDefault();
  let mainTemperatureElement = document.querySelector("#main-temperature");
  let temperature = mainTemperatureElement.innerHTML; //это string, нужно перевести в number
  temperature=Number(temperature);
  let farenheitTemperature = Math.round(temperature * 1.8 + 32);
  mainTemperatureElement.innerHTML = farenheitTemperature;
  return;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertCelsiusToFarenheit);

//Farenheit to Celsius

function convertFarenheitToCelsius(event) {
  event.preventDefault();
  let mainTemperatureElement = document.querySelector("#main-temperature");
  let temperature = mainTemperatureElement.innerHTML; //это string, нужно перевести в number
  temperature=Number(temperature);
  let celsiusTemperature = Math.round(((temperature - 32) * 5) / 9);
  mainTemperatureElement.innerHTML = celsiusTemperature;
  return;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertFarenheitToCelsius);

*/
