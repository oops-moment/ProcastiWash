import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import "./landing.css"; // Import the custom CSS file
import washingMachine from "../images/landing_page.avif";

export function Landing() {
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
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          auto_select={true}
        />
      </div>
    </Box>
  );
}