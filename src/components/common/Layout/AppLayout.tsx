import React, { useState } from "react";
import { Layout, Menu, ConfigProvider, Button, Avatar } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  CarTaxiFront as Taxi,
  Clock,
  CreditCard,
  Calendar,
  BarChart3,
  Users,
  Settings,
  Car,
  DollarSign,
  Briefcase,
  ClipboardList,
  UserCog,
  Building2,
  LogOut,
} from "lucide-react";
import { antTheme } from "../../../theme/theme";
import { Header } from "antd/es/layout/layout";

const { Content, Sider, Footer } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const getMenuItems = () => {
    if (!user) return [];

    const menuItems = [];

    switch (user.role) {
      case "customer":
        menuItems.push(
          { key: "/book", icon: <Taxi size={18} />, label: "Book a Ride" },
          {
            key: "/plan-trip",
            icon: <Calendar size={18} />,
            label: "Plan Trip",
          },
          { key: "/trips", icon: <Clock size={18} />, label: "My Trips" },
          {
            key: "/payments",
            icon: <CreditCard size={18} />,
            label: "Payments",
          }
        );
        break;

      case "driver":
        menuItems.push(
          {
            key: "/driver/dashboard",
            icon: <BarChart3 size={18} />,
            label: "Dashboard",
          },
          { key: "/driver/work", icon: <Briefcase size={18} />, label: "Work" },
          {
            key: "/driver/earnings",
            icon: <DollarSign size={18} />,
            label: "Earnings",
          }
        );
        break;

      case "owner":
        menuItems.push(
          {
            key: "/owner/dashboard",
            icon: <BarChart3 size={18} />,
            label: "Dashboard",
          },
          {
            key: "/owner/fleet",
            icon: <Car size={18} />,
            label: "Fleet Management",
          },
          {
            key: "/owner/drivers",
            icon: <Users size={18} />,
            label: "Manage Drivers",
          },
          {
            key: "/owner/rent",
            icon: <CreditCard size={18} />,
            label: "Rent Cars",
          },
          {
            key: "/owner/reports",
            icon: <ClipboardList size={18} />,
            label: "Reports",
          }
        );
        break;

      case "admin":
        menuItems.push(
          {
            key: "/admin/dashboard",
            icon: <BarChart3 size={18} />,
            label: "Dashboard",
          },
          {
            key: "/admin/fleet",
            icon: <Car size={18} />,
            label: "Fleet Management",
          },
          {
            key: "/admin/users",
            icon: <Users size={18} />,
            label: "Manage Users",
          },
          {
            key: "/admin/owners",
            icon: <Building2 size={18} />,
            label: "Manage Owners",
          },
          {
            key: "/admin/drivers",
            icon: <UserCog size={18} />,
            label: "Manage Drivers",
          },
          {
            key: "/admin/reports",
            icon: <ClipboardList size={18} />,
            label: "Reports",
          }
        );
        break;
    }

    return menuItems;
  };

  return (
    <ConfigProvider theme={antTheme}>
      <Layout className="min-h-screen">
        {user && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="bg-white border-r shadow-sm fixed h-screen top-0 left-0  "
            width={260}
          >
            <div className="p-4 flex items-center">
              <Taxi className="text-primary-500" size={collapsed ? 24 : 32} />
              {!collapsed && (
                <span className="ml-3 text-xl font-bold">TaxiGo</span>
              )}
            </div>

            {/* User Profile Section */}
            <div
              className={`px-4 py-3 border-b ${collapsed ? "text-center" : ""}`}
            >
              <div className="flex items-center">
                <Avatar
                  size={collapsed ? 32 : 40}
                  src={user.avatar}
                  className="bg-primary-500"
                >
                  {user.name.charAt(0)}
                </Avatar>
                {!collapsed && (
                  <div className="ml-3">
                    <div className="font-medium truncate">{user.name}</div>
                    <div className="text-xs text-neutral-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={getMenuItems().map((item) => ({
                key: item.key,
                icon: item.icon,
                label: <Link to={item.key}>{item.label}</Link>,
              }))}
              className="border-0 mt-2"
            />

            {!collapsed && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <Button
                  icon={<Settings size={16} />}
                  type="text"
                  block
                  className="text-left"
                >
                  Settings
                </Button>
              </div>
            )}
          </Sider>
        )}

        <Layout>
          <Content
            className={` bg-neutral-50 min-h-screen transition-all ${
              collapsed ? "ml-[80px]" : "ml-[260px]"
            }`}
          >
            <Header
              className=" bg-neutral-100 "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <Link
                to="/signup"
                className="space-x-2 self-end flex items-center cursor-pointer duration-300 hover:text-red-400"
              >
                <h1>Logout</h1>
                <LogOut className="text-xl" />
              </Link>
            </Header>
            <div className="max-w-screen-2xl mx-auto p-6">
              <Outlet />
            </div>
          </Content>
          <Footer className="text-center bg-white border-t">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-8">
                <div>
                  <h3 className="font-bold mb-4">About TaxiGo</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Press
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Support</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Safety
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Legal</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary-500">
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-neutral-600 border-t pt-8">
                TaxiGo &copy; {new Date().getFullYear()} - All rights reserved
              </div>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
