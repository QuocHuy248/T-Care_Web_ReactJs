import React, { useEffect, useState } from "react";
import "./ProfileAssistant.css";
import { useParams } from "react-router-dom";
import { ContainerViewUser } from "./../containerViewUser/ContainerViewUser";
import { LegalNotice } from "../../carehub/LegalNotice";
import axios from "axios";
import TokenIcon from "@mui/icons-material/Token";
import SecurityIcon from "@mui/icons-material/Security";
import { FavoriteBorder } from "@mui/icons-material";
import { ButtonForMe } from "../../ButtonForMe";
import DoneIcon from "@mui/icons-material/Done";
import { CheckBackground } from "./CheckBackground";
import { RateAssistant } from "./RateAssistant";
import ModalUnstyled from "../../ModalToMe";
import LoadingCommon from "../../common/LoadingCommon";
export function ProfileAssistant() {
  const { id, idAssistant } = useParams();
  const [assistant, setAssistant] = useState({});
  const [dayWork, setDayWork] = useState([]);
  const [checkModalBackground, setCheckModalBackground] = useState(false);
  const [checkRate, setCheckRate] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    let axiosData = async () => {

      const responseAssistant = await axios.get(
        "http://localhost:8080/api/employees/" + idAssistant
      );
      
      setAssistant(responseAssistant.data);
      setIsLoading(false)

    };
    axiosData();

  }, [idAssistant]);
  useEffect(() => {
    if (assistant && assistant.listDateSessions) {
      const newDayWork = {};

      assistant.listDateSessions.forEach((session) => {
        const [day, time] = session.split(" : ");
        if (!newDayWork[day]) {
          newDayWork[day] = [];
        }
        newDayWork[day].push(time);
      });

      setDayWork(newDayWork);
    }
  }, [assistant]);
  if (isLoading) {
    return <LoadingCommon />;
  }
  const checkModalFilterCart = <div></div>;
  return (
    <>
      <ModalUnstyled
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={checkModalFilterCart}
        widthForm={"60%"}
        heightForm={"80%"}
      />
      <ContainerViewUser idUser={id} />
      <div>
        <div
          style={{
            backgroundColor: "#fff1eb",
            padding: "30px 70px",
            position: "sticky",
            top: "0",
            zIndex: "100",
          }}
        >
          {assistant && (
            <div style={{ display: "flex" }}>
              <img
                src={assistant.photoUrl}
                alt=""
                style={{ width: "135px", height: "180px", borderRadius: "15px" }}
              />
              <div className="" style={{ marginLeft: "20px", alignSelf: "center" }}>
                <span className="" style={{ fontWeight: "bold", fontSize: "25px" }}>
                  {assistant.lastName} {assistant.firstName}
                </span>
                <TokenIcon className="" style={{ color: "#4093e9" }} />
                <SecurityIcon className="" style={{ color: "#4093e9" }} />
                <div className="">
                  <div>{assistant.address}</div>
                  <div>{assistant.experience} năm kinh nghiệm</div>
                </div>
              </div>
              {/* <div
                style={{
                  width: "50%",
                  height: "50px",
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "end",
                }}
              >
                <FavoriteBorder style={{ marginRight: "10px", cursor: "pointer" }} />
                <ButtonForMe childrenButton={"Hợp đồng"} value={50} onclick={() => setCheckModal(true)} />
              </div> */}
            </div>
          )}
        </div>
        <div style={{ padding: "15px 31% 15px 70px" }}>
          <div
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "15px",
              padding: "10px",
              display: "flex",
            }}
          >
            <div style={{ alignSelf: "center", marginRight: "10px" }}>
              <SecurityIcon className="" style={{ color: "#4093e9" }} />
            </div>
            <div>
              <h6>{assistant.firstName} đã hoàn thành T-CareCheck</h6>
              <span>
                Đây là bước kiểm tra lý lịch mà chúng tôi yêu cầu đối với tất cả người chăm sóc.{" "}
                <span
                  onClick={() => setCheckModalBackground(true)}
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
                  Tìm hiểu thêm
                </span>
              </span>
            </div>
          </div>
          <div style={{ padding: "20px 0" }}>
            <h5>Giới thiệu về {assistant.firstName}</h5>
            <span style={{ fontSize: "12px", color: "#667483" }}>
              Kinh nghiệm: {assistant.experience} năm
            </span>{" "}
            <br /> <br />
            <span>{assistant.descriptionAboutMySelf}</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "#ccd1d6" }}></div>
          {/* <div style={{ padding: "20px 0" }}>
            <div className="" style={{ justifyContent: "space-between", display: "flex" }}>
              <h5>Đánh giá</h5>
              <div
                style={{
                  border: "1px solid #445e79",
                  cursor: "pointer",
                  marginRight: "20px",
                  padding: "5px 15px",
                  borderRadius: "20px",
                }}
              >
                <span onClick={() => setCheckRate(true)} style={{}}>
                  Viết đánh giá
                </span>
              </div>
            </div>
            <span>
              Hãy đánh giá cho {assistant.firstName} khi cô ấy hoàn thành công việc được nhận từ bạn
            </span>
          </div>
          <div style={{ height: "1px", backgroundColor: "#ccd1d6" }}></div> */}
          <div style={{ padding: "20px 0" }}>
            <h5>Thời gian mà {assistant.firstName} có thể hỗ trợ bạn</h5>
            <ul>
              {Object.keys(dayWork).map((day, index) => (
                <li key={index} style={{ padding: "2px 0", fontSize: "16px" }}>
                  {day}: {dayWork[day].join(", ")}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: "1px", backgroundColor: "#ccd1d6" }}></div>
          <div style={{ padding: "20px 0" }}>
            <h5>Dịch vụ</h5>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "#e1e1e1",
                padding: "11px",
              }}
            >
              {assistant?.idServices?.map((e) => (
                <div
                  key={e.id}
                  style={{ paddingRight: "15px", width: "47%", paddingBottom: "20px" }}
                >
                  <h6>{e.id}</h6>
                  <div>
                    {e.description.split(".").map(
                      (word, index) =>
                        word.length > 0 && (
                          <span key={index} style={{ fontSize: "12px" }}>
                            <DoneIcon /> {word}.
                            <br />
                          </span>
                        )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "1px", backgroundColor: "#ccd1d6" }}></div>
          <div style={{ padding: "20px 0" }}>
            <h5>Trình độ chuyên môn</h5>
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: "14px" }}>
              <div>
                <h6>Giáo dục</h6>
                <span>
                  {" "}
                  <DoneIcon /> {assistant.education}
                </span>
                <h6 style={{ marginTop: "15px" }}>Chi tiết bổ sung</h6>
                {assistant?.idAddInfos?.map((e) => (
                  <div key={e}>
                    {" "}
                    <DoneIcon /> {e}
                  </div>
                ))}
              </div>
              <div>
                <h6>Kỹ năng chuyên nghiệp</h6>
                {assistant?.idSkills?.map((e) => (
                  <div key={e}>
                    {" "}
                    <DoneIcon /> {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LegalNotice />
      <CheckBackground setCheckModal={setCheckModalBackground} checkModal={checkModalBackground} />
      <RateAssistant setCheckModal={setCheckRate} assistant={assistant} checkModal={checkRate} />
    </>
  );
}
