import React from "react";
const Weather = props => {
  return (
    <div>
      <h4>
        Weather in {props.city} {props.data.country}
      </h4>
      <i className={`wi wi-owm-${props.data.icon}`} />
      <h4>Temperatura: {props.data.temp} &#8451;</h4>
      <h4>Wiatr: {props.data.wind} m/s</h4>
      <h4>Wilgotność: {props.data.humidity} %</h4>
      <h4>Ciśnienie: {props.data.pressure} hPa</h4>
      <h4>Wschód słońca: {props.data.sunrise}</h4>
      <h4>Zachód słońca: {props.data.sunset}</h4>
    </div>
  );
};

export default Weather;
