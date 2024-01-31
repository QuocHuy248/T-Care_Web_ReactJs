import React, { useEffect, useState } from "react";
import "./AssistantCaption.css";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LogoProject from "../../../logoProject/LogoProject";
import { ButtonForMe } from "./../../../ButtonForMe";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../../../common/LoadingPage";

export function AssistantCaption() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { idCart } = useParams();
  const [idUser, setIdUser] = useState()
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    const findByIdCart = () => {
      axios
        .get(`http://localhost:8080/api/carts/${idCart}`)
        .then((resp) => {
          setIdUser(resp.data.user.id)
        });
    };
    findByIdCart();
  }, [idCart]); 
  
  const handleSubmitAssistantCaption =  () => {
    setIsLoadingPage(true)
    const note = {
      noteForEmployee:content
    }
    const id = idUser
     axios
      .put(`http://localhost:8080/api/carts/noteEmployee/${idCart}`, note)
      .then((resp) => {
        
        toast.success("Hoàn thành thêm thông tin người cần chăm sóc");
        navigate(`/user/cart/filter/${id}/${idCart}`);
        setIsLoadingPage(false)
      })
      .catch((err) => {
        console.error("Lỗi khi gửi POST request:", err);
        toast.error("Lỗi");
        setIsLoadingPage(false)

      });
  };
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>
        <div className="row ">
          <div className="col-12 header"></div>
        </div>
      </div>
      <div className="user-assistant-caption">
        <div>
          <h4 className="my-4">Bạn cần tìm kiếm điều gì ở người hỗ trợ?</h4>
          <h6 className="mb-3">Ngoài ra còn vấn đề gì bạn biết về người hỗ trợ</h6>
          <span className="my-3">Ví dụ</span>
          <ul>
            <li className="my-4">Các tính cách cá nhân nào sẽ phù hợp với bạn?</li>
            <li className="my-4">Một số kĩ năng đặc biệt nào người hỗ trợ mà bạn cần?</li>
            <li className="my-4">Người hỗ trợ có cần phải có sở thích, đam mê gì không?</li>
          </ul>
          <div className="form-group">
            <textarea
              onInput={(e) => setContent(e.target.value)}
              className="form-control"
              placeholder="Chia sẻ chi tiết ở đây"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-5 button-date-session">
      {isLoadingPage ? (
          <div style={{ marginRight: "17%" }}>
            <LoadingPage />
          </div>
        ) : (
        <ButtonForMe childrenButton={"Tiếp theo"} onclick={handleSubmitAssistantCaption} />)}
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
