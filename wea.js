// Function to fetch weather data from OpenWeather API
async function getWeather(city, apiKey) {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const weatherData = await weatherResponse.json();
    return weatherData;
}

// Function to display weather data on the webpage
function displayWeather(data) {
    if (data.cod === "404") {
        alert("City not found. Please try again.");
        return;
    }

    // Update weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Update temperature, city name, and country
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} km/h`;

    // Update sunrise and sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunrise').textContent = sunriseTime;
    document.getElementById('sunset').textContent = sunsetTime;
}

// Event listener for the search button click
document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = "12dbccf45f15ac06cc698a6c14118549"; // Replace with your actual OpenWeather API key
    
    if (city) {
        document.getElementById('spinner').style.display = "block"; // Show spinner while loading
        const weatherData = await getWeather(city, apiKey);
        displayWeather(weatherData);
        document.getElementById('spinner').style.display = "none"; // Hide spinner after data is loaded
    } else {
        alert("Please enter a city name.");
    }
});

// Optional: Event listener for the "Enter" key in the input field
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});
