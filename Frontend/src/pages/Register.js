import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [laoding, setLaoding] = useState(false);
  //Form Submit
  const submitHandler = async (values) => {
    try {
      setLaoding(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLaoding(false);
      navigate("/login");
    } catch (error) {
      setLaoding(false);
      message.error("Invalid Something Went Wrong");
    }
  };

  //Prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {laoding && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="text-xl font-bold text-black mb-4">
            Registration Form
          </h1>
          <Form.Item
            label="Name"
            name="name"
            className="text-gray-700 block mb-1 font-medium"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="text-gray-700 block mb-1 font-medium"
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="text-gray-700 block mb-1 font-medium"
          >
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already Registered ? Click Here To Login!
            </Link>
            <button className="btn btn-primary ml-5 w-full sm:w-auto">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
