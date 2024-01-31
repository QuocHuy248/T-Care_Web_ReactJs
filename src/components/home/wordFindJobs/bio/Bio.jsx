import React, { useState } from "react";
import "./Bio.css";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import { SideBarFindJob } from "../sideBarFindJob/SideBarFindJob";
import { Button, TextField } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ButtonForMe } from "../../../ButtonForMe";
import ModalUnstyled from "../../../ModalToMe";
import { Grid } from "@mui/material/Grid";
import axios from "axios";
import { toast } from "react-toastify";

export function Bio() {
  const [bioText, setBioText] = useState("");
  const [checkModal, setCheckModal] = useState(false);
  const remainingCharacters = 100 - bioText.length;
  const [descriptionText, setDescriptionText] = useState("");
  const [error, setError] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  const handleBioClick = async () => {
    if (descriptionText.trim() === "") {
      setError("Tiêu đề tiểu sử không được để trống");
      return;
    }

    setError("");

    if (bioText.trim() === "") {
      setErrorDescription("Giới thiệu bản thân không được để trống");
      return;
    }
    setErrorDescription("");

    if (remainingCharacters > 0) {
      setErrorDescription("Giới thiệu bản thân phải nhiều hơn 100 kí tự");
      return;
    }

    setErrorDescription("");

    const bioEmployee = { bioTitle: descriptionText, descriptionAboutMySelf: bioText };
    try {
      await axios.put(`http://localhost:8080/api/employees/bio/${id}`, bioEmployee).then((resp) => {
        toast.success("Lưu thông tin thành công");
        navigate(`/assistant/photo/${id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formTips = (
    <>
      <h2 id="unstyled-modal-title" className="modal-title">
        Một số mẹo tạo tiểu sử giúp dễ dàng hơn trong việc tìm kiếm công việc
      </h2>
      <ul style={{ width: "100%" }} className="modal-description">
        <li>Một tiểu sử thật chi tiết để các gia đình hiểu hơn về bạn</li>
        <li>Cho gia đình biết kiểu công việc mà bạn đang tìm kiếm</li>
        <li>Hãy kể cho gia đình biết bạn yêu quý điều gì</li>
      </ul>
      <p>
        <strong>Một số ví dụ:</strong>
      </p>
      <p style={{ margin: 0 }}>
        <strong>Thơ Nguyễn đến từ 30 Hoàng Quang, Thuận An, Huế</strong>
      </p>
      <span>
        Tôi là một bà mẹ ba con tích cực và đầy nghị lực và là bà của ba đứa cháu. Vì trong vài năm,
        tôi làm việc liên tục ở các trung tâm hội người cao tuổi chủ yếu là vì tôi thích giúp đỡ với
        người cao tuổi. Gần đây tôi đang bận giúp đỡ việc nuôi dạy các cháu của mình! Bây giờ các
        cháu đang ở trong trường học, tôi đang tìm cách kiếm thêm một ít tiền trong khi làm công
        việc tôi yêu thích
      </span>
      <br />
      <p style={{ margin: "20px 0 0 0" }}>
        <strong>Minh Nguyễn đến từ 28 Nguyễn Trường Tộ, Huế </strong>
      </p>
      <span>
        Xin chào cả nhà, tôi là một người đáng tin cậy, kiên nhẫn và biết lắng nghe, tôi có khoảng 5
        năm kinh nghiệm trong việc chăm sóc lĩnh vực y tế, biết đo huyết áp, đường máu,... Tôi muốn
        kiếm thêm công việc vào thời gian buổi tối hoặc cuối tuần, ngoài ra tôi muốn phát triển thêm
        về bản thân, tôi muốn quan tâm, chăm sóc tất cả mọi người, giúp đỡ tất cả khi bản thân còn
        có thể. Hơn hết tôi muốn tìm hiểu về bản thân, đó là mình sẽ ra sao vào vài chục năm tới.
        Tôi có quan điểm bản thân rằng là, xem người năm lớn tuổi như cha, xem ngươi nữ lớn tuổi như
        mẹ của mình. Từ đó yêu thương họ hơn.
      </span>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Button
          onClick={() => setCheckModal(false)}
          style={{ backgroundColor: "#213f5f", color: "white", width: "30%" }}
        >
          Hiểu rồi
        </Button>
      </div>
    </>
  );
  const bio = (
    <div className="col-9 " style={{ paddingTop: "20px" }}>
      <h4 className="" style={{ marginBottom: "20px" }}>
        Tiểu sử của tôi
      </h4>
      <span>Thêm vào tiêu đề (Ví dụ: Luôn mỉm cười dưới mọi hoàn cảnh)</span>
      <div style={{ margin: "20px 0" }}>
        <TextField
          sx={{ width: "70%" }}
          size="small"
          id="outlined-basic"
          label="Tiêu đề tiểu sử"
          variant="outlined"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div style={{ width: "70%", paddingBottom: "20px" }}>
        <span>
          Giới thiệu bản thân với gia đình bằng cách viết tiểu sử. Chúng tôi đã bắt đầu một bản
          nháp, nhưng bạn cần phải chỉnh sửa nó và viết lại thêm chi tiết. Nó phải có ít nhất 100 kí
          tự
        </span>
      </div>
      <div>
        <textarea
          style={{ height: "100px", width: "70%" }}
          name="Size"
          placeholder="Tôi có một năm kinh nghiệm làm việc. Tôi có thể sửa đèn và giúp dọn dẹp nhà. "
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
        />
        {errorDescription && <p style={{ color: "red" }}>{errorDescription}</p>}
      </div>
      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          margin: "15px 0",
          cursor: "pointer",
        }}
      >
        <div onClick={() => setCheckModal(true)}>
          <HighlightIcon /> <span style={{ color: "blue" }}>Lời Khuyên</span>
        </div>
        <div>
          {bioText.length < 100 && (
            <span style={{ color: "#a5a5a5", fontSize: "11px" }}>{remainingCharacters} kí tự</span>
          )}
        </div>
      </div>
      <div className="" style={{ padding: "20px 0 40px 0", width: "70%", textAlign: "end" }}>
        <ButtonForMe
          childrenButton={"Lưu và tiếp tục"}
          colorButton={"#213f5f"}
          onclick={handleBioClick}
        />
      </div>
      <ModalUnstyled
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={formTips}
        widthForm={"79%"}
        heightForm={"80vh"}
        paddingCheck={"24px"}
      />
    </div>
  );
  return (
    <NavBarFindJob
      children={<SideBarFindJob col={"col-8"} value={bio} check={true} activeIds={[1, 2, 3, 4]} />}
    />
  );
}
