import React, { useState } from "react";
import LogoProject from "../../../logoProject/LogoProject";

import "./UserSignIn.css";

import { FormSignIn } from "../../formSignIn/FormSignIn";
import { LegalNotice } from "../../../carehub/LegalNotice";
import UserServiceAPI from "../../../../service/userServiceAPI";

export function UserSignIn() {
  
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>
        <div className="row">
          <div className="col-2 bg-h3"></div>
        </div>
      </div>
      <div className="m5-0">
        <FormSignIn url={"/user/address"} loginUser={true} checkRole={"ROLE_USER"} api ={UserServiceAPI.signInUser} />
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
