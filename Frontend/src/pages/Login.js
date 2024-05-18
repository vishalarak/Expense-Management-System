import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form Submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login Success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: " " })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid credentials or something went wrong.");
    }
  };

  // Prevent logged-in user from accessing the login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Login Form</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Link to="/register">Not A User? Click Here To Register!</Link>
          <Button type="primary" htmlType="submit" className="ml-5">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
