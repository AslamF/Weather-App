const form = document.querySelector("form");
const button = document.querySelector("button");
const cityValue = document.querySelector("#city");

form.addEventListener("submit", () => {
  event.preventDefault();
  fetchAPI();
});

function fetchAPI() {
  let inputValue = cityValue.value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue +
      "&units=imperial&appid=b98c623e9d5f8d81b7ec45e5228c80b8"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.main.temp_max);
      console.log(response.main.temp);
      console.log(response.main.temp_min);
      console.log(response.name);
      console.log(response.wind.speed);
    });
}
