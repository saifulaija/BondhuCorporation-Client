import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

import Image from "next/image";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";

const Footer = () => {
  return (
    <Box bgcolor="#323b43" py={4}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#fff" component={Link} href="/consultation">
            Health Plans
          </Typography>
          <Typography color="#fff" component={Link} href="/consultation">
            Medicine
          </Typography>
          <Typography color="#fff" component={Link} href="/consultation">
            Diagnostics
          </Typography>
          <Typography color="#fff" component={Link} href="/consultation">
            NGOS
          </Typography>
        </Stack>
        <Stack direction="row" gap={1} py={1} justifyContent="center">
          <Image src={facebookIcon} width={40} height={40} alt="facebook" />
          <Image src={instagramIcon} width={40} height={40} alt="facebook" />
          <Image src={linkedinIcon} width={40} height={40} alt="facebook" />
          <Image src={twitterIcon} width={40} height={40} alt="facebook" />
        </Stack>
        {/* <div className="border-b-[1px] border-dashed text-white"></div> */}
        <Box sx={{border:'1px dashed lightgray'}}></Box>
        <Stack
          direction="row"
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#fff" component={Link} href="/consultation">
            @copy;2024 All Right Reserved TELEMEDICINE
          </Typography>
          <Typography variant="h5" component={Link} href="/" fontWeight={600}>
            TLEME
            <Box component="span" color="primary.main">
              MEDICINE
            </Box>
          </Typography>
          <Typography color="#fff" component={Link} href="/consultation">
            Terms And Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
