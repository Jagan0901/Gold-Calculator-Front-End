import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "../Components/NavBar";
import { useEffect, useState } from "react";
import { API } from "../api";
import { InputField } from "../Components/InputField";
import { LineChart } from "../Components/LineChart";

function descending(a, b) {
  if (a.date < b.date) {
    return 1;
  } else if (a.date > b.date) {
    return -1;
  } else {
    return 0;
  }
}

function ascending(a, b) {
  if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  } else {
    return 0;
  }
}

// const API_KEY1 = "goldapi-1lh6prlhizyzn5-io";
// const API_KEY2 = "goldapi-4j3z0rlhrd1754-io";

export const Home = () => {
     const [goldData, setGoldData] = useState(null);

     //To Get gold price data from Public API
     const getGoldPrice = () => {
       const fetchData = () => {
         const URL = "https://www.goldapi.io/api/XAU/INR";
         fetch(URL, {
           method: "GET",
           headers: {
             "x-access-token": "goldapi-4j3z0rlhrd1754-io",
             "Content-Type": "application/json",
           },
         })
           .then((response) => response.json())
           .then((data) => setGoldData(data))
           .catch((error) => console.log("error:", error));
       };
       fetchData(); //Initial API call when the component mount

       const interval = setInterval(fetchData, 12 * 60 * 60 * 1000);

       return () => clearInterval(interval);
     };

     //Inserting gold price data in Database
     const postGoldData = () => {
       const timeStampData = Date.now();
       const timeStamp = new Date(timeStampData);
       const date = timeStamp.toISOString().split("T")[0];
       const gold = {
         date: date,
         price: goldData.price,
       };
       fetch(`${API}/Gold/post`, {
         method: "POST",
         body: JSON.stringify(gold),
         headers: {
           "Content-Type": "application/json",
           "x-auth-token":
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo",
         },
       }).then((data) => data.json());
     };

     if (goldData !== null) postGoldData();

     useEffect(() => getGoldPrice(), []);

     //Line Chart Part
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




 
  return goldData && allData.length > 1 ? (
    <div className="App">
      <NavBar data={goldData} />
      {/* <p className="alert">Please refresh to get accurate value ! ! !</p> */}
      <h1>Gold Calculator</h1>
      <InputField data={goldData} />
      <div className="chart">
        <LineChart result={result} refresh={goldData} />
      </div>
    </div>
  ) : (
    "Loading..."
  );
};
