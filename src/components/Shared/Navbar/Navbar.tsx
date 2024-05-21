"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

import assets from "@/assets";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import logoutUser from "@/services/actions/logoutUser";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";

const Navbar = () => {
  const userInfo = getUserInfo();

  const user = isLoggedIn();
  console.log(user, "userinfo");

  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <Box sx={{ borderBottom: "1px solid lightgray", background: "#F4F7FE" }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Link href="/">
            <Image
              src={assets.images.logo}
              width={100}
              height={90}
              alt="logo"
            />
          </Link>
          <Stack direction="row" gap={4} justifyContent="space-between">
            <Typography component={Link} href="/consultation">
              Home
            </Typography>
            <Typography component={Link} href="/consultation">
              Products
            </Typography>
            <Typography component={Link} href="/consultation">
              Sells
            </Typography>
            <Typography component={Link} href="/consultation">
              About Us
            </Typography>
            <Typography component={Link} href="/consultation">
              Contact Us
            </Typography>
            {userInfo?.role!== "subscriber" && (
              <Typography component={Link} href="/dashboard">
                Dashboard
              </Typography>
            )}
          </Stack>

          {isLoggedIn() ? (
            <Button color="warning" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
