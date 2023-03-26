import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'; 

export  function InputField() {
    const [grams,setGrams] = useState("")
    const [total,setTotal] = useState('...');

    const handleTotal = ()=>{
        
        const price = 162904.30;
        const goldTotal = ((price /31)*grams).toLocaleString('en-US');
        setTotal(`₹${goldTotal}`);
    }


  return (
    <div>
        <Form className='form'>
      <Form.Group className="mb-3" >
        <Form.Label className='label'>Enter the Weight</Form.Label>
        <Form.Control className='value' type = 'number' onChange={((event)=> setGrams(event.target.value))} placeholder="in grams" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className='label'>Approximate Price (in INR)</Form.Label>
        <h2>{total}</h2>
      </Form.Group>
      <Button variant='warning' className='button' onClick={handleTotal} >
        Calculate
      </Button>
    </Form>
    </div>
  )
}
