import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import axios from "axios"; // Axios for API requests
import "./landing.css";
import washingMachine from "../images/landing_page.avif";

export function Landing({ onLoginSuccess }) {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credentialResponse to the backend
      const response = await axios.post("http://localhost:5001/login", {
        credentialResponse,
      });

      const { token } = response.data;
      localStorage.setItem("authToken", token); // Store the token locally

      onLoginSuccess(); // Notify parent component about successful login
    } catch (error) {
      console.error("Error during login:", error);
      alert("Unable to log in. Please try again.");
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    alert("Unable to log in. Please try again.");
  };

  return (
    <Box className="landing-container">
      <header className="landing-header">
        <Typography variant="h3" component="h1" className="landing-title">
          Welcome to ProcastiWash
        </Typography>
        <Typography variant="subtitle1" className="landing-subtitle">
          Manage your laundry time effortlessly.
        </Typography>
      </header>
      <Card className="landing-card">
        <CardMedia
          component="img"
          alt="Washing Machine"
          image={washingMachine}
          className="landing-image"
        />
      </Card>
      <div className="login-container">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          auto_select={true}
        />
      </div>
    </Box>
  );
}