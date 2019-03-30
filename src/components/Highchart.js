import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "../styles/Highchart.css";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const Highchart = props => {
  console.log(props.data);
  const day = new Date().getDay();
  const fullDate = new Date().toLocaleDateString();
  let counter = day;

  const hoursWithDays = [...props.data.hoursHighchart[0]].map(item => {
    if (item === "00:00") {
      if (counter < 3) {
        item = days[counter + 1].substring(0, 3) + " " + item;
        counter += 1;
      } else if (counter === 3) {
        item = days[4].substring(0, 3) + " " + item;
        counter += 1;
      } else if (counter === 4) {
        item = days[5].substring(0, 3) + " " + item;
        counter += 1;
      } else if (counter === 5) {
        item = days[6].substring(0, 3) + " " + item;
        counter += 1;
      } else if (counter === 6) {
        item = days[0].substring(0, 3) + " " + item;
        counter = 0;
      }
    }
    return item;
  });
  const HighchartOptions = {
    title: {
      text: `Five-day weather forecast for ${props.city}`
    },

    subtitle: {
      text: `from ${days[day - 1]}  ${fullDate}`
    },
    xAxis: {
      categories: hoursWithDays
    },
    yAxis: {
      title: {
        text: "Temperature (°C)"
      }
    },
    series: [
      {
        name: "temperature",
        data: props.data.tempHighchart[0]
      }
    ]
  };

  return (
    <div className="highchart">
      <HighchartsReact highcharts={Highcharts} options={HighchartOptions} />
      <p>highchart generate by www.highcharts.com</p>
    </div>
  );
};

export default Highchart;
