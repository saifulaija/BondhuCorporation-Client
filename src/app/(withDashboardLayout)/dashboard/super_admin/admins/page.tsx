"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  InputAdornment,
  Pagination,
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
import Link from "next/link";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading } = useGetAllAdminsQuery({...query});
  const [deleteAdmin] = useDeleteAdminsMutation();

  const admins = data?.admins;

  const meta = data?.meta;

  const columns: GridColDef[] = [
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
            <Link href={`/dashboard/super_admin/admins/edit/${row?.id}`}>
              <IconButton aria-label="edit">
                <EditNoteIcon />
              </IconButton>
            </Link>
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

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        direction="row" // Stack items vertically
        alignItems="center" 
      justifyContent='space-between'
        mt={1} // Add margin at the top
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Admin Management
        </Typography>
        <Fab
          onClick={() => setIsModalOpen(true)}
          color="primary"
          variant="circular"
          size="small"
        >
          <AddIcon />
        </Fab>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>

      {!isLoading ? (
        <Box sx={{ my: 3 }}>
          <DataGrid
            rows={admins}
            columns={columns}
           
            autoHeight={true}
            hideFooterPagination
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <CustomLoader />
      )}
    </Box>
  );
};

export default AdminPage;
