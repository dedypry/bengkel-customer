import { Route, Routes } from "react-router-dom";

import LadingLayout from "./layouts/landing";
import MemberLogin from "./pages/member/auth/login";
import MemberRegister from "./pages/member/auth/register";
import PhoneLogin from "./pages/member/auth/phone";
import DashboardPage from "./pages/member/dasboard";
import LayoutDashboard from "./layouts/dashboard/layout-dashboard";
import NotFoundPage from "./pages/errors/404";
import MemberServicePage from "./pages/member/service";
import MemberProfilePage from "./pages/member/profile";
import MemberHistoryPage from "./pages/member/history";
import ForgotPassword from "./pages/member/auth/forgot-password";
import ResetPassword from "./pages/member/auth/reset-password";

import LandingPage from "@/pages/landings/home/index";

function App() {
  return (
    <Routes>
      <Route element={<MemberLogin />} path="/login" />
      <Route element={<PhoneLogin />} path="/login/phone" />
      <Route element={<MemberRegister />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<ResetPassword />} path="/reset-password" />

      <Route element={<LadingLayout />}>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LayoutDashboard />}>
          <Route element={<DashboardPage />} path="/dashboard" />
          <Route path="/customer">
            <Route element={<MemberServicePage />} path="service" />
            <Route element={<MemberProfilePage />} path="profile" />
            <Route element={<MemberHistoryPage />} path="history" />
          </Route>
        </Route>
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
