import { Avatar, Badge } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-hospital-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">HealthBag</h1>
          <div className="role-badge">{role}</div>
        </div>
        <div className="menu">
          {menuToBeRendered.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`flex menu-item ${isActive && "active-menu-item"}`}
                key={index}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}

          <div className="menu-divider"></div>

          <div
            className={`flex menu-item logout-item`}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <i className="ri-logout-circle-line"></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>
      <div className="layout">
        <div className="content">
          <div className="header">
            <div className="clinic-title d-none d-md-block">
              HealthBag
            </div>
            <div className="header-right">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
                className="notification-badge"
              >
                <i className="ri-notification-line header-action-icon"></i>
              </Badge>

              <div
                className="user-info"
                onClick={() =>
                  user?.isDoctor && navigate(`/doctor/profile/${user?._id}`) || navigate(`/user/profile/${user?._id}`)
                }
              >
                <Avatar className="user-avatar" size="small">
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <span className="user-name">{user?.name}</span>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
