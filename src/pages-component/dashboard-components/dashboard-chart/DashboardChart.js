import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./dashboardchart.css";
import chartbg from "../../../assests/images/chartbg.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["Mon", "Tus", "Wed", "Thr", "Fri", "Sat", "Sun"];
const colors = ["#FB49C0", "#0D24EF", "#C17168", "#3EB7E5"];
const data = {
  fillOpacity: 0.3,
  labels,
  datasets: [
    {
      data: [1, 6, 4, 8, 5, 3, 20],
      pointRadius: 0,
      borderWidth: 5,
    },
    {
      data: [0, 5, 3, 9, 4, 5, 8],
      pointRadius: 0,
      borderWidth: 4,
    },
    {
      data: [0, 4, 5, 6, 5, 3, 7],
      pointRadius: 0,
      borderWidth: 3,
    },
    {
      data: [1, 7, 3, 9, 7, 5, 8],
      pointRadius: 0,
      borderWidth: 2,
    },
  ],
};

const chartData = {
  ...data,
  datasets: data.datasets.map((dataset, i) => ({
    ...dataset,
    borderColor: colors[i],
  })),
};
const options = {
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
    },
  },
  maintainAspectRatio: true,
  hover: {
    intersect: false,
  },
  tension: 0.5,
  borderCapStyle: "round",
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
        borderColor: "#0d0027",
        color: "#161037",
      },
      ticks: {
        color: "#FFFFFF",
        fontFamily: "Poppins",
      },
    },
    y: {
      grid: {
        display: true,
        borderColor: "#161037",
        color: "#161037",
      },
      ticks: {
        stepSize: 3,
        color: "#FFFFFF",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        color: "white",
      },
    },
  },
};

const DashboardChart = () => {
  return (
    <div className="dashboardchart">
      <img src={chartbg} alt="" className="chartbg" />
      <Line data={chartData} options={{ ...options }} />;
    </div>
  );
};

export default DashboardChart;
