import React, { useState } from "react";
import ModalUnstyled from "./../../ModalToMe";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PolicyIcon from "@mui/icons-material/Policy";
import { ButtonForMe } from "../../ButtonForMe";
import SecurityIcon from "@mui/icons-material/Security";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export function RateAssistant({ checkModal, setCheckModal, assistant }) {
  const [rating, setRating] = useState(0);

  const handleStarHover = (hoveredRating) => {
    setRating(hoveredRating);
  };

  const handleStarClick = (clickedRating) => {
    console.log("Rating submitted:", clickedRating);
  };
  const rateAssistant = (
    <>
      <div className="rate-modal-header-close">
        <HighlightOffIcon
          className="rate-modal-header-close-icon"
          onClick={() => setCheckModal(false)}
        />
      </div>
      <div style={{ padding: "5px 30px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Hãy cho chúng tôi biết về trải nghiệm của bạn với {assistant.firstName}{" "}
          {assistant.lastName}.
        </span>{" "}
        <br />
        <p style={{ margin: "10px 0 2px 0", fontWeight: "bold" }}>Đánh giá tổng thể</p>
        {[1, 2, 3, 4, 5].map((index) => (
          <StarIcon
            key={index}
            style={{ color: index <= rating ? "yellow" : "grey", cursor: "pointer" }}
            onMouseEnter={() => handleStarHover(index)}
            onClick={() => handleStarClick(index)}
          />
        ))}
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "#e7f0fb",
            padding: "10px",
            margin: "15px 0",
            display: "flex",
          }}
        >
          <div style={{ marginRight: "20px", alignSelf: "center" }}>
            <ErrorOutlineIcon />
          </div>
          <span>
            Không bao gồm họ, số điện thoại hoặc thông tin cá nhân khác khi viết đánh giá của bạn
          </span>
        </div>
        <span style={{ padding: "10px 0", fontWeight: "bold" }}>Lý do xếp hạng của bạn</span>
        <br />
        <textarea
          className="textarea-rate-assistant"
          placeholder="Hãy cho chúng tôi biết những gì bạn thích hoặc những gì cần cải thiện.  Chúng tôi khuyên bạn không nên bao gồm tên của các thành viên trong gia đình."
        ></textarea>
        <div style={{textAlign:"center"}}>
        <ButtonForMe childrenButton={"Đánh giá"} value={"50%"} />
        </div>
      </div>
    </>
  );
  return (
    <>
      <ModalUnstyled
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={rateAssistant}
        widthForm={"30%"}
        heightForm={"80%"}
      />
    </>
  );
}
