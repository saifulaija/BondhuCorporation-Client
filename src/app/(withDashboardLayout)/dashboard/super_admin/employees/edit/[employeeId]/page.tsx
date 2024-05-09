"use client";

import BCDatePicker from "@/components/Forms/BCDatePicker";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/redux/features/employee/employeeApi";
import { Designation, Gender, MaritalStatus } from "@/types";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { dateFormatter } from "@/utils/dateFormatter";

type TProps = {
  params: {
    employeeId: string;
  };
};

const EmployeeUpdatePage = ({ params }: TProps) => {
  const router = useRouter();
  //   console.log(params?.doctorId);
  const id = params?.employeeId;
  const { data, isLoading } = useGetEmployeeQuery(id);
  console.log(data);
  const [updateEmployee] = useUpdateEmployeeMutation();
  //   console.log(data);
  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    emergencyContactNumber: data?.emergencyContactNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    salary: data?.salary || 0,
    maritalStatus: data?.maritalStatus || "",
    dob: data?.dob || "",
    joing_date: data?.joing_date || "",
    qualification: data?.qualification || "",
    bankName: data?.bankName || "",
    bankAccountNumber: data?.bankAccountNumber || "",
    designation: data?.designation || "",
  };

  const handleEmployeeUpdate = async (values: FieldValues) => {
    values.dob = dateFormatter(values.dob);
    values.joing_date = dateFormatter(values.joing_date);
    values.salary = Number(values.salary);
    values.experience = Number(values.experience);

    values.id = id;

    const updatedData = {
      id: values.id,
      body: values,
    };

    try {
      const res = await updateEmployee(updatedData).unwrap();

      if (res?.id) {
        toast.success("Employee updated successfully!!");
        router.refresh();
        router.push("/dashboard/super_admin/employees");
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
        <Container maxWidth="lg">
          <BCForm onSubmit={handleEmployeeUpdate} defaultValues={defaultValues}>
            <Divider>
              <Typography variant="h5" fontWeight={300}>
                Personal Information
              </Typography>
            </Divider>
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="name"
                  label="Name"
                  fullWidth={true}
                  required={true}
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
                <BCSelectField
                  items={MaritalStatus}
                  name="maritalStatus"
                  label="MaritalStatus"
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCDatePicker
                  name="dob"
                  required={true}
                  label="Date Of Birth"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="contactNumber"
                  label="Contract Number"
                  fullWidth={true}
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="emergencyContactNumber"
                  label="Emergency Contact Number"
                  fullWidth={true}
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <BCSelectField
                  items={Gender}
                  name="gender"
                  label="Gender"
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="address"
                  label="Address"
                  fullWidth={true}
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>

            <Divider>
              <Typography variant="h5" fontWeight={300}>
                Professional Information
              </Typography>
            </Divider>

            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="qualification"
                  label="Qualification"
                  fullWidth={true}
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCSelectField
                  items={Designation}
                  name="designation"
                  label="Designation"
                  required={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4}>
              <BCDatePicker name="employee.joining_date" label="Date Of Joining" />
            </Grid> */}
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="salary"
                  type="number"
                  label="Salary"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCDatePicker
                  name="joing_date"
                  label="Date Of Joining"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="experience"
                  type="number"
                  label="Experience"
                  required={true}
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="bankName"
                  label="Bank Name"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <BCInput
                  name="bankAccountNumber"
                  label="Account Number"
                  fullWidth={true}
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
        </Container>
      )}
    </Box>
  );
};

export default EmployeeUpdatePage;
