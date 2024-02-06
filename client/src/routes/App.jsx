import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactLoader from "../components/loader";
import * as ROUTES from "../constants/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserProvider } from "../context/user";

const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/sign-up"));
const Home = lazy(() => import("../pages/home"));
const NotFound = lazy(() => import("../pages/not-found"));
const Dashboard = lazy(() => import("../pages/dashboard"));

export default function App() {
  const userToken = localStorage.getItem("authToken");

  return (
    <Router>
      <Suspense fallback={<ReactLoader />}>
        <UserProvider>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route
              path={ROUTES.HOME}
              element={
                <ProtectedRoute userToken={userToken}>
                  <Route index element={<Home />} />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </Suspense>
    </Router>
  );
}
