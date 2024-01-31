import React, { useState } from "react";
import { Button } from "@mui/material";
import './CheckFind.css'
import { NavLink } from "react-router-dom";
export function CheckFind(){
  const [checkFind, setCheckFind] = useState(true);

     return(
        <div className="bodyRender pt-5 " >
        <div className="contentRender ">
          <div className="content ">
            <h3 className="fontContent ">Chăm sóc gia đình chất lượng, với người hỗ trợ đáng tin cậy</h3>
          </div>
          <div className="d-flex mt-5 ">
            <div
              className={`check-${checkFind ? "active" : ""}`}
              onClick={() => setCheckFind(true)}
            >
              <div className="px-4">Tìm người hỗ trợ</div>
            </div>
            <div
              className={`check-${!checkFind ? "active" : ""}`}
              onClick={() => setCheckFind(false)}
            >
              <div className="px-4">Tìm công việc</div>
            </div>
            <NavLink className="w-50 ms-2" to={`${checkFind ? '/user/signin' : '/assistant/sign-in'}`}>
              <Button className="buttonSearch" variant="contained">
                Tìm kiếm
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
     )
}