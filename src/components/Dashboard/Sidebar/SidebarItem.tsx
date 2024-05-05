import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  
  import { DrawerItem } from "@/types";
  

  
  import Link from "next/link";
import { usePathname } from "next/navigation";
  
  type TProps = {
    item: DrawerItem;
    index: number;
  };
  const SidebarItem = ({ item, index }: TProps) => {
    const linkPath=`/dashboard/${item.path}`;
 const pathName=usePathname();

    return (
      <Link href={linkPath}>
        <ListItem disablePadding sx={{
            ...(pathName===linkPath ? {borderRight:"3px solid #da5a47","& svg":{color:"#da5a47"}}:{})
        }}>
          <ListItemButton>
            <ListItemIcon>
            {item.icon && <item.icon/>}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };
  
  export default SidebarItem;
  