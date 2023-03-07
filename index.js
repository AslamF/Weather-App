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
const cardContainer = document.querySelector(".cardContainer");
const icons = document.querySelectorAll("#icon");
const input = document.querySelector("input");

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
    input.classList.remove("invalid");

    if (object.weather === "Clear") {
      fetchClearGif();
      render();
    } else if (object.weather === "Clouds") {
      fetchCloudsGif();
      render();
    } else if (object.weather === "Rain") {
      fetchRainGif();
      render();
    } else if (object.weather === "Snow") {
      fetchSnowGif();
      render();
    } else if (object.weather === "Windy") {
      fetchWindyGif();
      render();
    }
  } catch (error) {
    console.log(error);
    input.classList.add("invalid");
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
    for (const icon of icons) {
      icon.style.display = "flex";
    }
    temperature.textContent = object.temp + "\u2109";
    locationName.textContent = object.name;
    weatherType.textContent = object.weather;
    wind.textContent = object.wind + "m/s";
    humidity.textContent = object.humidity + "%";
    visibility.textContent = object.visibility + "km";
    pressure.textContent = object.pressure + "hPa";
  });
}

async function fetchClearGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/xUPGcM9CazM9H5KrEA?api_key=fSKL3IDzANShrL2jm9W1qMMYoFR78Hrr"
    );
    const gifdata = await response.json();
    const clouds = gifdata.data.images.original.url;
    cardContainer.style.backgroundImage = "url(" + clouds + ")";
    console.log(gifdata);
  } catch {
    ("error");
  }
}

async function fetchRainGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/26BGD4XaoPO3zTz9K?api_key=fSKL3IDzANShrL2jm9W1qMMYoFR78Hrr"
    );
    const gifdata = await response.json();
    const rain = gifdata.data.images.original.url;
    cardContainer.style.backgroundImage = "url(" + rain + ")";
  } catch {
    ("error");
  }
}

async function fetchSnowGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/6Jgoyu5xFB5yE?api_key=fSKL3IDzANShrL2jm9W1qMMYoFR78Hrr"
    );
    const gifdata = await response.json();
    const snow = gifdata.data.images.original.url;
    cardContainer.style.backgroundImage = "url(" + snow + ")";
  } catch {
    ("error");
  }
}

async function fetchCloudsGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/3o6EhOYMhOTANYgHMk?api_key=fSKL3IDzANShrL2jm9W1qMMYoFR78Hrr"
    );
    const gifdata = await response.json();
    const clouds = gifdata.data.images.original.url;
    cardContainer.style.backgroundImage = "url(" + clouds + ")";
  } catch {
    ("error");
  }
}

async function fetchWindyGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/3ohfFxoiP6rbEZ4nrG?api_key=fSKL3IDzANShrL2jm9W1qMMYoFR78Hrr"
    );
    const gifdata = await response.json();
    const windy = gifdata.data.images.original.url;
    cardContainer.style.backgroundImage = "url(" + windy + ")";
  } catch {
    ("error");
  }
}
