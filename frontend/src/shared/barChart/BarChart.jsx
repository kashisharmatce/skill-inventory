import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "Sample Data",
        data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
        backgroundColor: "rgba(194, 123, 210, 1)",
        borderColor: "rgba(100, 35, 115, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Monthly Data"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
