import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from './../api';


export const SignUp = () => {
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    // console.log(createEmail,createPassword)
    const navigate = useNavigate();

    const postUsers = ()=>{
      if (!createEmail || !createPassword) return setStatus("Please fill out the fields");
      setLoading(true);
        const newUser = {
            email:createEmail,
            password:createPassword
        }
        fetch(`${API}/users/signup`, {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo",
          },
        })
         .then((data)=> data.json())
         .then((res)=> {
            if(res.message){
                setStatus(res.message);
                navigate('/');
                setLoading(false);
            }else if(res.error){
                setStatus(res.error);
                setLoading(false);
            }
         })
    }

    const statusStyles = {
      textAlign: "center",
      fontWeight: "bold",
      color: status === "Created Successfully" ? "green" : "red",
      margin: "1% 30% 0% 27%",
    };

  return (
    <div>
      <h1 className="login-title">SignUp</h1>
      <Form className="login">
        <Form.Group className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Create Email"
            onChange={(e) => setCreateEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
            onChange={(e) => setCreatePassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="login-btn" onClick={postUsers}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Sign Up"
          )}
        </Button>
        <p style={statusStyles}>{status}</p>
      </Form>
    </div>
  );
};
