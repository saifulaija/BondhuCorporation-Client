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
        color: "text.secondary", 
      }}
    >
      <CircularProgress color="primary" size={40} thickness={2} />
    
    </Box>
  );
};

export default CustomLoader;
