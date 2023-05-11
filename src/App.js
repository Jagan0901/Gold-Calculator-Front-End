import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./Components/NavBar";
import { useEffect, useState } from "react";
import { API } from "./api";
import { InputField } from "./Components/InputField";

// const API_KEY = "31ps09wcojiett784rccja9cunqsg8qthxdewa5v74thr1p61lirmstev9lh"; //upto 50 requests per month
// const API_KEY1 = "0mgdrfjgfp9vxlgvzabek0l0xy16uv6d2umx6he7oz419u522d32h12oa9hk";//upto 50 requests per month
// const API_KEY2 = "nefnopne08vnns2ks1soj86l4h7hi5x38329oudn4d4nrz0i3hvtve02hw6x";//upto 50 requests per month
// const API_KEY3 = "bx6jdfcgc1ubckba1bvskz988d369sj388hc9yb7s0br3n788x7m1sm4u60d";//upto 50 requests per month
// const API_KEY4 = "ok30wg8a7t93tas7i3252b2308xwxjl6an091kbfhe7v2t8mj8sf7xughbzj";//upto 50 requests per month


function App() {
  const [goldData, setGoldData] = useState(null);

  //To Get gold price data from Public API
  const getGoldPrice = () => {
    const URL = "https://www.goldapi.io/api/XAU/INR";
    // const url = `https://metals-api.com/api/latest?access_key=${API_KEY2}&base=INR&symbols=XAU`
    fetch(URL,
      { method  : "GET",
        headers : {"x-access-token": "goldapi-1lh6prlhizyzn5-io", "Content-Type" : "application/json"} 
      }
    )
      .then((response) => response.json())
      .then((data) => setGoldData(data))
      .catch((error) => console.log('error:', error))
  };

  //Inserting gold price data in Database
  const postGoldData = () => {
    const timeStampData = Date.now();
    const timeStamp = new Date(timeStampData);
    const date = timeStamp.toISOString().split('T')[0]
      const gold = {
        date: date,
        price: goldData.price,
      };
      fetch(`${API}/Gold/post`, {
        method: "POST",
        body: JSON.stringify(gold),
        headers: { "Content-Type": "application/json", "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo" },
      }).then((data) => data.json());
  };

  if(goldData !==null) postGoldData();

  useEffect(() => getGoldPrice(), []);


  return (
    <div className="App">
       <NavBar/> 
       <h1>Gold Calculator</h1> 
       <InputField /> 
    </div>
  );
}

export default App;
