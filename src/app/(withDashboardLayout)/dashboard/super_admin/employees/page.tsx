"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  Grid,
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

import { useDeleteAdminsMutation } from "@/redux/features/admin/adminApi";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
import CustomLoader from "@/components/Shared/UI/CustomLoader/CustomLoader";
import Link from "next/link";
import EmployeeModal from "./components/EmployeeModal";
import {
  useDeleteEmployeesMutation,
  useGetAllEmployeesQuery,
} from "@/redux/features/employee/employeeApi";
import { useDebounced } from "@/redux/hooks";

const EmployeePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  query["page"] = page;
  query["limit"] = limit;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTerm = useDebounced({ searchQuery: searchTerm, delay: 700 });
  if (!!debounceTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllEmployeesQuery({ ...query });
  const [deleteEmployee] = useDeleteEmployeesMutation();

  const employees = data?.employees;

  const meta = data?.meta;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },

    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "joing_date", headerName: "Joining Date", flex: 1 },
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
      const res = await deleteEmployee(id).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("Employee deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box mt={2}>
      {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button startIcon={<AddIcon/>} onClick={() => setIsModalOpen(true)}>Create New Employee</Button>
        <EmployeeModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search employee......"
        />
      </Stack> */}

      {/* <Stack
        direction="row"
        // justifyContent="space-between"
        alignItems="center"
        spacing={2}
      > */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <TextField
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{borderRadius:'30px'}}
              size="small"
              fullWidth={true}
              placeholder="Search employee..."
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Create New Employee
            </Button>
          </Grid>
        </Grid>

        <EmployeeModal open={isModalOpen} setOpen={setIsModalOpen} />
      {/* </Stack> */}

      {!isLoading ? (
        <Box sx={{ my: 3 }}>
          <DataGrid
            rows={employees}
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

export default EmployeePage;
