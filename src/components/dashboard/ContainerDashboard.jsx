import React, { useEffect, useState } from "react";
import LogoProject from "./../logoProject/LogoProject";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { CreditScore, Home, ListAlt } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { width } from "@mui/system";
import "./ContainerDashboard.css";
import axios from "axios";
import LoadingCommon from "../common/LoadingCommon";
import { logRoles } from "@testing-library/react";

export function ContainerDashboard() {
  const { idAdmin } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="container-dashboard-header">
        <div>
          <LogoProject />
        </div>
        <div className="container-dashboard-header-avatar">
          <div></div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703663658/Cloudinary-React/tgcftar2wucd8wgbixin.jpg"
              ></Avatar>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <NavLink className="container-dashboard-header-name-admin">
                <MenuItem>Anh Tuấn</MenuItem>
              </NavLink>
              <NavLink
                className="container-dashboard-header-logout"
                to={"/home"}
                onClick={handleLogout}
              >
                <MenuItem>Thoát</MenuItem>
              </NavLink>
            </Menu>
          </div>
        </div>
      </div>
      <div className="container-dashboard-separation"></div>
      <div className="container-dashboard-select-page">
        <NavLink
          className={`container-dashboard-select-page-nav-link${
            window.location.pathname === `/admin/home/${idAdmin}` ? "active" : ""
          }`}
          to={`/admin/home/${idAdmin}`}
        >
          <div
            className={`container-dashboard-select-page-nav-link-div${
              window.location.pathname === `/admin/home/${idAdmin}` ? "active" : ""
            }`}
          >
            <HomeIcon /> Trang chủ
          </div>
        </NavLink>
        <NavLink
          className={`container-dashboard-select-page-nav-link${
            window.location.pathname === `/admin/statistics/${idAdmin}` ? "active" : ""
          }`}
          to={`/admin/statistics/${idAdmin}`}
        >
          <div
            className={`container-dashboard-select-page-nav-link-div${
              window.location.pathname === `/admin/statistics/${idAdmin}` ? "active" : ""
            }`}
          >
            <QueryStatsIcon /> Thống kê
          </div>
        </NavLink>
        <NavLink
          className={`container-dashboard-select-page-nav-link${
            window.location.pathname === `/admin/assistant/${idAdmin}` ? "active" : ""
          }`}
          to={`/admin/assistant/${idAdmin}`}
        >
          <div
            className={`container-dashboard-select-page-nav-link-div${
              window.location.pathname === `/admin/assistant/${idAdmin}` ? "active" : ""
            }`}
          >
            <AssignmentIndIcon /> Hộ lý
          </div>
        </NavLink>
      </div>
      <div className="container-dashboard-separation-2"></div>
    </>
  );
}
