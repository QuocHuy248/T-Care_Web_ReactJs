import React, { useEffect, useState } from "react";
import "./RenderListAssistant.css";
import LogoProject from "../../../logoProject/LogoProject";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { NavLink, useParams } from "react-router-dom";
import { Checkbox, SwipeableDrawer } from "@mui/material";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ButtonForMe } from "../../../ButtonForMe";
import axios from "axios";
import { RenderAss } from "./RenderAss";

export function RenderListAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [filterAss, setFilterAss] = useState();
  const { id } = useParams();
  useEffect(() => {
    let axiosData = async () => {
      const responseFilterAss = await axios.get(
        `http://localhost:8080/api/carts/filter/${id}`
      );
      setFilterAss(responseFilterAss?.data.content);
    };
    axiosData();
  }, []);
  console.log(filterAss);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>
      </div>

      <div className="render-list-assistant">
        <div className="row render-list-assistant-header">
          <div className="col-3"></div>
          <div className="col-6 py-3">
            <h4>Đây là danh sách hồ sơ cá nhân gợi ý dựa vào những thông tin bạn cung cấp</h4>
            <h6>Danh sách yêu thích</h6>
          </div>
          <div className="col-3 p-0">
            <img
              src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703816118/Cloudinary-React/ljezvtifp9u79nfvqtkq.png"
              alt=""
            />
          </div>
        </div>
        <div className="render-list-assistant-body">
          {filterAss != null ? (
            <RenderAss
              listFilterAss={filterAss}
              setChecked={setChecked}
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
              setIsOpen={setIsOpen}
            />
          ) : (
            ""
          )}

          <div className="per-page">
            <div className="per-page-item">
              <div>Xem thêm 5 người hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>

      {isChecked && (
        <div className="check-select">
          <div className="check-select-header">
            <div>
              <h5>You've shortlisted 1 caregiver</h5>
              <span>Add more or continue to evaluate them</span>
            </div>
            <div className="check-select-button">

              <NavLink to="/user/assistant-caption">
                <ButtonForMe value={100} childrenButton={"Tiếp theo"}></ButtonForMe>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="legal-notice-user">
        <LegalNotice />
      </div>
      <SwipeableDrawer
        anchor="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
      >
        <Box
          sx={{ width: "601px" }}
          role="presentation"
          onClick={() => setIsOpen(false)}
          onKeyDown={() => setIsOpen(false)}
        >
          <div className="modal-profile-content"></div>
          <div className="modal-profile-footer">
            <div className="modal-profile-footer-add-list">
              <div className="modal-profile-footer-add-list-check-icon">
                <CheckIcon />
              </div>
              <span>Thêm vào danh sách</span>
            </div>
            <div onClose={() => setIsOpen(false)} className="modal-profile-footer-clear">
              <div className="modal-profile-footer-clear-icon">
                <ClearIcon />
              </div>
              <span>Đóng</span>
            </div>
          </div>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
