import { Route, Routes } from "react-router-dom";

import LadingLayout from "./layouts/landing";
import MemberLogin from "./pages/member/auth/login";
import MemberRegister from "./pages/member/auth/register";

import LandingPage from "@/pages/landings/home/index";

function App() {
  return (
    <Routes>
      <Route element={<LadingLayout />}>
        <Route element={<LandingPage />} path="/" />
      </Route>
      <Route element={<MemberLogin />} path="/login" />
      <Route element={<MemberRegister />} path="/register" />
    </Routes>
  );
}

export default App;
