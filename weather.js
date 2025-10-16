const apiKey = "8b3d46e880aac7a2f9521a905984135b"; // 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMsg = document.getElementById("error-message");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      showError("City not found. Try again!");
      return;
    }

    displayWeather(data);
  } catch (error) {
    showError("Network error. Try again later.");
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("city-name");
  const icon = document.getElementById("weather-icon");
  const description = document.getElementById("description");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.textContent = data.weather[0].description;
  temperature.textContent = Math.round(data.main.temp);
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;

  errorMsg.classList.add("hidden");
  weatherInfo.classList.remove("hidden");
}

function showError(message) {
  weatherInfo.classList.add("hidden");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}
