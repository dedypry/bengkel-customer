import { useEffect } from "react";
import Cookies from "js-cookie";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProfile } from "@/stores/features/auth/auth-action";
import { IChild } from "@/utils/interfaces/global";

export default function CheckGuard({ children }: IChild) {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const accessToken = token || Cookies.get("token");

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile());
    }
  }, [accessToken]);

  return children;
}
