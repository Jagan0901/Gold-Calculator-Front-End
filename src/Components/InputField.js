import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { API } from '../api'; 
import { Loading } from './Loading';

export  function InputField({data}) {
    const [grams,setGrams] = useState("")
    const [total,setTotal] = useState('...');
    const [todayPrice, setTodayPrice] = useState('');

    //Getting today gold price from Database
    const getPrice = () => {
      
        fetch(`${API}/Gold/get/today`, {
          method: "GET",
          headers: {"x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo"}
        })
        .then((data) => data.json())
        .then((data)=> setTodayPrice(data.price))
    };
  
  
    useEffect(() => getPrice(), []);

    const handleTotal = ()=>{

      
        const price = (+todayPrice).toFixed(2);
        // console.log(price);
        const goldTotal = ((price /31)*grams).toLocaleString('en-US');
        setTotal(`₹${goldTotal}`);
    }

    const handleKeyDown = (event)=>{
      if(event.key === "Enter"){
        handleTotal();
        event.preventDefault();
      }
    }
    

  return data ? (
    <div>
      <Form className="form" onKeyDown={handleKeyDown}>
        <Form.Group className="mb-3">
          <Form.Label className="label">Enter the Weight</Form.Label>
          <Form.Control
            className="value"
            type="number"
            onChange={(event) => setGrams(event.target.value)}
            placeholder="in grams"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">Approximate Price (in INR)</Form.Label>
          <h2>{total}</h2>
        </Form.Group>
        <Button variant="warning" className="button" onClick={handleTotal}>
          Calculate
        </Button>
      </Form>
    </div>
  ) : (
    <Loading />
  );
}
