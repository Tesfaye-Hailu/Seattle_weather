const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/weather', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');

    // Fetch the weather data from an API
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=e5b5692b22c6f275270a05592a558059');
    const data = await response.json();

    // Extract the weather data
    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;
    const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
    const rainfall = data.rain ? (data.rain['1h'] || data.rain['3h']) : 0;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility;
    const sunsetTime = new Date(data.sys.sunset * 1000);
    const uvIndex = data.uvi;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    // Generate the response as an unordered list
    const responseHtml = `
      <ul>
        <li>Date: ${formattedDate}</li>
        <li>Time: ${formattedTime}</li>
        <li>Weather:
          <ul>
            <li>Celsius: ${temperatureCelsius.toFixed(2)}°C</li>
            <li>Fahrenheit: ${temperatureFahrenheit.toFixed(2)}°F</li>
          </ul>
        </li>
        <li>Rainfall: ${rainfall} mm</li>
        <li>Humidity: ${humidity}%</li>
        <li>Pressure: ${pressure} hPa</li>
        <li>Visibility: ${visibility} meters</li>
        <li>Sunset Time: ${sunsetTime}</li>
      </ul>
    `;

    res.send(responseHtml);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});