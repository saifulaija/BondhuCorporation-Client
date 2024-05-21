"use client";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCModal from "@/components/Shared/BCModal/BCModal";
import { useGetAllMainStoreQuery } from "@/redux/features/mainStore/mainStoreApi";
import { useCreateSubStoreMutation } from "@/redux/features/store/storeApi";
import { Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddStoreModal = ({ open, setOpen }: TProps) => {
  const {
    data: mainStoreData,
    isFetching: isMainStoreLoading,
    isError: isMainStoreError,
  } = useGetAllMainStoreQuery({});

  const [createSubStore, { isLoading }] = useCreateSubStoreMutation();
  const defaultValues = {
    name: "",
    location: "",
    contactNumber: "",
  };
  const handleSubmitForm = async (values: FieldValues) => {
    try {
      const res = await createSubStore({
        ...values,
        mainStoreId: mainStoreData[0].id,
      }).unwrap();
      if (res?.id) {
        toast.success("Sub store updated successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
    console.log(values);
  };

  return (
    <BCModal open={open} setOpen={setOpen} title="Add sub Store">
      <BCForm onSubmit={handleSubmitForm} defaultValues={defaultValues}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <BCInput name="name" label="Name" required={true} fullWidth />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <BCInput
              name="location"
              label="Location"
              required={true}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <BCInput
              name="contactNumber"
              label="ContactNumber"
              required={true}
              fullWidth
            />
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
