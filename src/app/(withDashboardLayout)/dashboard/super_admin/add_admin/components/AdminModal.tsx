import BCFileUploader from "@/components/Forms/BCFileUploader";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";
import BCFullScreenModal from "@/components/Shared/BCModal/BCFullScreenModal";
import { useCreateAdminMutation } from "@/redux/features/admin/adminApi";
import { Gender, MaritalStatus } from "@/types";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
  admin: {
    name:"",
    email:"",
    contactNumber: "",
    address: "",
    gender:"",
    maritalStatus:"",
    qualification:"",
  },
  password: "",
};

const AdminModal = ({ open, setOpen }: TProps) => {
  const [createAdmin] = useCreateAdminMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);

    console.log(data, values);
    // console.log(values);

    try {
      const res = await createAdmin(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Admin created successfully");
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  return (
    <BCFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <BCForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="admin.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="admin.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="admin.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="admin.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BCSelectField
              items={Gender}
              name="admin.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="admin.qualification"
              label="Qualification "
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCSelectField
              items={MaritalStatus}
              name="admin.maritalStatus"
              label="MaritalStatus"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>

        <Button type="submit">Create</Button>
      </BCForm>
    </BCFullScreenModal>
  );
};

export default AdminModal;
