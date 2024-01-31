import React, { useState } from "react";
import "./SignInSelect.css";
import LogoProject from "../../../logoProject/LogoProject";
import { CheckLogInSignIn } from "../checkLogInSignIn/CheckLogInSignIn";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { NavLink } from "react-router-dom";
import { FrameLoginSignIn } from "../frameLoginSignIn/FrameLoginSignIn";

export function SignInSelect({}) {
  const signInSelect = (
    <>
      <div className="select-category">
        <CheckLogInSignIn value={"signIn"} />
      </div>
      <div className="container-sign-in">
        <h5 className="sign-in-title"> Đưa ra một lựa chọn.</h5>
        <div className="sign-in-select">
          <div className="find-care">
            <img
              src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703859018/Cloudinary-React/br2chgppnqhqxbz1mojt.png"
              alt=""
            />
            <h5>Tôi cần người hỗ trợ</h5>
            <span>Bắt đầu tìm kiếm sự chăm sóc xung quanh bạn.</span>
            <NavLink to={"/sign-in/find-care"} className="nav-link-select">
              <div className="find-care-title">
                <span>Tìm người hỗ trợ</span>
              </div>
            </NavLink>
          </div>
          <div className="find-jobs">
            <img
              src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703859013/Cloudinary-React/mzyueuz5ouilpslba9zv.png"
              alt=""
            />
            <h5>Tôi cần kiếm công việc</h5>
            <span>Tạo hồ sơ cá nhân và tìm kiếm công việc</span>
            <NavLink to={"/assistant/sign-in"} className="nav-link-select">
              <div className="find-jobs-title">
                <span>Tìm kiếm công việc</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
  return <FrameLoginSignIn children={signInSelect} />;
}
