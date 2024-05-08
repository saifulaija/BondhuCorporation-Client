"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AdminModal from "./components/AdminModal";
import {
  useDeleteAdminsMutation,
  useGetAllAdminsQuery,
} from "@/redux/features/admin/adminApi";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
import CustomLoader from "@/components/Shared/UI/CustomLoader/CustomLoader";



const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);



  const { data, isLoading } = useGetAllAdminsQuery({});
  const [deleteAdmin] = useDeleteAdminsMutation();

  const admins = data?.admins;
  const meta = data?.meta;

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Image",
      flex: 1,
      headerAlign: "left",

      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Avatar src={row.profilePhoto} alt="image" />
          </Box>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },

    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "maritalStatus", headerName: "MaritalStatus", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <ButtonGroup>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
              color="primary"
            >
              <EditNoteIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
              color="primary"
            >
              <ClearIcon />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteAdmin(id).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("Admin deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box>
   <Stack
      spacing={1} // Increased spacing between elements
      direction="column" // Stack items vertically
      alignItems="center" // Center items horizontally
      mt={1} // Add margin at the top
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Management
      </Typography>
      <Fab
        onClick={() => setIsModalOpen(true)}
        color="primary"
        variant="extended"
        size="large"
      >
        <AddIcon sx={{ mr: 1 }} /> Add Admin
      </Fab>
      <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
    
     
    </Stack>

      {!isLoading ? (
        <Box sx={{ my: 1 }}>
          <DataGrid rows={admins} columns={columns} hideFooter={true} />
        </Box>
      ) : (
       <CustomLoader/>
      )}
    </Box>
  );
};

export default AdminPage;
