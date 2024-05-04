import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Box width="100%" height="auto" display="flex" justifyContent="center" alignItems="center">
      <Image src={assets.images.banner}  objectFit="cover" alt='banner' />
    </Box>
  );
};

export default HeroSection;
