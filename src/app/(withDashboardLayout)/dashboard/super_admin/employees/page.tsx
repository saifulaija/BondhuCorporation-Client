"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,

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

import {
  useDeleteAdminsMutation,

} from "@/redux/features/admin/adminApi";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
import CustomLoader from "@/components/Shared/UI/CustomLoader/CustomLoader";
import Link from "next/link";
import EmployeeModal from "./components/EmployeeModal";
import { useGetAllEmployeesQuery } from "@/redux/features/employee/employeeApi";
import { useDebounced } from "@/redux/hooks";

const EmployeePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTerm = useDebounced({ searchQuery: searchTerm, delay: 700 });
  if (!!debounceTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllEmployeesQuery({...query});
  const [deleteAdmin] = useDeleteAdminsMutation();

  const admins = data?.employees;

  const meta = data?.meta;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },

    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "joining_date", headerName: "Joining Date", flex: 1 },
    { field: "salary", headerName: "Salary", flex: 1 },


    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <ButtonGroup>
            <Link href={`/dashboard/super_admin/employees/edit/${row?.id}`}>
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
    <Box mt={2}>
       <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create New Employee</Button>
        <EmployeeModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search doctors"
        />
      </Stack>

      {!isLoading ? (
        <Box sx={{ my: 3 }}>
          <DataGrid
            rows={admins}
            columns={columns}
            hideFooter={true}
            autoHeight={true}
          />
        </Box>
      ) : (
        <CustomLoader />
      )}
    </Box>
  );
};

export default EmployeePage;
