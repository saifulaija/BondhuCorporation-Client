"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";



import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import BCForm from "@/components/Forms/BCForm";
import BCInput from "@/components/Forms/BCInput";

const validationSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const defaultValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [error, setError] = useState('');



  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      console.log(res,'error-------------')
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        // router.push("/dashboard");
      } else {
        setError(res?.message || 'An unknown error occurred');
      }
    } catch (err: any) {
      console.log(err.message);
      setError(err.message)
    }
  };
  return (
    <Container>
      <Stack
        sx={{ justifyContent: "center", alignItems: "center", height: "80vh" }}
        spacing={8}
        gap={2}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            spacing={2}
          >
           <Box>
              <Image
                src={assets.images.logo}
                width={100}
                height={90}
                alt="logo"
              />
            </Box>
            <Typography variant="h5" fontWeight={600}>
              Login To Bondhu Corporation
            </Typography>
          </Stack>
        
           {
            error && (<Alert severity="error">{error}</Alert>)
           }
         
          <BCForm
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
          >
            <Grid container spacing={2} my={1}>
              <Grid item xs={12} md={6}>
                <BCInput
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BCInput
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            <Link href='/forgot-password'>
            <Typography textAlign="end" mb={1} component="p" fontWeight={300} sx={{
              textDecoration:'underline'
            }}>
              Forgot Password?
            </Typography>
            </Link>
            <Button type="submit" fullWidth sx={{ my: 2 }}>
              Login
            </Button>
            <Typography component="p" fontWeight={300}>
              Do&apos;t have an account?{" "}
              <Link href="/register">Create a new account</Link>
            </Typography>
          </BCForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
