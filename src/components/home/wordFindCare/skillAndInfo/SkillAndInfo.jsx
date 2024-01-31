import React, { useEffect, useState } from "react";
import "./SkillAndInfo.css";
import LogoProject from "../../../logoProject/LogoProject";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { ButtonForMe } from "./../../../ButtonForMe";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SkillIndexUser } from "../../../viewUser/index/SkillIndexUser";
import { InfoIndexUser } from "../../../viewUser/index/InfoIndexUser";
import { toast } from "react-toastify";
import LoadingCommon from "../../../common/LoadingCommon";
import LoadingPage from "../../../common/LoadingPage";

export function SkillAndInfo() {
  const { id } = useParams();
  const [listSkill, setListSkill] = useState([]);
  const [listInfo, setListInfo] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const dataSkillResponse = await axios.get(`http://localhost:8080/api/skills`);
      const dataInfoResponse = await axios.get(`http://localhost:8080/api/add-infos`);
      setListSkill(dataSkillResponse.data);
      setListInfo(dataInfoResponse.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  if (isLoading) {
    return <LoadingCommon />;
  }
  const handleSubmitSkillAndInfo = () => {
    setIsLoadingPage(true);
    if (selectedSkills.length !== 0 && selectedInfos.length !== 0) {
      const selectedSkillIds = selectedSkills.map((selectedSkill) => {
        const matchingSkill = listSkill.find((skill) => skill.name === selectedSkill);
        return matchingSkill ? matchingSkill.id : null;
      });
      const selectedInfoIds = selectedInfos.map((selectedInfo) => {
        const matchingInfo = listInfo.find((info) => info.name === selectedInfo);
        return matchingInfo ? matchingInfo.id : null;
      });
      const skill = { cartSkillIdList: selectedSkillIds };
      const info = { infoIdList: selectedInfoIds };
      const updateData = async () => {
        const [skillResponse, infoResponse] = await Promise.all([
          axios.put(`http://localhost:8080/api/carts/cartSkills/${id}`, skill),
          axios.put(`http://localhost:8080/api/carts/cartInfos/${id}`, info),
        ]);

        if (skillResponse.status === 204 && infoResponse.status === 204) {
          toast.success("Cập nhật thông tin hộ lý thành công!");
          navigate("/user/date-session" + "/" + id);
        }
        setIsLoadingPage(false);
      };
      updateData();
    } else {
      toast.error("Cần chọn đủ thông tin hộ lý được yêu cầu");
      setIsLoadingPage(false);
    }
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
      <div className="d-flex my-5 ">
        <div style={{ margin: "0 30% " }}>
          <h3 className="mb-4">Chọn thêm thông tin cho người hộ lý?</h3>
          <span style={{ fontWeight: "700" }}>Kỹ năng hộ lý</span>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginTop: "10px", marginBottom: "30px" }}
          >
            {listSkill?.map((e) => (
              <SkillIndexUser
                key={e.id}
                setSelectedSkills={setSelectedSkills}
                selectedSkills={selectedSkills}
                value={e}
              />
            ))}
          </div>
          <span style={{ fontWeight: "700" }}>Thông tin hộ lý</span>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            {listInfo?.map((e) => (
              <InfoIndexUser
                key={e.id}
                setSelectedInfos={setSelectedInfos}
                selectedInfos={selectedInfos}
                value={e}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="my-5 h5-ta-center">
        {isLoadingPage ? (
          <div style={{ marginRight: "17%" }}>
            <LoadingPage />
          </div>
        ) : (
          <ButtonForMe childrenButton={"Tiếp theo"} onclick={handleSubmitSkillAndInfo} />
        )}
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
