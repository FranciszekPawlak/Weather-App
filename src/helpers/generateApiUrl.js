import { config } from "../config";

export const highchartApiUrl = (city = "warsaw") =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${config.weatherApiKey}&units=metric`;
export const weatherApiUrl = (city = "warsaw") =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`;
