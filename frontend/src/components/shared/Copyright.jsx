// Copyright.jsx
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="" underline="none">
        Jetimob
      </Link>
      {" - Todos os direitos reservados."}
    </Typography>
  );
};

export default Copyright;
