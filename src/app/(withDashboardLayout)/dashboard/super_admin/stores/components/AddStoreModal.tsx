import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCModal from "@/components/Shared/BCModal/BCModal";
import { Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddStoreModal = ({ open, setOpen }: TProps) => {
  const handleSubmitForm = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <BCModal open={open} setOpen={setOpen} title="Add sub Store">
      <BCForm onSubmit={handleSubmitForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <BCInput name="name" label="Name" required={true} fullWidth />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <BCInput name="location" label="Location" required={true} fullWidth />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <BCInput name="contactNumber" label="ContactNumber" required={true} fullWidth />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Button type="submit" fullWidth variant="contained">
              Add Now
            </Button>{" "}
          </Grid>
        </Grid>
      </BCForm>
    </BCModal>
  );
};

export default AddStoreModal;
