import React, { useState } from "react";
import "./DescriptionProcess.css";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import { Avatar } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import { SideBarFindJob } from "../sideBarFindJob/SideBarFindJob";

export const DescriptionProcess = () => {
  
  const { id } = useParams();
  const greatStart = (
    <div style={{ paddingTop: "20px" }} className="col-9">
      <h3>Tuyệt vời! Đây là những thứ tiếp theo</h3>
      <div>
        <div className="d-flex" style={{ margin: "30px 0 10px 0" }}>
          <Avatar style={{ backgroundColor: "#3b71aa", width: "50px", height: "50px" }}>
            <CheckIcon />
          </Avatar>
          <div style={{ paddingLeft: "15px" }}>
            <span style={{ fontSize: "20px" }}>Đăng kí tài khoản</span> <br></br>
            <span style={{ fontSize: "13px", color: "blue" }}>Thành công!</span>
          </div>
        </div>
        <div style={{ color: "#b3bac1" }}>
          <div className="d-flex" style={{ margin: "30px 0 10px 0" }}>
            <div
              style={{
                border: "1px solid #b3bac1",
                borderRadius: "40px",
                width: "50px",
                height: "50px",
                textAlign: "center",
                paddingTop: "11px",
              }}
            >
              2
            </div>

            <div style={{ paddingLeft: "15px" }}>
              <span style={{ fontSize: "20px" }}>Xây dựng hồ sơ của bạn</span> <br></br>
              <span style={{ fontSize: "13px" }}>Lịch rảnh, sở thích, thông tin cá nhân</span>
            </div>
          </div>
          <div className="d-flex" style={{ margin: "30px 0 10px 0" }}>
            <div
              style={{
                border: "1px solid #b3bac1",
                borderRadius: "40px",
                width: "50px",
                height: "50px",
                textAlign: "center",
                paddingTop: "11px",
              }}
            >
              3
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <span style={{ fontSize: "20px" }}>Xây dựng giao diện</span> <br></br>
              <span style={{ fontSize: "13px" }}>
              Trả lời một số câu hỏi bắt buộc về an toàn và nhận được huy hiệu an toàn cho hồ sơ của bạn.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: "end", display: "flex", width: "70%", margin: "40px 0" }}>
        <NavLink style={{ textDecoration: "none" }} to={`/assistant/availability/` + id }>
          <div
            style={{
              borderRadius: "20px",
              padding: "10px 20px",
              backgroundColor: "#213f5f",
              cursor: "pointer",
            }}
          >
            <h6 style={{ margin: "0", color: "white" }}>Xây dựng hồ sơ của bạn</h6>
          </div>
        </NavLink>
      </div>
    </div>
  );
  return (
    <NavBarFindJob children={<SideBarFindJob col={"col-2"} value={greatStart} check={false} activeIds={[]} />} />
  );
};
