/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Grid } from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { Gender, MaritalStatus } from "@/types";
import { FieldValues } from "react-hook-form";
import BCFullScreenModal from "@/components/Shared/BCModal/BCFullScreenModal";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";
import BCSelectField from "@/components/Forms/BCSelectField";
import {
  useGetAdminQuery,
  useUpdateAdminMutation,
} from "@/redux/features/admin/adminApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  apointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const SuperAdminUpdateProfileModal = ({ open, setOpen, id }: TProps) => {
  const { data: doctorData, refetch, isSuccess } = useGetAdminQuery(id);



  const [updateDoctor, { isLoading: updating }] = useUpdateAdminMutation();



  const submitHandler = async (values: FieldValues) => {
    console.log({ id });

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    try {
      updateDoctor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BCFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <BCForm
        onSubmit={submitHandler}
        defaultValues={doctorData}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="contactNumber"
              label="Contract Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCInput name="address" label="Address" sx={{ mb: 2 }} fullWidth />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BCSelectField
              items={Gender}
              name="gender"
              label="Gender"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <BCSelectField
              items={MaritalStatus}
              name="maritalStatus"
              label="Marital Status"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <BCInput
              name="qualification"
              label="Qualification"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Save
        </Button>
      </BCForm>
    </BCFullScreenModal>
  );
};

export default SuperAdminUpdateProfileModal;
