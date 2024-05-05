
import { DrawerItem, UserRole } from "@/types";


import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";

import TryIcon from "@mui/icons-material/Try";
import { USER_ROLE } from "@/constants/role";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
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
          icon: TryIcon,
        },
        {
          title: "Sells",
          path: `${role}/sells`,
          icon: MedicalInformationIcon,
        },
        {
          title: "Mills",
          path: `${role}/mills`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Hr Department",
          path: `${role}/human_resources`,
          icon: CalendarMonthIcon,
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

  return [...roleMenus];
};