import logoutUser from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button color="warning" onClick={() => handleLogout()}>
          Logout
        </Button>
      ) : (
        <Button color="success" component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
