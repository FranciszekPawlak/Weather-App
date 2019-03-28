import React from "react";
const Weather = props => {
  console.log(props.data);
  const { humidity, pressure, temp } = props.data.main;
  const sunrise = new Date(props.data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(props.data.sys.sunset * 1000).toLocaleTimeString();
  const icon = props.data.weather[0].id;
  return (
    <div>
      <h4>
        Weather in {props.city} {props.data.sys.country}
      </h4>
      <i className={`wi wi-owm-${icon}`} />
      <h4>Temperatura: {temp} &#8451;</h4>
      <h4>Wiatr: {props.data.wind.speed} m/s</h4>
      <h4>Wilgotność: {humidity} %</h4>
      <h4>Ciśnienie: {pressure} hPa</h4>
      <h4>Wschód słońca: {sunrise}</h4>
      <h4>Zachód słońca: {sunset}</h4>
    </div>
  );
};

export default Weather;
