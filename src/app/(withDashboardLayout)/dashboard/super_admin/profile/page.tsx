"use client";
import AutoFileUploader from "@/components/Forms/AutoFileUpLoader";
import { useGetMYProfileQuery, useUpdateMYProfileMutation } from "@/redux/api/myProfileApi";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SuperAdminInformation from "./components/SuperAdminInformation";

const SuperAdminProfilePage = () => {
  const { data, isLoading } = useGetMYProfileQuery({});
  const [updateProfile,{isLoading:updating}]=useUpdateMYProfileMutation()
  const handleUploadImage=(file:File)=>{
    const formData= new FormData();
    formData.append('file',file);
    formData.append('data',JSON.stringify({}))
    updateProfile(formData)
  }
  if (isLoading) {
    <p>Loading.....</p>;
  }
  console.log(data);
  return (
    <Container maxWidth='lg'>
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

          {
            updating? <p>Uploading......</p>:(<AutoFileUploader onFileUpload={handleUploadImage} name="file" icon={<CloudUploadIcon/>} label="Choose your photo" />)
          }
        </Grid>
        <Grid xs={12} md={8}>
            <SuperAdminInformation data={data}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuperAdminProfilePage;
