"use client";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AdminModal from "./components/AdminModal";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box>
      <Stack
        spacing={{ xs: 2 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={()=>setIsModalOpen(true)}>Create A Admin</Button>
        {/* <TextField size='small' placeholder='Search specialist...' /> */}

        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />

        <TextField
          size="small"
          sx={{ borderRadius: "20px" }} // Now it should work
          placeholder="Search specialist..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
  );
};

export default AdminPage;
