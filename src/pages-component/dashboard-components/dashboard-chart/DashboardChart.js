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
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];
const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [2, 8, 4, 9, 2, 6],
    },
    {
      label: "Dataset 2",
      data: [8, 2, 6, 8, 0, 4],
    },
  ],
};
const chartData = {
  ...data,
  datasets: data.datasets.map((dataset) => ({
    ...dataset,
    borderColor: "red",
  })),
};
const DashboardChart = () => {
  return (
    <div className="dashboardchart">
      <Chart type="line" data={chartData} />;
    </div>
  );
};

export default DashboardChart;
