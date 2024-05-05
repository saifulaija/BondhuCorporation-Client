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
import { useRouter } from "next/navigation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

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
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res?.message);
      }
    } catch (err: any) {
      console.log(err.message);
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
          <Box>
           {
            error && (<Alert severity="error">{error}</Alert>)
           }
          </Box>
          <PHForm
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
          >
            <Grid container spacing={2} my={1}>
              <Grid item md={6}>
                <PHInput
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6}>
                <PHInput
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            <Typography textAlign="end" mb={1} component="p" fontWeight={300}>
              Forgot Password?
            </Typography>
            <Button type="submit" fullWidth sx={{ my: 2 }}>
              Login
            </Button>
            <Typography component="p" fontWeight={300}>
              Do&apos;t have an account?{" "}
              <Link href="/register">Create a new account</Link>
            </Typography>
          </PHForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
