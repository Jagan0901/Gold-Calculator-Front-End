import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../api";

export const Login = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [status,setStatus] = useState("");
    // console.log(`Email-${email}, Password-${password}`)

    const getUser = ()=>{
      if(!email || !password) return setStatus("Please fill out the fields");
      setLoading(true);
        const user ={
            email : email,
            password: password
        }
        fetch(`${API}/users/login`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFjNjBkM2RkN2Q3NWI1NTU4ZmZlZSIsImlhdCI6MTY3OTkzNjIxNX0.DmH3UmlTN8sdie9eP_HUQ_sDA2KgkMLXy9egMFMkGFo",
          },
        })
          .then((data)=> data.json())
          .then((res)=>{
            if(res.message){
                setStatus(res.message);
                navigate("/home");
                setLoading(false);
            }else if(res.error){
                setStatus(res.error);
                setLoading(false);
            }
          })
    };

    const getUserCredential = ()=>{
      setEmail("cool@mail.com");
      setPassword("Password@123");
    }

    const navigate = useNavigate();
    const statusStyles = {
      textAlign: "center",
      fontWeight: "bold",
      color: status === "Created Successfully" ? "green" : "red",
      margin: "1% 30% 0% 27%",
    };
  return (
    <div>
      <h1 className="login-title">Login</h1>
      <Form className="login">
        <Form.Group className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            User Email Credential: cool@mail.com
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            User Password Credential: Password@123
          </Form.Text>
        </Form.Group>
        <Button variant="success" className="login-btn" onClick={getUser}>
          {loading ? <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />:"Submit"}
        </Button>
        <Button variant="secondary" className="login-btn" onClick={getUserCredential}>
          To Get User Credential
        </Button>
        <h5 className="navigate-to-signup">
          Don't have an account? Create an account-
          <button
            variant="text"
            style={{ border: "none", textDecoration: "none" }}
            onClick={() => navigate("/signup")}
          >
            Click here
          </button>
        </h5>
        <p style={statusStyles}>{status}</p>
      </Form>
    </div>
  );
};
