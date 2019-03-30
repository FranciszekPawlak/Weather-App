import React from "react";
import "../styles/Weather.css";
const Weather = props => {
  return (
    <div className="weather">
      <h1>
        Weather in
        <span> {props.city}</span> {props.data.country}
      </h1>
      <p>{new Date().toLocaleString()}</p>
      <i className={`wi wi-owm-${props.data.icon} icon`} />
      <div className="values">
        <h2>
          <i className="fas fa-thermometer-half" /> {props.data.temp} &#8451;
        </h2>
        <h2>
          <i className="fas fa-wind" /> {props.data.wind} m/s
        </h2>
        <h2>
          <i className="fas fa-tint" /> {props.data.humidity} %
        </h2>
        <h2>
          <i className="fab fa-cloudscale" /> {props.data.pressure} hPa
        </h2>
        <h2>
          <i className="fas fa-sun" /> {props.data.sunrise}
        </h2>
        <h2>
          <i className="fas fa-moon" /> {props.data.sunset}
        </h2>
      </div>
    </div>
  );
};

export default Weather;
