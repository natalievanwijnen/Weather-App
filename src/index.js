//api
let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
let apiUrl = `https://api.shecodes.io/weather/v1/current?key=${apiKey}`;
let units = "metric";

//elements
let searchForm = document.querySelector("#search-form");
let searchInputElement = document.querySelector("#search-input");
let temperatureElement = document.getElementById("temperature");
let cityElement = document.querySelector("#current-city");
let currentTimeElement = document.querySelector(".current-time");
let currentDateElement = document.getElementById("current-date");

//event listeners
searchForm.addEventListener("submit", search);

//functions
function search(event) {
  event.preventDefault();
  let searchedCity = searchInputElement.value.trim();
  let searchApiUrl = `${apiUrl}&query=${searchedCity}`;

  axios
    .get(searchApiUrl)
    .then(displayTemp)
    .finally(() => (searchInputElement.value = ""));
}

function displayTemp(response) {
  cityElement.innerHTML = response.data.city;

  if (response?.data?.temperature?.current) {
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = `${temperature}`;
  } else {
    alert("Please enter a valid city name.");
  }
}

function updateClock() {
  let now = new Date();
  let time =
    now.getHours() +
    ":" +
    (now.getMinutes() < 10 ? "0" : "") +
    now.getMinutes();
  currentTimeElement.innerHTML = time;
}

function updateDate() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[now.getDay()];
  currentDateElement.innerHTML = weekday;
}

// interval
updateDate();
setInterval(updateClock, 1000);
setInterval(updateDate, 24 * 60 * 60 * 1000);
