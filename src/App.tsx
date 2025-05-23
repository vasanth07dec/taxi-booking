import React from "react";
import { ConfigProvider } from "antd";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { antTheme } from "./theme/theme";
import AppLayout from "./components/common/AppLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Lazy load all components
const Login = React.lazy(() => import("./pages/auth/Login"));
const Landing = React.lazy(() => import("./pages/Landing"));
const CustomerHome = React.lazy(() => import("./pages/customer/CustomerHome"));
const BookingPage = React.lazy(() => import("./pages/customer/BookingPage"));
const TripPlanPage = React.lazy(() => import("./pages/customer/TripPlanPage"));
const CustomerTrips = React.lazy(
  () => import("./pages/customer/CustomerTrips")
);
const CustomerPayments = React.lazy(
  () => import("./pages/customer/CustomerPayments")
);
const DriverHome = React.lazy(() => import("./pages/driver/DriverHome"));
const DriverDashboard = React.lazy(
  () => import("./components/driver/DriverDashboard")
);
const DriverEarnings = React.lazy(
  () => import("./pages/driver/DriverEarnings")
);
const DriverWork = React.lazy(() => import("./pages/driver/DriverWork"));
const OwnerHome = React.lazy(() => import("./pages/owner/OwnerHome"));
const OwnerDashboard = React.lazy(() => import("./pages/owner/OwnerDashboard"));
const FleetManagement = React.lazy(
  () => import("./components/owner/FleetManagement")
);
const AdminHome = React.lazy(() => import("./pages/admin/AdminHome"));
const AdminDashboard = React.lazy(
  () => import("./components/admin/AdminDashboard")
);

const router = createBrowserRouter([
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
        element: <Landing />,
      },
      // Customer Routes
      {
        path: "/customer",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/book",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plan-trip",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <TripPlanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/trips",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerTrips />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payments",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerPayments />
          </ProtectedRoute>
        ),
      },
      // Driver Routes
      {
        path: "/driver",
        element: (
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/driver/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/driver/earnings",
        element: (
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverEarnings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/driver/work",
        element: (
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverWork />
          </ProtectedRoute>
        ),
      },
      // Owner Routes
      {
        path: "/owner",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/owner/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/owner/fleet",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <FleetManagement />
          </ProtectedRoute>
        ),
      },
      // Admin Routes
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antTheme}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
