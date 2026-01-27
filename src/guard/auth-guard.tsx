import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useAppSelector } from "@/stores/hooks";
import { IChild } from "@/utils/interfaces/global";

export default function AuthGuard({ children }: IChild) {
  const { token } = useAppSelector((state) => state.auth);

  const accessToken = token || Cookies.get("token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
