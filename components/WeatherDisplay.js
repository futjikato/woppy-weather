import React, { useState, useEffect } from 'react';

const WeatherDisplay = ({ location = {} }) => {
  const [ weatherData, setWeatherData ] = useState();
  const [ errorMsg, setErrorMessage ] = useState();

  useEffect(() => {
    const loader = async () => {
      try {
        const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=imperial&appid=3a4f95aecab0c6c282417b38434a6c8c`);
        if (weatherResp.status >= 400) {
          console.error(weatherResp.statusText);
          setErrorMessage('Unable to load current weather data :(');
          return;
        }
        const weather = await weatherResp.json();
        setWeatherData(weather);
      } catch (e) {
        console.error(e);
        setErrorMessage('Unable to load current weather data :(');
        return;
      }
    }
    if (typeof location === 'object' && location.lat && location.lng) {
      loader();
    }
  }, [ location ])
  
  return (
    <div>
      {errorMsg !== '' && <p>{errorMsg}</p>}
      {typeof weatherData === 'object' && typeof weatherData.main === 'object' && (
        <dl>
          <dt>high</dt>
          <dd>{weatherData.main.temp_max}°F</dd>
          <dt>low</dt>
          <dd>{weatherData.main.temp_min}°F</dd>
          <dt>humidity</dt>
          <dd>{weatherData.main.humidity}%</dd>
        </dl>
      )}
      <style jsx>{`
        dt {
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default WeatherDisplay;