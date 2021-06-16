import React from "react";
import "../styles/Weather.css";
const Weather = ({
  city,
  data: { country, icon, temp, wind, humidity, pressure, sunrise, sunset },
}) => {
  return (
    <div className="weather">
      <h1>
        Weather in
        <span> {city}</span> {country}
      </h1>
      <p>{new Date().toLocaleString()}</p>
      <i className={`wi wi-owm-${icon} icon`} />
      <div className="values">
        <h2>
          <i className="fas fa-thermometer-half" /> {temp} &#8451;
        </h2>
        <h2>
          <i className="fas fa-wind" /> {wind} m/s
        </h2>
        <h2>
          <i className="fas fa-tint" /> {humidity} %
        </h2>
        <h2>
          <i className="fab fa-cloudscale" /> {pressure} hPa
        </h2>
        <h2>
          <i className="fas fa-sun" /> {sunrise}
        </h2>
        <h2>
          <i className="fas fa-moon" /> {sunset}
        </h2>
      </div>
    </div>
  );
};

export default Weather;
