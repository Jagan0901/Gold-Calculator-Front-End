import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { API } from "../api";


function descending(a,b){
    if(a.date<b.date){
        return 1;
    }else if(a.date>b.date){
        return -1;
    }else{
        return 0;
    }
}

function ascending(a,b){
    if(a.date<b.date){
        return -1;
    }else if(a.date>b.date){
        return 1;
    }else{
        return 0;
    }
}


export function LineChart({refresh}) {
  const [allData, setAllData] = useState([]);
  const getAllData = () => {
    fetch(`${API}/Gold/get`, {
      method: "GET",
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo",
      },
    })
      .then((response) => response.json())
      .then((data) => setAllData(data));
  };
  useEffect(() => getAllData(), []);
  const des = allData.sort((a, b) => descending(a, b));
  let emptyArr = [];
  des.forEach((item, i) => {
    if (i <= 6) {
      emptyArr.push(item);
    }
  });
  const result = emptyArr.sort((a, b) => ascending(a, b));

//   console.log(result);

const [chartData, setChartData] = useState({
    labels: result.map((data) => data.date),
    datasets: [
      {
        label: "Weekly Price Report",
        data: result.map((data) => data.pricePerGram),
        backgroundColor: ["rgba(121, 108, 44, 0.67)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  

  return refresh && allData.length>1 ? <Line data={chartData}/> :'Loading';
}
