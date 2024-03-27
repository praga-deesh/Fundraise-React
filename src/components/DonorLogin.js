import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DonorLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:8090/donor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      let user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: "donor",
      };

      sessionStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      navigate("/donor-profile");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to login. Please check your username and password.");
    }
  };

  return (
    <div class="container">
      {error && <p class="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} class="form-group">
        <h2>Donor Login</h2>

        <label htmlFor="email" class="col-form-label-lg">
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          class="form-control"
        />
        <br></br>

        <label htmlFor="password" class="col-form-label-lg">
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          class="form-control"
        />
        <br></br>

        <div>
          <button type="submit" class="btn btn-success">
            Login
          </button>
        </div>

        <br></br>
            <div class="px-2" onClick={() => navigate('/donor-signup')}>
                <label class="col-form-label-lg px-2">New User?</label>
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
      </form>
      <div id="fundraiserLogin" onClick={() => navigate('/login')}>
        <button type="submit" class="btn btn-secondary">FundRaiserLogin</button>
      </div>
    </div>
  );
}

export default DonorLogin;
