"use client";

import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";

import { Gender, MaritalStatus } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useGetAdminQuery, useUpdateAdminMutation } from "@/redux/features/admin/adminApi";

type TProps = {
  params: {
    adminId: string;
  };
};

const AdminUpdatePage = ({ params }: TProps) => {
  const router = useRouter();
  //   console.log(params?.doctorId);
  const id = params?.adminId;
  const { data, isLoading } = useGetAdminQuery(id);
  console.log(id)
  console.log(data)
  const [updateDoctor] = useUpdateAdminMutation();
  //   console.log(data);
  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    maritalStatus: data?.maritalStatus || "",

    gender: data?.gender || "",

    qualification: data?.qualification || "",
  };

  const handleAdminUpdate = async (values: FieldValues) => {
    values.id = id;
    // console.log(values)
    const updatedData = {
      id: values.id,
      body: values,
    };

    try {
      const res = await updateDoctor(updatedData).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor updated successfully!!");
        router.refresh();
        router.push("/dashboard/super_admin/admins");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Update Doctor Information
      </Typography>
      {isLoading ? (
        "Loading...."
      ) : (
        <BCForm onSubmit={handleAdminUpdate} defaultValues={defaultValues}>
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCSelectField
                items={MaritalStatus}
                name="maritalStatus"
                label="MaritalStatus"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<UpgradeIcon />}
              sx={{ maxWidth: "400px", width: "100%" }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </BCForm>
      )}
    </Box>
  );
};

export default AdminUpdatePage;
