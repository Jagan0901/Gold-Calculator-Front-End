import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { Loading } from "./Loading";






export function LineChart({result,refresh}) {


const [chartData, setChartData] = useState({
    labels:  result.map((data) => data.date),
    datasets: [
      {
        label: "Weekly Price(per grm) Report",
        data:  result.map((data) => data.pricePerGram),
        backgroundColor: ["rgba(121, 108, 44, 0.67)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  

  return refresh ? <Line data={chartData}/> : <Loading/> ;
}
