"use client";
import AutoFileUploader from "@/components/Forms/AutoFileUpLoader";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfileApi";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SuperAdminInformation from "./components/SuperAdminInformation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import SuperAdminUpdateProfileModal from "./components/SuperAdminUpdateProfileModal";

const SuperAdminProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMYProfileQuery({});
  console.log(data)
  const [updateProfile, { isLoading: updating }] = useUpdateMYProfileMutation();
  const handleUploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    updateProfile(formData);
  };
  if (isLoading) {
    <p>Loading.....</p>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} mt={2}>
        <Grid xs={12} md={4}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <Image
              src={data?.profilePhoto}
              height={300}
              width={400}
              alt="image"
            />
          </Box>

          <Box my={2}>
            {updating ? (
              <p>Uploading......</p>
            ) : (
              <AutoFileUploader
                onFileUpload={handleUploadImage}
                name="file"
                variant="text"
                icon={<CloudUploadIcon />}
                label="Choose your photo"
              />
            )}
          </Box>

          <Button
            fullWidth
            endIcon={<ModeEditIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
          <SuperAdminUpdateProfileModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.id}/>
        </Grid>
        <Grid xs={12} md={8}>
          <SuperAdminInformation data={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuperAdminProfilePage;
