import React, { useEffect, useState } from "react";
import { ContainerDashboard } from "./ContainerDashboard";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import LoadingCommon from "../common/LoadingCommon";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ModalUnstyled from "../ModalToMe";
import { ButtonForMe } from "../ButtonForMe";

export function AdminAssistant() {
  const [listAssistantWaiting, setListAssistantWaiting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const axiosData = async () => {
      const assistant = await axios.get("http://localhost:8080/api/admin/employees/waiting");
      const data = assistant.data.content;
      const listWithIndex = data.map((item, index) => ({ ...item, index: index + 1 }));
      listWithIndex.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
      setListAssistantWaiting(listWithIndex);
      setIsLoading(false);
    };
    axiosData();
  }, [isCheck, checkModal]);
  if (isLoading) {
    return <LoadingCommon />;
  }
  const handleDetail = (e) => {
    setCheckModal(true);

    const result = {};

    e.dateSessionList.forEach((item) => {
      const key = item.edateInWeek;
      if (!result[key]) {
        result[key] = {
          edateInWeek: item.edateInWeek,
          sessions: [item.esessionOfDate],
        };
      } else {
        result[key].sessions.push(item.esessionOfDate);
      }
    });

    const mergedData = Object.values(result);
    e.dateSessionList = mergedData;
    setProfile(e);
  };
  const handleDone = (id) => {
    Swal.fire({
      title: "Tạo yêu cầu",
      text: "Bạn có chắc chắn chấp nhận hộ lý?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8080/api/admin/employees/active/${id}`).then((res) => {
          toast.success("Châp nhận thành công");
          setIsCheck((pre) => !pre);
        });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Tạo yêu cầu",
      text: "Bạn có chắc chắn xóa yêu cầu này?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8080/api/admin/employees/ban/${id}`).then((res) => {
          toast.success("Xóa yêu cầu thành công");
          setIsCheck((pre) => !pre);
        });
      }
    });
  };
  console.log("listAssistantWaiting",listAssistantWaiting);
  const profileAssistant = (
    <>
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        <span style={{ fontWeight: "600", fontSize: "23px" }}>HỒ SƠ XIN VIỆC</span>
      </div>
      <div style={{ display: "flex", paddingLeft: "20px" }}>
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Ảnh đại diện : </span>{" "}
        <div style={{ border: "1px solid #707070", marginLeft: "20px" }}>
          <img src={profile?.photoUrl} style={{ width: "150px", height: "200px" }} alt="" />
        </div>
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Họ và tên</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.lastName} {profile?.firstName}
        </span>{" "}
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Email</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.email}</span> <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Số điện thoại</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.phoneNumber}</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Địa chỉ</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.nameLocation}</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Căn cước công dân</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.personID}</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Giới tính</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.egender}</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Học vấn</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.eeducation}</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Kinh nghiệm</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.experience} năm</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Tiểu sử</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>{profile?.bioTitle} năm</span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Giới thiệu bản thân</span> :{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.descriptionAboutMySelf}
        </span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Dịch vụ</span>:{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.serviceList.map((e, index) => (
            <span key={index}>
              {e?.name}
              {index < profile.serviceList.length - 1 && ", "}
            </span>
          ))}{" "}
          .
        </span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Kỹ năng</span>:{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.skillList.map((e, index) => (
            <span key={index}>
              {e?.name}
              {index < profile.skillList.length - 1 && ", "}
            </span>
          ))}{" "}
          .
        </span>
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Thông tin thêm</span>:{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.addInfoList.map((e, index) => (
            <span key={index}>
              {e?.name}
              {index < profile.addInfoList.length - 1 && ", "}
            </span>
          ))}{" "}
          .
        </span>{" "}
        <br />
        <span style={{ fontWeight: "500", fontSize: "18px" }}>- Ngày làm việc</span>:{" "}
        <span style={{ color: "#707070", fontSize: "16px" }}>
          {profile?.dateSessionList.map((e, index) => (
            <div key={index} style={{ paddingLeft: "50px" }}>
              + {e?.edateInWeek} :{" "}
              {e?.sessions.map((value, i) => (
                <span key={i}>
                  {value}
                  {i === e.sessions.length - 1 ? "" : ","}
                </span>
              ))}
            </div>
          ))}
        </span>
        <br />
        <div style={{ textAlign: "center" }}>
          <ButtonForMe
            value={30}
            childrenButton={"Đóng"}
            colorButton={"#3b71aa"}
            type="submit"
            onclick={() => setCheckModal(false)}
          />
        </div>
      </div>
    </>
  );
  return (
    <>
      <ContainerDashboard />
      <div style={{ padding: "30px 60px", backgroundColor: "#f5f7fb" }}>
        <div style={{ padding: "30px 60px", backgroundColor: "white", borderRadius:"30px", border:"1px solid" }}>
          <span style={{ fontWeight: "600", fontSize: "25px" }}>Danh sách đăng ký hộ lý</span>
          <table style={{ marginTop: "20px" }} className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {listAssistantWaiting?.map((e) => (
                <tr key={e.id}>
                  <td>{e.createAt}</td>
                  <td>
                    {e.lastName} {e.firstName}
                  </td>
                  <td>{e.email}</td>
                  <td>{e.phoneNumber}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                      <div
                        onClick={() => handleDetail(e)}
                        style={{ color: "#686868", cursor: "pointer" }}
                      >
                        <ErrorOutlineIcon />
                      </div>
                      <div
                        onClick={() => handleDone(e.id)}
                        style={{ color: "#206dff", cursor: "pointer" }}
                      >
                        <LibraryAddCheckIcon />
                      </div>
                      <div
                        onClick={() => handleDelete(e.id)}
                        style={{ color: "#ff4e4e", cursor: "pointer" }}
                      >
                        <DeleteForeverIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalUnstyled
        paddingCheck={"20px"}
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={profileAssistant}
        widthForm={"60%"}
        heightForm={"80%"}
      />
    </>
  );
}
