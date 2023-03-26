import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./Components/NavBar";
import { useEffect, useState } from "react";
import { API } from "./api";
import { InputField } from "./Components/InputField";

const API_KEY = "31ps09wcojiett784rccja9cunqsg8qthxdewa5v74thr1p61lirmstev9lh";
const API_KEY1 = "0mgdrfjgfp9vxlgvzabek0l0xy16uv6d2umx6he7oz419u522d32h12oa9hk";
const API_KEY2 = "nefnopne08vnns2ks1soj86l4h7hi5x38329oudn4d4nrz0i3hvtve02hw6x";

function App() {
  const [goldData, setGoldData] = useState({});

  //To Get gold price data from Public API
  const getGoldPrice = () => {
    fetch(
      `https://metals-api.com/api/latest?access_key=${API_KEY}&base=INR&symbols=XAU`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setGoldData(data);
        }
      });
  };

  //Inserting gold price data in Database
  const postGoldData = () => {
    if (goldData.success === true) {
      const gold = {
        date: goldData.date,
        price: goldData.rates.XAU,
      };
      fetch(`${API}/Gold/post`, {
        method: "POST",
        body: JSON.stringify(gold),
        headers: { "Content-Type": "application/json" },
      }).then((data) => data.json());
    }
  };

  useEffect(() => getGoldPrice(), []);
  useEffect(() => postGoldData(), []);

  return (
    <div className="App">
      <NavBar goldData={goldData} />
      <h1>Gold Calculator</h1>
      <InputField />
    </div>
  );
}

export default App;
