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
  "Saturday",
];

const Highchart = ({ city, data: { hoursHighchart, tempHighchart } }) => {
  const fullDate = new Date().toLocaleString();
  let counter = new Date().getDay();

  const hoursWithDays = [...hoursHighchart[0]].map((item) => {
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
      text: `Five-day weather forecast for ${city}`,
      style: {
        fontSize: 28,
        fontWeight: "bold",
      },
    },

    subtitle: {
      text: `every three hours from ${fullDate}`,
      style: {
        fontSize: 22,
      },
    },
    xAxis: {
      categories: hoursWithDays,
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [
      {
        name: "temperature",
        data: tempHighchart[0],
      },
    ],
    chart: {
      style: {
        fontFamily: "Dosis",
        fontSize: 18,
        color: "black",
      },
    },
  };

  return (
    <div className="highchart">
      <HighchartsReact highcharts={Highcharts} options={HighchartOptions} />
    </div>
  );
};

export default Highchart;
