import React from "react";
import { Box, CircularProgress } from "@mui/material";

const CustomLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "text.secondary", // Set color to secondary text color
      }}
    >
      <CircularProgress color="primary" size={50} thickness={3} />
    
    </Box>
  );
};

export default CustomLoader;
