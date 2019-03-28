import React, { Component } from "react";
import "./App.css";
import Highchart from "./components/Highchart";
import Weather from "./components/Weather";
const APIkey = "1697193f8750f5ec8d1046c2118876cf";

//zwiększyć czytelność kodu poprzez stworzenie większej ilośc komponentów
//dodanie do wykresu wskaźnika zachmurzenia, wiatru i ciśnienia
//ogarnięcie ikon bez dodawania plików

class App extends Component {
  state = {
    value: "Warsaw",
    dataHighchart: {
      hoursHighchart: [],
      tempHighchart: []
    },
    dataWeather: {
      temp: "",
      wind: "",
      humidity: "",
      pressure: "",
      sunrise: "",
      sunset: "",
      icon: "",
      country: ""
    },

    dataHighchartIsLoad: false,
    dataWeatherIsLoad: false
  };

  handleCahngeInput = e => this.setState({ value: e.target.value });
  componentDidMount() {
    const date = new Date().toISOString();
    this.setState({ date: date.slice(0, 23) + "000" + date.slice(23, 24) });
    const highchartAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${
      this.state.value
    }&appid=${APIkey}&units=metric`;
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&appid=${APIkey}&units=metric`;

    //pogoda--------------------------------------
    fetch(weatherAPI)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw Error("Brak miasta w bazie");
      })
      .then(data =>
        this.setState({
          dataWeather: {
            temp: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
            icon: data.weather[0].id,
            country: data.sys.country
          },
          dataWeatherIsLoad: true
        })
      )
      .catch(err => console.log(err));
    //wykres-----------------------
    fetch(highchartAPI)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw Error("Brak miasta w bazie");
      })
      .then(data =>
        this.setState({
          dataHighchart: {
            hoursHighchart: [
              data.list.map((date, index) => date.dt_txt.slice(11, 16))
            ],
            tempHighchart: [data.list.map(item => item.main.temp)]
          },
          dataHighchartIsLoad: true
        })
      )
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value && this.state.value.length > 2) {
      const highchartAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${
        this.state.value
      }&appid=${APIkey}&units=metric`;
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&appid=${APIkey}&units=metric`;
      fetch(weatherAPI)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } /*else {
            this.setState({ dataWeather: [], dataWeatherIsLoad: false });
          }*/
          throw Error("Brak miasta w bazie");
        })
        .then(data =>
          this.setState({
            dataWeather: {
              temp: data.main.temp,
              wind: data.wind.speed,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
              sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
              icon: data.weather[0].id,
              country: data.sys.country
            },
            dataWeatherIsLoad: true
          })
        )
        .catch(err => console.log(err));
      fetch(highchartAPI)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } /*else {
            this.setState({ dataHighchart: [], dataHighchartIsLoad: false });
          }*/
          throw Error("Brak miasta w bazie");
        })
        .then(data =>
          this.setState({
            dataHighchart: {
              hoursHighchart: [
                data.list.map((date, index) => date.dt_txt.slice(11, 16))
              ],
              tempHighchart: [data.list.map(item => item.main.temp)]
            },
            dataHighchartIsLoad: true
          })
        )
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <>
        <div className="App">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleCahngeInput}
          />
          <br />
          {this.state.dataWeatherIsLoad ? (
            <Weather data={this.state.dataWeather} city={this.state.value} />
          ) : null}
          {this.state.dataHighchartIsLoad ? (
            <Highchart
              data={this.state.dataHighchart}
              city={this.state.value}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
