import { USER_ROLE } from "@/constants/role";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";


export type TMeta={
    page:number;
    limit:number;
    total:number;
}

export interface DrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
    child?: DrawerItem[];
  }

export type UserRole= keyof typeof  USER_ROLE