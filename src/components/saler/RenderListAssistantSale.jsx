import React, { useEffect, useState } from "react";
import "./renderListAssistantSale.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Checkbox, SwipeableDrawer } from "@mui/material";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { RenderAssSale } from "./RenderAssSale";
import LogoProject from "../logoProject/LogoProject";
import { LegalNotice } from "../carehub/LegalNotice";
import { ButtonForMe } from "../ButtonForMe";
import Swal from "sweetalert2";
import LoadingCommon from "../common/LoadingCommon";

export function RenderListAssistantSale() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [filterAss, setFilterAss] = useState();
  const { id } = useParams();
  const { idSale } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  console.log(filterAss);
  let navigate = useNavigate();
  useEffect(() => {
    let axiosData = async () => {
      const responseFilterAss = await axios.get(
        `http://localhost:8080/api/carts/filter/${id}` 
      ).then(setIsLoading(false))
      console.log(responseFilterAss?.data);
      setFilterAss(responseFilterAss?.data.content);
    };
    axiosData();
  }, []);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
 
  if (isLoading) {
    return <LoadingCommon />;
  }
  const handleClick = (assistantId) => {
    Swal.fire({
      title: 'Liên hệ với nhân viên thành công',
      confirmButtonText: "OK"
    }).then(() => {
      let cart = {
        cartId : id,
        employeeId : assistantId
      }
      axios.put(`http://localhost:8080/api/carts/employees`, cart).then(() => {
        setIsLoading(true)
        setTimeout(() => {
          navigate(`/sale/${idSale}`);
        }, 1000);
      });
      
      
    });
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
            <RenderAssSale
              listFilterAss={filterAss}
              setChecked={setChecked}
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
              setIsOpen={setIsOpen}
              handleClick= {handleClick}
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
          <div className="modal-profile-content">aaaaa</div>
          <div className="modal-profile-footer">
            <div className="modal-profile-footer-add-list">
              <div className="modal-profile-footer-add-list-check-icon">
                <CheckIcon />
              </div>
              <span>Add to list</span>
            </div>
            <div onClose={() => setIsOpen(false)} className="modal-profile-footer-clear">
              <div className="modal-profile-footer-clear-icon">
                <ClearIcon />
              </div>
              <span>Close</span>
            </div>
          </div>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
