import { Outlet } from "react-router-dom";

import NavbarCustom from "./navbar";
import Footer from "./footer";

export default function LadingLayout() {
  return (
    <>
      <NavbarCustom />
      <Outlet />
      <Footer />
    </>
  );
}
