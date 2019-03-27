import React, { Component } from "react";
import "./App.css";
//import Input from "components/Input";
// import Highchart from "components/Highchart";
// import FutureWeather from "components/FutureWeather";
// import Pollution from "components/Pollution";
const APIkey = "1697193f8750f5ec8d1046c2118876cf";
class App extends Component {
  state = {
    dataWeather: [],
    weatherIsLoad: false,
    value: "",
    hours: []
  };

  handleCahngeInput = e => this.setState({ value: e.target.value });
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/forecast?q=${
        this.state.value
      }&appid=${APIkey}&units=metric`;
      fetch(API)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw Error("Brak miasta w bazie");
        })
        .then(data =>
          this.setState({
            dataWeather: data,
            weatherIsLoad: true
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
          {console.log(this.state.dataWeather)}
          {/* <Highchart />
        <FutureWeather />
        <Pollution /> */}
        </div>
      </>
    );
  }
}

export default App;
