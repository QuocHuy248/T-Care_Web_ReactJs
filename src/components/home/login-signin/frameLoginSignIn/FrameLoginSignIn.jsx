import React from "react";
import "./FrameLoginSignIn.css";
import { LegalNotice } from "../../../carehub/LegalNotice";
import LogoProject from "../../../logoProject/LogoProject";
import { ButtonForMe } from "./../../../ButtonForMe";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export function FrameLoginSignIn({ children }) {
  return (
    <>
      <div>
        <div className="container-frame-login-sign-in">
          <LogoProject />
          
          <div id="logInHome">
            <NavLink className="navlink-no-underline" to="/home">
              <Button className="buttonLogin" variant="contained">
                Trang chủ
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="step-frame-login-sign-in"></div>
      </div>
      {children}

      <LegalNotice />
    </>
  );
}
