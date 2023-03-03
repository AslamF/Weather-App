const form = document.querySelector("form");
const button = document.querySelector("button");
const cityValue = document.querySelector("#city");
const temperature = document.querySelector(".temperatureContainer");
const locationName = document.querySelector(".locationContainer");
const weatherType = document.querySelector(".weatherContainer");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const pressure = document.querySelector(".pressure");

const array = [];

form.addEventListener("submit", () => {
  event.preventDefault();
  fetchAPI();
});

async function fetchAPI() {
  let inputValue = cityValue.value;
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        inputValue +
        "&units=imperial&appid=b98c623e9d5f8d81b7ec45e5228c80b8"
    );
    const weatherData = await response.json();
    console.log(weatherData);

    const temp = weatherData.main.temp;
    const name = weatherData.name;
    const weather = weatherData.weather[0].main;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const visibility = weatherData.visibility / 1000;
    const pressure = weatherData.main.pressure;
    const object = new weatherObject(
      temp,
      name,
      weather,
      wind,
      humidity,
      visibility,
      pressure
    );
    array.splice(0, array.length);
    array.push(object);

    console.log(object);
    render();
  } catch (error) {
    console.log(error);
  }
}

function weatherObject(
  temp,
  name,
  weather,
  wind,
  humidity,
  visibility,
  pressure
) {
  this.temp = temp;
  this.name = name;
  this.weather = weather;
  this.wind = wind;
  this.humidity = humidity;
  this.visibility = visibility;
  this.pressure = pressure;
}

function render() {
  array.forEach((object) => {
    temperature.textContent = object.temp;
    locationName.textContent = object.name;
    weatherType.textContent = object.weather;
    wind.textContent = object.wind + "m/s";
    humidity.textContent = object.humidity + "%";
    visibility.textContent = object.visibility + "km";
    pressure.textContent = object.pressure + "hPa";
  });
}
