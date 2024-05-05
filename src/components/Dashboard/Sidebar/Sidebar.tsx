import { Box, List, Stack } from "@mui/material";

import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.services";

const Sidebar = () => {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const {role}=getUserInfo() as any;
    setUserRole(role)
    
  }, [])

  return (
    <Box>
      <Stack
        sx={{ py: 1, mt: 1 }}
        component={Link}
        href="/"
        direction="row"
        alignItems="start"
        justifyContent="center"
        gap={1}
      >
        <Image src={assets.images.logo} width={100} height={60} alt="logo" />
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} index={index} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
