import { Box, Stack, styled, Typography } from '@mui/material';




const StyledInformationBox = styled(Box)(({ theme }) => ({
    background: '#f4f7fe',
    borderRadius: theme.spacing(1),
    width: '45%',
    padding: '8px 16px',
    '& p': {
      fontWeight: 600,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }));

const SuperAdminInformation = ({ data }: any) => {
   return (
      <>
         <Typography variant='h6' color='primary.main' mb={2} textAlign={'center'} textTransform='uppercase'>
            Personal Information
         </Typography>

         <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={2}
            flexWrap={'wrap'}
         >
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Role
               </Typography>
               <Typography>{data?.role}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Name
               </Typography>
               <Typography>{data?.name}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Email
               </Typography>
               <Typography>{data?.email}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Gender
               </Typography>
               <Typography>{data?.gender}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  MaritalStatus
               </Typography>
               <Typography>{data?.maritalStatus}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Address
               </Typography>
               <Typography>{data?.address}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Contact Number
               </Typography>
               <Typography>{data?.contactNumber}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Qualification
               </Typography>
               <Typography>{data?.qualification}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Status
               </Typography>
               <Typography>{data?.status}</Typography>
            </StyledInformationBox>
         </Stack>

        
      </>
   );
};

export default SuperAdminInformation ;