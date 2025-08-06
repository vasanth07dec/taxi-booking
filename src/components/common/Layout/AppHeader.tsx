import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown, Avatar, Badge, Drawer } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CarTaxiFront as Taxi,
  User,
  Bell,
  LogOut,
  Settings,
  Home,
  Clock,
  CreditCard,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/slices/authSlice";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getNavItems = () => {
    const items = [{ key: "/", label: "Home", icon: <Home size={18} /> }];

    if (user?.role === "customer") {
      items.push(
        { key: "/book", label: "Book a Ride", icon: <Taxi size={18} /> },
        { key: "/trips", label: "My Trips", icon: <Clock size={18} /> },
        { key: "/payments", label: "Payments", icon: <CreditCard size={18} /> }
      );
    } else if (user?.role === "driver") {
      items.push(
        { key: "/dashboard", label: "Dashboard", icon: <Taxi size={18} /> },
        { key: "/earnings", label: "Earnings", icon: <CreditCard size={18} /> }
      );
    } else if (user?.role === "owner" || user?.role === "admin") {
      items.push(
        { key: "/dashboard", label: "Dashboard", icon: <Taxi size={18} /> },
        { key: "/fleet", label: "Fleet", icon: <Taxi size={18} /> },
        { key: "/reports", label: "Reports", icon: <CreditCard size={18} /> }
      );
    }

    return items;
  };

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <User size={16} />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings size={16} />,
      onClick: () => navigate("/settings"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      onClick: handleLogout,
    },
  ];

  const renderMobileMenu = () => (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Taxi className="text-primary-500 mr-2" size={24} />
            <span className="text-lg font-bold">TaxiGo</span>
          </div>
          <Button
            type="text"
            icon={<X size={24} />}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      }
      placement="left"
      onClose={() => setMobileMenuOpen(false)}
      open={mobileMenuOpen}
      width={280}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {user && (
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center">
                <Avatar src={user.avatar} size={48} className="bg-primary-500">
                  {user.name.charAt(0)}
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-neutral-500 capitalize">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={getNavItems().map((item) => ({
              key: item.key,
              label: <Link to={item.key}>{item.label}</Link>,
              icon: item.icon,
            }))}
            className="border-0 bg-transparent"
          />
        </div>

        {user && (
          <div className="border-t pt-4">
            <Menu
              mode="inline"
              items={userMenuItems}
              className="border-0 bg-transparent"
            />
          </div>
        )}
      </div>
    </Drawer>
  );

  return (
    <Header className="bg-white shadow-sm px-6 flex items-center justify-between h-16 sticky top-0 z-50">
      <div className="flex items-center">
        <Button
          type="text"
          icon={<MenuIcon size={24} />}
          onClick={() => setMobileMenuOpen(true)}
          className="mr-4 lg:hidden"
        />

        <Link to="/" className="flex items-center mr-8">
          <Taxi className="text-primary-500 mr-2" size={28} />
          <span className="text-xl font-bold">TaxiGo</span>
        </Link>

        {user && (
          <div className="hidden lg:block">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={getNavItems().map((item) => ({
                key: item.key,
                label: <Link to={item.key}>{item.label}</Link>,
                icon: item.icon,
              }))}
              className="border-0"
            />
          </div>
        )}
      </div>

      {user ? (
        <div className="flex items-center">
          <Badge count={3} className="mr-4">
            <Button
              type="text"
              icon={<Bell size={20} />}
              className="flex items-center justify-center"
            />
          </Badge>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center cursor-pointer">
              <Avatar src={user.avatar} className="bg-primary-500">
                {user.name.charAt(0)}
              </Avatar>
              <span className="ml-2 font-medium hidden md:inline-block">
                {user.name}
              </span>
            </div>
          </Dropdown>
        </div>
      ) : (
        <div>
          <Button
            type="text"
            onClick={() => navigate("/login")}
            className="mr-2"
          >
            Login
          </Button>
          <Button type="primary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      )}

      {renderMobileMenu()}
    </Header>
  );
};

export default AppHeader;
