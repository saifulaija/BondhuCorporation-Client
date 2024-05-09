import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Designation, Gender, MaritalStatus } from "@/types/common";
import { FieldValues } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";

import { toast } from "sonner";

import BCFullScreenModal from "@/components/Shared/BCModal/BCFullScreenModal";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";
import BCFileUploader from "@/components/Forms/BCFileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateEmployeeMutation } from "@/redux/features/employee/employeeApi";
import BCDatePicker from "@/components/Forms/BCDatePicker";
import { dateFormatter } from "@/utils/dateFormatter";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployeeModal = ({ open, setOpen }: TProps) => {
  const [createEmployee] = useCreateEmployeeMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.employee.dob = dateFormatter(values.employee.dob);
    values.employee.joing_date = dateFormatter(values.employee.joing_date);
    values.employee.salary = Number(values.employee.salary);
    values.employee.experience = Number(values.employee.experience);
  

    const data = modifyPayload(values);
    try {
      const res = await createEmployee(data).unwrap();
     
      if (res?.id) {
        toast.success("Employee created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    employee: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      gender: "",
      maritalStatus: "",
      qualification: "",
      designation: "",
      joing_date: "",
      dob: "",
      experience: 0,
      emergencyContactNumber: "",
      salary: 0,
      bankAccountNumber: "",
      bankName: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <BCFullScreenModal open={open} setOpen={setOpen} title="Create New Admin">
      <Container maxWidth="lg">
        <BCForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
          <Divider>
            <Typography variant="h5" fontWeight={300}>
              Personal Information
            </Typography>
          </Divider>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.name"
                label="Name"
                fullWidth={true}
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
                required={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="password"
                type="password"
                label="Password"
                fullWidth={true}
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCSelectField
                items={MaritalStatus}
                name="employee.maritalStatus"
                label="MaritalStatus"
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCDatePicker
                name="employee.dob"
                required={true}
                label="Date Of Birth"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.contactNumber"
                label="Contract Number"
                fullWidth={true}
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.emergencyContactNumber"
                label="Emergency Contact Number"
                fullWidth={true}
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCSelectField
                items={Gender}
                name="employee.gender"
                label="Gender"
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.address"
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
                name="employee.qualification"
                label="Qualification"
                fullWidth={true}
                required={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCSelectField
                items={Designation}
                name="employee.designation"
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
                name="employee.salary"
                type="number"
                label="Salary"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCDatePicker
                name="employee.joing_date"
                label="Date Of Joining"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.experience"
                type="number"
                label="Experience"
                required={true}
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.bankName"
                label="Bank Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <BCInput
                name="employee.bankAccountNumber"
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
              startIcon={<AddIcon />}
              sx={{ maxWidth: "400px", width: "100%" }}
              type="submit"
            >
              Create
            </Button>
          </Box>
        </BCForm>
      </Container>
    </BCFullScreenModal>
  );
};

export default EmployeeModal;
