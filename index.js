const form = document.querySelector("form");
const button = document.querySelector("button");
const cityValue = document.querySelector("#city");
const temperature = document.querySelector(".temperatureContainer");
const locationName = document.querySelector(".locationContainer");
const weatherType = document.querySelector(".weatherContainer");

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
    const wind = weatherData.wind.speed;
    const name = weatherData.name;
    const weather = weatherData.weather[0].main;
    const dtTime = new Date();

    const object = new weatherObject(temp, wind, name, weather);
    array.splice(0, array.length);
    array.push(object);

    console.log(object);
    render();
  } catch (error) {
    console.log(error);
  }
}

function weatherObject(temp, wind, name, weather) {
  this.temp = temp;
  this.wind = wind;
  this.name = name;
  this.weather = weather;
}

function render() {
  array.forEach((object) => {
    temperature.textContent = object.temp;
    locationName.textContent = object.name;
    weatherType.textContent = object.weather;
  });
}
