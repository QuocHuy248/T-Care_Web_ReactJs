import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoProject from "../../../logoProject/LogoProject";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ButtonForMe } from "../../../ButtonForMe";
import { RadioService } from "./RadioService";
import GetServiceAPI from "../../../../service/getServiceAPI";
import { toast } from "react-toastify";
import LoadingCommon from "../../../common/LoadingCommon";
import "./UserService.css";
import LoadingPage from "../../../common/LoadingPage";

export function UserService() {
  const [listServiceGenerals, setListServiceGenerals] = useState();
  const [selectedRadioId, setSelectedRadioId] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    showListServiceGenerals();
  }, []);
  const showListServiceGenerals = async () => {
    const serviceGenerals = await GetServiceAPI.getServiceGeneral();
    setListServiceGenerals(serviceGenerals);
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingCommon />;
  }
  const handleSubmitService = async () => {
    setIsLoadingPage(true);
    const select = {
      serviceId: selectedRadioId,
    };

    await axios
      .put(`http://localhost:8080/api/carts/services/${id}`, select)
      .then((resp) => {
        toast.success("Chọn dịch vụ thành công");
        navigate("/user/skill-info" + "/" + id);
        setIsLoadingPage(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gửi POST request:", err);
        toast.error("Chọn dịch vụ");
        setIsLoadingPage(false);
      });
  };
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>

        <div className="row">
          <div className="col-6 bg-h3"></div>
        </div>
      </div>
      <div className="d-flex my-5 jc-center">
        <div>
          <h3 className="mb-4">Bạn đang tìm kiếm loại chăm sóc nào?</h3>
          <RadioService
            value={listServiceGenerals}
            selectedRadioId={selectedRadioId}
            setSelectedRadioId={setSelectedRadioId}
          />
        </div>
      </div>
      <div className="my-5 h5-ta-center">
        {isLoadingPage ? (
          <div style={{ marginRight: "17%" }}>
            <LoadingPage />
          </div>
        ) : (
          <ButtonForMe childrenButton={"Tiếp theo"} onclick={handleSubmitService} />
        )}
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
