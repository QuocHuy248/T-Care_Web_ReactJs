import "./UserNeedCare.css";
import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LogoProject from "../../../logoProject/LogoProject";
import { Box, FormControl, MenuItem, Radio, Select } from "@mui/material";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { ButtonForMe } from "../../../ButtonForMe";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../../../common/LoadingPage";

const memberOfFamily = [
  { id: "MYPARENT", name: "Cha Mẹ của tôi" },
  { id: "MYSPOUSE", name: "Vợ/Chồng của tôi" },
  { id: "MYSELF", name: "Bản thân tôi" },
  { id: "MYGRANDPARENTS", name: "Ông bà của tôi" },
  { id: "OTHER", name: "Khác" },
];
const gender = [
  { id: "MALE", name: "Nam" },
  { id: "FEMALE", name: "Nữ" },
  { id: "OTHER", name: "Khác" },
];
const ageRender = [
  { id: "THIRTY", name: "30s" },
  { id: "FORTY", name: "40s" },
  { id: "FIFTY", name: "50s" },
  { id: "SIXTY", name: "60s" },
  { id: "SEVENTY", name: "70s" },
  { id: "EIGHTY", name: "80s" },
  { id: "NINETY", name: "90s" },
];

export function UserNeedCare() {
  const [member, setMember] = useState(null);
  const [genderSelect, setGenderSelect] = useState("MALE");
  const [noteForPatient, setNoteForPatient] = useState("");
  const [age, setAge] = React.useState("THIRTY");
  const {id} = useParams()
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  let navigate = useNavigate();

  const handleSubmitNeedCare = async ()=>{
    setIsLoadingPage(true)
    const information = {
      memberOfFamily: member,
      gender:genderSelect,
      decade:age,
      noteForPatient:noteForPatient
    }
    await axios
    .put(`http://localhost:8080/api/carts/infoPatient/${id}`, information)
    .then((resp) => {
      toast.success("Hoàn thành thêm thông tin người cần chăm sóc");
      navigate("/user/assistant-caption" + "/" + id);
      setIsLoadingPage(false)
    })
    .catch((err) => {
      console.error("Lỗi khi gửi POST request:", err);
      toast.error("Lỗi");
      setIsLoadingPage(false)
    });
  }
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>
        <div className="row ">
          <div className="col-10 header"></div>
        </div>
      </div>
      <div className="d-flex user-need-care">
        <div className="user-need-care-container">
          <h4>Chia sẻ thêm thông tin về người được chăm sóc.</h4>
          <h5>Ai đang cần chăm sóc?</h5>
          {memberOfFamily.map((e) => (
            <div
              key={e.id}
              className="d-flex w-50 my-3 jc-sp"
            >
              <label htmlFor={`id-${e.id}`}>{e.name}</label>
              <Radio
                value={e.id}
                checked={member === e.id}
                onChange={(element) => setMember(element.target.value)}
                name="selectMemberOfFamily"
                id={`id-${e.id}`}
              />
            </div>
          ))}
          <h5> Gender</h5>
          <div className="d-flex gender">
            {gender?.map((e) => (
              <div
                className={`w-100 gender-render-${genderSelect === e.id ? "active" : ""}`}
                key={e.id}
                onClick={() => setGenderSelect(e.id)}
              >
                {e.name}
              </div>
            ))}
          </div>
          <h5 className="mt-4 mb-3  "> Age</h5>
          <Box sx={{ minWidth: 60 }}>
            <FormControl fullWidth>
              <Select
                className="w-50"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={(event) => setAge(event.target.value)}
              >
                {ageRender.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <h5 className="my-4">Chúng tôi nên biết gì về họ?</h5>
          <span className="my-2">Ví dụ:</span>
          <ul>
            <li className="my-2">
              Họ có cần điều kiện cơ bản gì không(Ví dụ người hỗ trợ là nam/ nữ)
            </li>
            <li className="my-2">Sở thích, niềm vui của họ là gì?</li>
            <li className="my-2">Một ngày sinh hoạt bình thường của họ như thế nào?</li>
          </ul>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Chia sẻ chi tiết ở đây"
              rows="3"
              onChange={(e) => setNoteForPatient(e.target.value)}
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
          <ButtonForMe childrenButton={"Next"} onclick={handleSubmitNeedCare} />)}
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
