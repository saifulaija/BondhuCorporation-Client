"use client";
import React from "react";
import { useGetSingleSubStoreQuery, useUpdateSubStoreMutation } from "@/redux/features/store/storeApi";
import { Button, Container, Grid, Typography } from "@mui/material";
import CustomLoader from "@/components/Shared/UI/CustomLoader/CustomLoader";
import { FieldValues } from "react-hook-form";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TParams = {
  params: {
    storeId: string;
  };
};

const UpdateSubStorePage = ({ params }: TParams) => {
    const router = useRouter()
  const id = params.storeId;
  const { data, isLoading } = useGetSingleSubStoreQuery(id);
  const [updateSubStore,{isLoading:updating}]=useUpdateSubStoreMutation();
  console.log(data);
  const handleUpdateSubStore = async (values: FieldValues) => {
    const data={
        id,
        body:values
    }
    try {
        const res=await updateSubStore(data).unwrap()
       if(res?.id){
        toast.success('Sub store updated successfully!!!')
        router.push('/dashboard/super_admin/stores')
       }
    } catch (err:any) {
       toast.error(err?.message) 
    }
  
  };

  const defaultValues = {
    name: data?.name || "",
    location: data?.location || "",
    contactNumber: data?.contactNumber || "",
  };
  return (
    <Container maxWidth="md">
      <Typography
        variant="h6"
        sx={{ my: 3, fontWeight: 300, textTransform: "capitalize" }}
      >
        Update Store
      </Typography>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <BCForm onSubmit={handleUpdateSubStore} defaultValues={defaultValues}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BCInput name="name" label="Name" required={true} fullWidth />
            </Grid>
            <Grid item xs={12}>
            
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
                {updating ? "Updating......" : "Update Now"}
              </Button>
            </Grid>
          </Grid>
        </BCForm>
      )}
    </Container>
  );
};

export default UpdateSubStorePage;
