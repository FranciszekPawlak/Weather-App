import React, { Component } from "react";
import Highchart from "./components/Highchart";
import Weather from "./components/Weather";
import { highchartApiUrl, weatherApiUrl } from "./helpers/generateApiUrl";
import { fetcher } from "./helpers/fetcher";
import "./styles/App.css";

class App extends Component {
  state = {
    value: "",
    city: "",
    opacity: 0,
    dataHighchart: {
      hoursHighchart: [],
      tempHighchart: [],
    },
    dataWeather: {
      temp: "",
      wind: "",
      humidity: "",
      pressure: "",
      sunrise: "",
      sunset: "",
      icon: "",
      country: "",
    },

    dataHighchartIsLoad: false,
    dataWeatherIsLoad: false,
  };

  componentDidMount() {
    this.setInitialWeatherData();
    this.setInitialChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length > 1 && prevState.value !== this.state.value) {
      this.setState({
        dataWeather: {
          temp: "--",
          wind: "--",
          humidity: "--",
          pressure: "--",
          sunrise: "--",
          sunset: "--",
          icon: "--",
          country: "",
        },
        city: "--",
      });

      this.setInitialWeatherData(this.state.value);
      this.setInitialChartData(this.state.value);
    }
  }

  setInitialWeatherData = async (city) => {
    const weatherData = await fetcher(weatherApiUrl(city));
    if (weatherData) {
      const {
        main: { temp, humidity, pressure },
        wind: { speed },
        weather,
        sys: { country, sunrise, sunset },
        name,
      } = weatherData;
      this.setState({
        dataWeather: {
          temp: temp,
          wind: speed,
          humidity: humidity,
          pressure: pressure,
          sunrise: new Date(sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(sunset * 1000).toLocaleTimeString(),
          icon: weather[0].id,
          country: country,
        },
        city: name,
        dataWeatherIsLoad: true,
      });
    }
  };

  setInitialChartData = async (city) => {
    const chartData = await fetcher(highchartApiUrl(city));
    if (chartData) {
      const { list } = chartData;
      this.setState({
        dataHighchart: {
          hoursHighchart: [list.map((date) => date.dt_txt.slice(11, 16))],
          tempHighchart: [list.map((item) => item.main.temp)],
        },
        dataHighchartIsLoad: true,
      });
    }
  };

  handleCahngeInput = (e) => this.setState({ value: e.target.value });

  render() {
    const {
      dataWeatherIsLoad,
      dataHighchartIsLoad,
      dataHighchart,
      city,
      dataWeather,
      value,
    } = this.state;
    return (
      <>
        <div className="App">
          <div className="input">
            <input
              type="text"
              placeholder="find your city!"
              value={value}
              onChange={this.handleCahngeInput}
            />
            <i className="fas fa-search" />
          </div>
          {dataWeatherIsLoad && (
            <Weather data={dataWeather} city={this.state.city} />
          )}
          {dataHighchartIsLoad && (
            <Highchart data={dataHighchart} city={city} />
          )}
          <footer>
            <p>highchart generate by www.highcharts.com</p>
          </footer>
        </div>
      </>
    );
  }
}

export default App;
