
import { DrawerItem, UserRole } from "@/types";


import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SellIcon from '@mui/icons-material/Sell';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonIcon from '@mui/icons-material/Person';

import TryIcon from "@mui/icons-material/Try";
import { USER_ROLE } from "@/constants/role";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const defaultManus=[
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: PersonIcon,
    },
  ]

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Admins",
          path: `${role}/admins`,
          icon: GroupIcon,
        },
        {
          title: "Employees",
          path: `${role}/employees`,
          icon: GroupIcon,
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Orders",
          path: `${role}/orders`,
          icon: BookmarkBorderIcon,
        },
        {
          title: "Sells",
          path: `${role}/sells`,
          icon: LocalMallIcon,
        },
        
        {
          title: "Hr Department",
          path: `${role}/human_resources`,
          icon: GroupAddIcon,
        },
        {
          title: "Mills",
          path: `${role}/mills`,
          icon:  CorporateFareIcon ,
        },
       
      );
      break;

    case USER_ROLE.SELLS_MANAGER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Sells",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Orders",
          path: `${role}/appointment`,
          icon: CalendarMonthIcon,
        }
      );
      break;

   
    default:
      break;
  }

  return [...roleMenus,...defaultManus];
};