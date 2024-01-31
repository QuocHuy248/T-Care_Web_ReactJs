import React from "react";
import "./NavBarFindJob.css";
import LogoProject from "../../../logoProject/LogoProject";
import { LegalNotice } from "../../../carehub/LegalNotice";

export function NavBarFindJob( {children}) {
  return (
    <>
      <div className="background-image-assistant-sign-in">
        <div style={{ padding: "5px 25px " }}>
          <LogoProject />
        </div>
        {children}
        
      </div>

      <LegalNotice />
    </>
  );
}
