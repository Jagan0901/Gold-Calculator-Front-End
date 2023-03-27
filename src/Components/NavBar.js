import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import { API } from '../api';

// function getPrice(){
  
//   if(goldData.success === true){
//       return `${goldData.rates.XAU.toLocaleString('en-US')} (ozt)`
//   }else{
//       return "The maximum allowed amount of monthly API requests has been reached"
//   }
//   }

export function NavBar() {

  const [todayPrice, setTodayPrice] = useState('');

    //Getting today gold price from Database
    const getPrice = () => {
      
      fetch(`${API}/Gold/get/today`, {
        method: "GET"
      })
      .then((data) => data.json())
      .then((data)=> setTodayPrice(data.price))
  };


  useEffect(() => getPrice(), []);  

    

  return (
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
  )
}
