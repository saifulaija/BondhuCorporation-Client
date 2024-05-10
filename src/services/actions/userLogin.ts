import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";



export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-store",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  const userData= jwtDecode(userInfo?.data?.accessToken) as any
  const role = userData?.role ;


  const passwordChangedRequired = userInfo?.data?.needPasswordChange;

if(userInfo?.data?.accessToken){
 setAccessToken(userInfo?.data?.accessToken,{
  redirect:'/dashboard',
  role,
  passwordChangedRequired
 })
}

  return userInfo;
};
