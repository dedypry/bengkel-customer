import { Outlet } from "react-router-dom";

import NavbarCustom from "./navbar";
import Footer from "./footer";

import CheckGuard from "@/guard/check-guard";

export default function LadingLayout() {
  return (
    <CheckGuard>
      <NavbarCustom />
      <Outlet />
      <Footer />
    </CheckGuard>
  );
}
