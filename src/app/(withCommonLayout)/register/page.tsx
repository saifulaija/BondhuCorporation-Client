"use client";
import {
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
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSubscriber } from "@/services/actions/registerSubscriber";

export const subscriberValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter your valid email address"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number"),
  address: z.string().min(1, "Please enter your address"),
});

const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  subscriber: subscriberValidationSchema,
});

export const defaultValues = {
  password: "",
  subscriber: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerSubscriber(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.subscriber.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/dashboard");
        }
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
              Register Here
            </Typography>
          </Stack>
          <PHForm
            onSubmit={handleRegister}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
          >
            <Grid container spacing={2} my={1}>
              <Grid item md={12}>
                <PHInput label="Name" fullWidth={true} name="subscriber.name" />
              </Grid>
              <Grid item md={6}>
                <PHInput
                  label="Email"
                  type="email"
                  fullWidth={true}
                  name="subscriber.email"
                />
              </Grid>
              <Grid item md={6}>
                <PHInput
                  label="Password"
                  type="password"
                  fullWidth={true}
                  name="password"
                />
              </Grid>
              <Grid item md={6}>
                <PHInput
                  label="ContactNumber"
                  type="tel"
                  fullWidth={true}
                  name="subscriber.contactNumber"
                />
              </Grid>
              <Grid item md={6}>
                <PHInput
                  label="Address"
                  type="text"
                  fullWidth={true}
                  name="subscriber.address"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth sx={{ my: 2 }}>
              Register
            </Button>
            <Typography component="p" fontWeight={300}>
              Do you have an account? <Link href="/login">Login</Link>
            </Typography>
          </PHForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
