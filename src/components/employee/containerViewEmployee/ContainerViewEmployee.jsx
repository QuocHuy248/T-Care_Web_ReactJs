import React, { useEffect, useState } from "react";
import "./ContainerViewEmployee.css";
import LogoProject from "../../logoProject/LogoProject";
import axios from "axios";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { CreditScore, Home, ListAlt } from "@mui/icons-material";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export function ContainerViewEmployee({ idEmployee }) {
    const [employee, setEmployee] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const { idEmployee } = useParams();
    useEffect(() => {
        const axiosData = async () => {
            axios.get(`http://localhost:8080/api/employees/${idEmployee}`).then((res) => {
                setEmployee(res);
            });
        };
        axiosData();
    }, [idEmployee]);
    console.log(employee);
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
                        {/* <NavLink
              className={`view-user-header-select-nav${
                window.location.pathname === `/employee/index/${idEmployee}` ? "active" : ""
              }`}
              to={`/employee/index/${idEmployee}`}
            >
              <div className="view-user-header-select-nav-block">
                <Home
                  className={`view-user-header-select-nav-block-icon${
                    window.location.pathname === `/employee/index/${idEmployee}` ? "active" : ""
                  }`}
                />
                <div className="view-user-header-select-nav-block-title">Trang chủ</div>
              </div>
            </NavLink> */}
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
                        {/* <NavLink
              className={`view-user-header-select-nav${
                window.location.pathname === `/user/cart/${idEmployee}` ? "active" : ""
              }`}
              to={`/user/cart/${idEmployee}`}
            >
              <div className="view-user-header-select-nav-block">
                <ListAlt
                  className={`view-user-header-select-nav-block-icon${
                    window.location.pathname === `/user/cart/${idEmployee}` ? "active" : ""
                  }`}
                />
                <div className="view-user-header-select-nav-block-title">Danh sách hồ sơ</div>
              </div>
            </NavLink> */}
                        <NavLink
                            className={`view-user-header-select-nav${
                                window.location.pathname === `/employee/contract/${idEmployee}`
                                    ? "active"
                                    : ""
                            }`}
                            to={`/employee/contract/${idEmployee}`}
                        >
                            <div className="view-user-header-select-nav-block">
                                <CreditScore
                                    className={`view-user-header-select-nav-block-icon${
                                        window.location.pathname ===
                                        `/employee/contract/${idEmployee}`
                                            ? "active"
                                            : ""
                                    }`}
                                />
                                <div className="view-user-header-select-nav-block-title">
                                    Hợp đồng
                                </div>
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
                                <Avatar>
                                    {employee?.data.firstName && employee?.data.firstName.charAt(0)}
                                </Avatar>
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
                                    to={`/employee/profile/${idEmployee}`}
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
