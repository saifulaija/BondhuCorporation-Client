import { authKey } from "@/constants/authKey";
import { jwtDecode } from "jwt-decode";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = jwtDecode(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};



export const  isLoggedIn=()=>{
    const authToken = getFromLocalStorage(authKey);
    if(authToken){
        return !!authToken
    }
}


export const removeUser=()=>{
    return removeFromLocalStorage(authKey)
}

