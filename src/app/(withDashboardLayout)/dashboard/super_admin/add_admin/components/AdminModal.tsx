// import BCFileUploader from "@/components/Forms/BCFileUploader";
// import BCForm from "@/components/Forms/BCForm";
// import BCInput from "@/components/Forms/BCInput";
// import BCSelectField from "@/components/Forms/BCSelectField";
// import BCFullScreenModal from "@/components/Shared/BCModal/BCFullScreenModal";
// import { useCreateAdminMutation } from "@/redux/features/admin/adminApi";

// import { Gender, MaritalStatus } from "@/types";
// import { modifyPayload } from "@/utils/modifyPayload";
// import { Button, Grid } from "@mui/material";

// import { FieldValues } from "react-hook-form";
// import { toast } from "sonner";

// type TProps = {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const AdminModal = ({ open, setOpen }: TProps) => {
//   const [createadmin] = useCreateAdminMutation();
//   const handleFormSubmit = async (values: FieldValues) => {
//     // console.log(values);
//     // values.admin.experience = Number(values.admin.experience);
//     // values.admin.apointmentFee = Number(values.admin.apointmentFee);
//     const data = modifyPayload(values);
//     try {
//       const res = await createadmin(data).unwrap();
//       console.log(res);
//       if (res?.id) {
//         toast.success("Admin created successfully!!!");
//         setOpen(false);
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   const defaultValues = {
//     admin: {
//       name:"",
//       email:"",
//       contactNumber: "",
//       address: "",
//       gender:"",
//       maritalStatus:"",
//       qualification:"",
//       profilePhoto: "",
//     },
//     password: "",
//   };

//   return (
//     <BCFullScreenModal open={open} setOpen={setOpen} title="Create New admin">
//       <BCForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
//         <Grid container spacing={2} sx={{ my: 5 }}>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="admin.name"
//               label="Name"
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="admin.email"
//               type="email"
//               label="Email"
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="password"
//               type="password"
//               label="Password"
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="admin.contactNumber"
//               label="Contract Number"
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="admin.address"
//               label="Address"
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <BCSelectField
//               items={Gender}
//               name="admin.gender"
//               label="Gender"
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCInput
//               name="admin.qualification"
//               label="Qualification "
//               fullWidth={true}
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCSelectField
//               items={MaritalStatus}
//               name="admin.maritalStatus"
//               label="MaritalStatus"
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12} md={4}>
//             <BCFileUploader name="file" label="Upload File" />
//           </Grid>
//         </Grid>

//         <Button type="submit">Create</Button>
//       </BCForm>
//     </BCFullScreenModal>
//   );
// };

// export default AdminModal;

import { Box, Button, Container, Grid } from "@mui/material";
import { Gender, MaritalStatus } from "@/types/common";
import { FieldValues } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";

import { toast } from "sonner";
import { useCreateAdminMutation } from "@/redux/features/admin/adminApi";
import BCFullScreenModal from "@/components/Shared/BCModal/BCFullScreenModal";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";
import BCFileUploader from "@/components/Forms/BCFileUploader";
import { modifyPayload } from "@/utils/modifyPayload";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminModal = ({ open, setOpen }: TProps) => {
  const [createAdmin] = useCreateAdminMutation();
  const handleFormSubmit = async (values: FieldValues) => {
  

    const data = modifyPayload(values);
    try {
      const res = await createAdmin(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Admin created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    admin: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",

      gender: "",
      maritalStatus: "",

      qualification: "",

      profilePhoto: "",
    },
    password: "",
  };

  return (
    <BCFullScreenModal open={open} setOpen={setOpen} title="Create New Admin">
      <Container maxWidth="lg">
        <BCForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
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
                required={true}
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
              <BCInput
                name="admin.qualification"
                label="Qualification"
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

         <Box sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
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

export default AdminModal;
