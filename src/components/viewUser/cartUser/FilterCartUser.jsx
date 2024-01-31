import React, { useEffect, useState } from "react";
import "../../home/wordFindCare/renderListAssistant/RenderListAssistant.css";
import LogoProject from "../../logoProject/LogoProject";
import { LegalNotice } from "../../carehub/LegalNotice";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {  SwipeableDrawer } from "@mui/material";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ButtonForMe } from "../../ButtonForMe";
import axios from "axios";
import { RenderAss } from "../../home/wordFindCare/renderListAssistant/RenderAss";
import { toast } from "react-toastify";
import { Star, StarHalf } from "@mui/icons-material";
import SecurityIcon from "@mui/icons-material/Security";
import DoneIcon from "@mui/icons-material/Done";
import LoadingCommon from "../../common/LoadingCommon";
import { width } from "@mui/system";

export function FilterCartUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterAss, setFilterAss] = useState([]);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const {id,idCart } = useParams();
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [profileAssistant, setProfileAssistant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();
  useEffect(() => {
    let axiosData = async () => {
      const dataApi = await axios.get(`http://localhost:8080/api/carts/filter/${idCart}?page=${count}`);

      if (dataApi.data.totalPages === count + 1) {
        setCheck(true);
        setFilterAss((prevFilterAss) => [...prevFilterAss, ...dataApi?.data.content]);
      } else {
        setFilterAss((prevFilterAss) => {
          if (count === 0) {
            return dataApi?.data.content;
          }
          return [...prevFilterAss, ...dataApi?.data.content];
        });
      }
      setIsLoading(false)
    };
    axiosData();
  }, [count]);
  console.log(filterAss);
  const handleSubmitAssistant = () => {
    console.log(selectedAssistant);
    const form = {
      cartId: idCart,
      employeeId: profileAssistant?.id || selectedAssistant?.id,
    };
    axios
      .put(`http://localhost:8080/api/carts/employees`, form)
      .then((res) => {
        navigate(`/user/cart/${id}`);
      })
      .then((res) => {
        toast.success("Thêm yêu cầu thành công");
      });
  };
  if (isLoading) {
    return <LoadingCommon />;
  }
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Danh sách yêu thích</h6>
              <NavLink to={`/user/cart/${id}`}>
                <p>Bỏ qua</p>
              </NavLink>
            </div>
          </div>
          <div className="col-3 p-0">
          <img style={{ height: "100px", width: "75px" }} 
              src="https://res.cloudinary.com/dw4xpd646/image/upload/v1703816118/Cloudinary-React/ljezvtifp9u79nfvqtkq.png"
              alt=""
            />
          </div>
        </div>
        <div className="render-list-assistant-body">
          {filterAss != null ? (
            <RenderAss
              listFilterAss={filterAss}
              setIsOpen={setIsOpen}
              setSelectedAssistant={setSelectedAssistant}
              selectedAssistant={selectedAssistant}
              setProfileAssistant={setProfileAssistant}
            />
          ) : (
            ""
          )}
          {check ? (
            ""
          ) : (
            <div className="per-page">
              <div className="per-page-item" onClick={() => setCount((pre) => pre + 1)}>
                <div>Xem thêm 7 người hỗ trợ</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedAssistant != null && (
        <div className="check-select">
          <div className="check-select-header">
            <div>
              <h5>
                Bạn đã chọn {selectedAssistant?.firstName} {selectedAssistant?.lastName}
              </h5>
              <span>
                Chọn người khác hoặc chọn {selectedAssistant?.firstName}{" "}
                {selectedAssistant?.lastName} làm trợ lý
              </span>
            </div>
            <div className="check-select-button">
                <ButtonForMe value={100} childrenButton={"Đồng ý"} onclick={handleSubmitAssistant}></ButtonForMe>
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
          <div className="modal-profile-content" style={{ margin: "30px 20px 0 20px" }}>
            <div style={{ display: "flex" }}>
              <img
                src={profileAssistant?.photoUrl}
                alt=""
                style={{ width: "75px", height: "100px", borderRadius: "15px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <span style={{ fontWeight: "bold" }}>
                  {profileAssistant?.firstName} {profileAssistant?.lastName}
                </span>
                <div>
                  {profileAssistant &&
                    profileAssistant.starAverage !== null &&
                    profileAssistant.rateQuantity !== null && (
                      <>
                        {Array.from({ length: Math.floor(profileAssistant.starAverage * 2) / 2 })
                          .fill(1)
                          .map((item, index) => (
                            <Star key={index} style={{ color: "yellow", fontSize: "18px" }} />
                          ))}
                        {profileAssistant.starAverage % 1 !== 0 && (
                          <StarHalf style={{ color: "yellow", fontSize: "18px" }} />
                        )}
                        <span className="ml-5-fs12-mt3">
                          (<span style={{ fontSize: "14px" }}>{profileAssistant.rateQuantity}</span>
                          )
                        </span>
                      </>
                    )}
                </div>
                <div style={{ fontSize: "14px" }}>{profileAssistant?.nameLocation}</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", fontWeight: "500", paddingLeft: "10px" }}>
              <i style={{ paddingRight: "5px" }} className="fa-regular fa-clock"></i>
              <span>{profileAssistant?.experience} năm kinh nghiệm.</span>{" "}
            </div>
            <div
              style={{
                marginTop: "10px",
                paddingLeft: "10px",
                fontSize: "0.75rem",
                color: "#667483",
              }}
            >
              <SecurityIcon style={{ fontSize: "0.75rem" }} /> T-CareCheck
              {profileAssistant?.infoName &&
                profileAssistant?.infoName.map((e, index) => (
                  <span key={index} style={{ marginLeft: "17px" }}>
                    <DoneIcon style={{ fontSize: "0.75rem" }} />
                    {e}
                  </span>
                ))}
              {profileAssistant?.skillName &&
                profileAssistant?.skillName.map((e, index) => (
                  <span key={index} style={{ marginLeft: "17px" }}>
                    <DoneIcon style={{ fontSize: "0.75rem" }} />
                    {e}
                  </span>
                ))}
            </div>
            <div style={{ margin: "20px 0", paddingLeft: "10px" }}>
              {profileAssistant?.descriptionAboutMySelf}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <span style={{ fontWeight: "500" }}>Tôi có thể giúp bạn với</span>
              <div
                style={{
                  backgroundColor: "#e1e1e1",
                  padding: "11px",
                }}
              >
                {profileAssistant?.serviceName?.map((e) => (
                  <div key={e.id} style={{ paddingRight: "15px" }}>
                    <DoneIcon /> {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-profile-footer">
            <div className="modal-profile-footer-add-list" onClick={handleSubmitAssistant}>
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
