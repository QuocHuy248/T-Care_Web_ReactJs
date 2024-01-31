import React, { useState } from "react";
import TokenIcon from "@mui/icons-material/Token";
import SecurityIcon from "@mui/icons-material/Security";
import { FavoriteBorder } from "@mui/icons-material";
import { ButtonForMe } from "../../ButtonForMe";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export function RenderListAssistantIndexUser({ value, index, listAssistant, checkButtonForme }) {
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const handleSelectFavorite = (e) => {
    const isInfoSelected = selectedFavorites?.some((element) => element === e);
    if (isInfoSelected) {
      const updatedInfos = selectedFavorites?.filter((element) => element !== e);
      setSelectedFavorites(updatedInfos);
    } else {
      setSelectedFavorites((prev) => [...prev, e]);
    }
  };
  console.log("value", value);
  const handleSubmitCartUser = () => {
    const form = {
      cartId: value.cartId,
      employeeId: value.id,
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
  return (
    <>
      <div className="render-list-assistant-index-user" key={index}>
        <div className="render-list-assistant-index-user-header">
          <img src={value?.photoUrl} alt="" style={{width:"75px"}}/>
          <div className="render-list-assistant-index-user-body">
            <span className="render-list-assistant-index-user-body-name">
              {value?.lastName} {value?.firstName}
            </span>
            <TokenIcon className="render-list-assistant-index-user-body-icon-token" />
            <SecurityIcon className="render-list-assistant-index-user-body-icon-security" />
            <div className="render-list-assistant-index-user-body-experience">
              <div>{value?.nameAddress}</div>
              <div>{value?.experience} năm kinh nghiệm</div>
            </div>
          </div>
        </div>
        <div className="render-list-assistant-index-user-footer">
          <span className="render-list-assistant-index-user-footer-content">
            "{value?.descriptionAboutMySelf?.slice(0, 100)}
            {value?.descriptionAboutMySelf?.length > 100 ? "..." : ""}"{" "}
            <a href={`http://localhost:3000/user/index/${id}/${value?.id}`} target="_blank">
              more
            </a>
          </span>
          <FavoriteBorder
            className={`favorite-check-index-user${
              selectedFavorites.includes(value?.id) ? "-active" : ""
            }`}
            onClick={() => handleSelectFavorite(value?.id)}
            name={value?.id}
          />
          {checkButtonForme ? (
            ""
          ) : (
            <ButtonForMe childrenButton={"Thêm"} value={20} onclick={handleSubmitCartUser} />
          )}
        </div>
      </div>
      {listAssistant?.length - 1 == index || (
        <div className="render-list-assistant-index-user-footer-separation"></div>
      )}
    </>
  );
}
