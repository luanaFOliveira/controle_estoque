import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Box } from "@mui/material";
import React from "react";

export const LoginGoogle = ({ handleLoginGoogle }) => {
  return (
    <Box sx={{ marginTop: 1.5, display: "flex", justifyContent: "center" }}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginGoogle}
          onFailure={handleLoginGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleOAuthProvider>
    </Box>
  );
};
