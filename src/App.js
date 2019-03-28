import React, { Component } from "react";
import "./App.css";
import Highchart from "./components/Highchart";
import Weather from "./components/Weather";
// import Pollution from "./components/Pollution";
const APIkey = "1697193f8750f5ec8d1046c2118876cf";
class App extends Component {
  state = {
    dataHighchart: [],
    dataWeather: [],
    dataHighchartIsLoad: false,
    dataWeatherIsLoad: false,
    value: "Warsaw"
  };

  handleCahngeInput = e => this.setState({ value: e.target.value });
  componentDidMount() {
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
        } else {
          this.setState({ dataWeather: [], dataWeatherIsLoad: false });
        }
        throw Error("Brak miasta w bazie");
      })
      .then(data =>
        this.setState({
          dataWeather: data,
          dataWeatherIsLoad: true
        })
      )
      .catch(err => console.log(err));
    fetch(highchartAPI)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          this.setState({ dataHighchart: [], dataHighchartIsLoad: false });
        }
        throw Error("Brak miasta w bazie");
      })
      .then(data =>
        this.setState({
          dataHighchart: data,
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
            dataWeather: data,
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
            dataHighchart: data,
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
