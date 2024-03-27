import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./FundRaiserSignup.css";

function FundRaiserSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validate form data
  const validate = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      sendSignupData(formData);
    }
  };

  const sendSignupData = async (data) => {
    try {
      const response = await fetch("http://localhost:8090/fundraiser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const responseData = await response.json();
      console.log("Signup success:", responseData);
      // Optionally, clear the form/reset state or redirect the user after successful signup
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div class="container">
    <form onSubmit={handleSubmit} class="form-group">
    <h2> Fundraiser Registration</h2>
    <label htmlFor="name" class="col-form-label-lg">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <label htmlFor="email" class="col-form-label-lg">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <label htmlFor="password" class="col-form-label-lg">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <button type="submit" class="btn btn-success">Sign Up</button>
    </form>
    </div>
  );
}
export default FundRaiserSignup;
