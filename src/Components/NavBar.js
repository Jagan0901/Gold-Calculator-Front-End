import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export function NavBar({goldData}) {

    function getPrice(){
  
    if(goldData.success === true){
        return `${goldData.rates.XAU.toLocaleString('en-US')} (ozt)`
    }else{
        return "The maximum allowed amount of monthly API requests has been reached"
    }
    }

    

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
        <h2><span className='caption'><i className="fa-solid fa-wifi"></i>Live Gold Price </span>
         - INR  <span className='amount'>{getPrice()}</span></h2>
    </div>
  )
}
