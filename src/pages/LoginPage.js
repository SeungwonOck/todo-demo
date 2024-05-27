import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api"

import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/login", { email, password })
            if (response.status === 200) { 
                setUser(response.data.user)
                sessionStorage.setItem("token", response.data.token);
                api.defaults.headers["authorization"] = "Bearer " + response.data.token
                setError("")
                navigate("/");
            }
            throw new Error(response.message)
        } catch (err) { 
            setError(err.message)
        }
    }
  return (
      <div className="display-center">
          {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;