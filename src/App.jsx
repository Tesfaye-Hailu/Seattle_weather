import { useState, useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom'

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/weather'); // Make a request to the server
        const data = await response.json(); // Parse the response as JSON
        setWeather(data); // Update the weather state with the fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>The below is Seattle, WA, Weather Information</h1>

      {weather && (
        <ul>
          <li>Date: {new Date().toDateString()}</li>
          <li>Time: {new Date().toLocaleTimeString()}</li>
          <li>Weather:</li>
          <ul>
            <li>Celsius: {weather.temperature.celsius}°C</li>
            <li>Fahrenheit: {weather.temperature.fahrenheit}°F</li>
          </ul>
          <li>Rainfall: {weather.rainfall} mm</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Pressure: {weather.pressure} hPa</li>
          <li>Visibility: {weather.visibility} meters</li>
          <li>Sunset Time: {new Date(weather.sunsetTime).toString()}</li>
        </ul>
      )}
    </div>
  );
}

export default App;