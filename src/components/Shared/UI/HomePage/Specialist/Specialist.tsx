import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { TSpecialist } from "./specialist.type";
import Image from "next/image";

const Specialist = async () => {
  const res = await fetch("http://localhost:5000/api/v1/specialties", {
    next: {
      revalidate: 30,
    },
  });

  const { data: specialties } = await res.json();

  return (
    <Container>
      <Box py={5} textAlign="center">
        <Box textAlign="start">
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across Specialties
          </Typography>
          <Typography component="p" fontWeight={300}>
            Experience Doctors Across All Specialist
          </Typography>
        </Box>
        <Stack direction="row" gap={4} justifyContent="space-between" alignItems="center" mt="30px">
          {specialties.slice(0,5).map((specialty: TSpecialist) => (
            <Paper key={specialty.id} elevation={1} sx={{padding:"10px",width:"200px",height:"120px",  borderRadius:"10px",   transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',  '&:hover': {
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Add shadow on hover
                transform: 'scale(1.05)', // Add scale effect on hover
                // Add transition for smooth animation
              }}}>
              <Box sx={{display:"flex", justifyContent:"center" , alignItems:"center"}}>
              <Image src={specialty.icon} width={40} height={40} alt="icon" />
              </Box>
              <Typography variant="h6" fontWeight={400} mt={1}>
                {specialty.title}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Specialist;
