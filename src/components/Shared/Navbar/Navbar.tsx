"use client";


import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import assets from "@/assets";

const Navbar = () => {
  const AuthButton = dynamic(() => import("../UI/AuthButton/AuthButton"), {
    ssr: false,
  });

  return (
   <Box sx={{borderBottom:'1px solid lightgray'}}>
     <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Link href="/">
          <Image src={assets.images.logo} width={100} height={90} alt="logo" />
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
          <Typography component={Link} href="/consultation">
            Dashboard
          </Typography>
        </Stack>
        <AuthButton />
      </Stack>
    </Container>
   </Box>
  );
};

export default Navbar;
