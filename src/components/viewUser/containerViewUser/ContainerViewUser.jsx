import React, { useEffect, useState } from "react";
import "./ContainerViewUser.css";
import LogoProject from "../../logoProject/LogoProject";
import { FavoriteBorder } from "@mui/icons-material";
import { CreditScore } from "@mui/icons-material";
import { ListAlt } from "@mui/icons-material";
import { PersonAddAlt } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";


export function ContainerViewUser({ idUser }) {
  const [user, setUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    const axiosData = async () => {
      axios.get(`http://localhost:8080/api/users/${idUser}`).then((res) => {
        setUser(res);
      });
    };
    axiosData();
  }, [idUser]);

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
      <div>
        <div className="view-user-header">
          <LogoProject />
          <div className="view-user-header-select">
            <NavLink
              className={`view-user-header-select-nav${
                window.location.pathname === `/user/index/${id}` ? "active" : ""
              }`}
              to={`/user/index/${id}`}
            >
              <div className="view-user-header-select-nav-block">
                <Home
                  className={`view-user-header-select-nav-block-icon${
                    window.location.pathname === `/user/index/${id}` ? "active" : ""
                  }`}
                />
                <div className="view-user-header-select-nav-block-title">Trang chủ</div>
              </div>
            </NavLink>
            {/* <NavLink className="view-user-header-select-nav">
              <div className="view-user-header-select-nav-block">
                <FavoriteBorder className="view-user-header-select-nav-block-icon" />
                <div className="view-user-header-select-nav-block-title">Favorites</div>
              </div>
            </NavLink> */}
            {/* <NavLink className="view-user-header-select-nav">
              <div className="view-user-header-select-nav-block">
                <PersonAddAlt className="view-user-header-select-nav-block-icon" />
                <div className="view-user-header-select-nav-block-title">Favorites</div>
              </div>
            </NavLink> */}
            
              <NavLink
                className={`view-user-header-select-nav${
                  window.location.pathname === `/user/cart/${id}` ? "active" : ""
                }`}
                to={`/user/cart/${id}`}
              >
                <div className="view-user-header-select-nav-block">
                  <ListAlt
                    className={`view-user-header-select-nav-block-icon${
                      window.location.pathname === `/user/cart/${id}` ? "active" : ""
                    }`}
                  />
                  <div className="view-user-header-select-nav-block-title">Danh sách hồ sơ</div>
                </div>
              </NavLink>
            {/* <NavLink
              className={`view-user-header-select-nav${
                window.location.pathname === `/user/cart/${id}` ? "active" : ""
              }`}
              to={`/user/cart/${id}`}
            >
              <div className="view-user-header-select-nav-block">
                <ListAlt
                  className={`view-user-header-select-nav-block-icon${
                    window.location.pathname === `/user/cart/${id}` ? "active" : ""
                  }`}
                />
                <div className="view-user-header-select-nav-block-title">Danh sách hồ sơ</div>
              </div>
            </NavLink> */}
            <NavLink
              className={`view-user-header-select-nav${
                window.location.pathname === `/user/contract/${id}` ? "active" : ""
              }`}
              to={`/user/contract/${id}`}
            >
              <div className="view-user-header-select-nav-block">
                <CreditScore
                  className={`view-user-header-select-nav-block-icon${
                    window.location.pathname === `/user/contract/${id}` ? "active" : ""
                  }`}
                />
                <div className="view-user-header-select-nav-block-title">Hợp đồng</div>
              </div>
            </NavLink>
            <div className="view-user-header-select-profile">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar>{user?.data.firstName && user?.data.firstName.charAt(0)}</Avatar>
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
                <NavLink
                  style={{ textDecoration: "none", color: "orangered" }}
                  to={`/user/profile/${idUser}`}
                >
                  <MenuItem>Thông tin cá nhân</MenuItem>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "#212529" }}
                  onClick={handleLogout}
                >
                  <MenuItem>Thoát</MenuItem>
                </NavLink>
              </Menu>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 step-view-user"></div>
        </div>
      </div>
    </>
  );
}
