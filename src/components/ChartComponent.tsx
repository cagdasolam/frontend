import { Bar } from "react-chartjs-2";
// import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  record: Record<string, number>;
}

const IncorporationCountryChart: React.FC<ChartProps> = ({ record }) => {
  const labels = Object.keys(record);
  const values = Object.values(record);

  const backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Distribution of Incorporation Country Chart",
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

const ProductGroupByCompanyChart: React.FC<ChartProps> = ({ record }) => {
  const labels = Object.keys(record);
  const values = Object.values(record);

  const backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Distribution of Products by Company",
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export { IncorporationCountryChart, ProductGroupByCompanyChart };
