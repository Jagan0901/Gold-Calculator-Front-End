import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import { API } from '../api';
import { Loading } from './Loading';

// function getPrice(){
  
//   if(goldData.success === true){
//       return `${goldData.rates.XAU.toLocaleString('en-US')} (ozt)`
//   }else{
//       return "The maximum allowed amount of monthly API requests has been reached"
//   }
//   }

export function NavBar({data}) {

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

    

  return (
     data ?
    <div className='navbar-container'>
        <Navbar className='navbar'>
        <Container >
          <Navbar.Brand className='nav-content'>
          <i className="fa-solid fa-calculator fa-xl"></i>       
            <p>Gold Calculator India</p>
          </Navbar.Brand>
        </Container>
      </Navbar>
        <h2><span className='caption'><i className="fa-solid fa-wifi"></i>Today Gold Price </span>
         - INR  <span className='amount'>{todayPrice.toLocaleString('en-US')} (ozt)</span></h2>
    </div>
    : <Loading/>
 
  )
}
