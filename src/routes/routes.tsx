import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import AppLayout from "../components/common/Layout/AppLayout";
import LazyRoute from "./LazyRoute";

// Lazy load all components
const Login = lazy(() => import("../pages/auth/Login"));
const Landing = lazy(() => import("../pages/Landing"));
const CustomerHome = lazy(() => import("../pages/customer/CustomerHome"));
const BookingPage = lazy(() => import("../pages/customer/BookingPage"));
const TripPlanPage = lazy(() => import("../pages/customer/TripPlanPage"));
const CustomerTrips = lazy(() => import("../pages/customer/CustomerTrips"));
const CustomerPayments = lazy(
  () => import("../pages/customer/CustomerPayments")
);
const DriverHome = lazy(() => import("../pages/driver/DriverHome"));
const DriverDashboard = lazy(
  () => import("../components/driver/DriverDashboard")
);
const DriverEarnings = lazy(() => import("../pages/driver/DriverEarnings"));
const DriverWork = lazy(() => import("../pages/driver/DriverWork"));
const OwnerHome = lazy(() => import("../pages/owner/OwnerHome"));
const OwnerDashboard = lazy(() => import("../pages/owner/OwnerDashboard"));
const FleetManagement = lazy(
  () => import("../components/owner/FleetManagement")
);
const AdminHome = lazy(() => import("../pages/admin/AdminHome"));
const AdminDashboard = lazy(() => import("../components/admin/AdminDashboard"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LazyRoute component={Landing} />,
      },
      // Customer Routes
      {
        path: "/customer",
        element: <LazyRoute component={CustomerHome} />,
      },
      {
        path: "/book",
        element: <LazyRoute component={BookingPage} />,
      },
      {
        path: "/plan-trip",
        element: <LazyRoute component={TripPlanPage} />,
      },
      {
        path: "/trips",
        element: <LazyRoute component={CustomerTrips} />,
      },
      {
        path: "/payments",
        element: <LazyRoute component={CustomerPayments} />,
      },
      // Driver Routes
      {
        path: "/driver",
        element: <LazyRoute component={DriverHome} />,
      },
      {
        path: "/driver/dashboard",
        element: <LazyRoute component={DriverDashboard} />,
      },
      {
        path: "/driver/earnings",
        element: <LazyRoute component={DriverEarnings} />,
      },
      {
        path: "/driver/work",
        element: <LazyRoute component={DriverWork} />,
      },
      // Owner Routes
      {
        path: "/owner",
        element: <LazyRoute component={OwnerHome} />,
      },
      {
        path: "/owner/dashboard",
        element: <LazyRoute component={OwnerDashboard} />,
      },
      {
        path: "/owner/fleet",
        element: <LazyRoute component={FleetManagement} />,
      },
      // Admin Routes
      {
        path: "/admin",
        element: <LazyRoute component={AdminHome} />,
      },
      {
        path: "/admin/dashboard",
        element: <LazyRoute component={AdminDashboard} />,
      },
    ],
  },
]);
