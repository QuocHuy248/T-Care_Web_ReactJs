import React, { useEffect, useState } from "react";
import "./EmployeeProfile.css";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ContainerViewEmployee } from "./containerViewEmployee/ContainerViewEmployee";
import LoadingCommon from "../common/LoadingCommon";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LegalNotice } from "../carehub/LegalNotice";
import ModalUnstyled from "../ModalToMe";
import LoadingPage from "../common/LoadingPage";
import Swal from "sweetalert2";

export function EmployeeProfile() {
    const { idEmployee } = useParams();
    const [employee, setEmployee] = useState();
    const [image, setImage] = useState();
    const [loadingImage, setLoadingImage] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [checkModal, setCheckModal] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        let axiosData = async () => {
            const responseAssistant = await axios.get(
                "http://localhost:8080/api/employees/" + idEmployee
            );
            setEmployee(responseAssistant.data);
            setUploadedImageUrl(responseAssistant.data.photoUrl);
            setIsLoading(false);
        };
        axiosData();
    }, [checkStatus, idEmployee, message]);
    useEffect(() => {
        const socket = new SockJS("http:/localhost:8080/ws");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe("/topic/admin", (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessage(receivedMessage);
                toast.success("Hồ sơ của bạn đã được chấp thuận")
            });
        });
        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, []);
    const handleUpload = async (e) => {
        const selectedFile = e.target.files[0];
        setIsLoadingImage(true);

        if (selectedFile) {
            const formData = new FormData();
            formData.append("avatar", selectedFile);
            formData.append("fileType", "image");

            const response = await axios.post("http://localhost:8080/api/photos", formData);

            if (response.status === 200) {
                const result = response.data;

                if (result) {
                    setUploadedImageUrl(result.url);
                    setImage(result.id);
                    const photoEmployee = { avatar: result.id };
                    axios

                        .put(
                            `http://localhost:8080/api/employees/photo/${idEmployee}`,
                            photoEmployee
                        )
                        .then((response) => {
                            toast.success("Sửa ảnh thành công");
                            setIsLoadingImage(false);
                        });
                } else {
                    console.error("Image ID not found in the response.");
                }
            } else {
                console.error("Failed to upload image:", response.statusText);
            }
        }
    };

    const handleStatus = (e) => {
        if (e === "Đang chờ") {
            toast.info("Tài khoản đang chờ xác minh");
        } else if (e === "Hoạt động") {
            Swal.fire({
                title: "Khóa tài khoản",
                text: "Bạn có chắc chắn khóa tài khoản?",
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .put(`http://localhost:8080/api/employees/status/ban/${idEmployee}`)
                        .then((res) => {
                            toast.success("Khóa thành công.");
                            setCheckStatus((pre) => !pre);
                        });
                }
            });
        } else {
            Swal.fire({
                title: "Mở tài khoản",
                text: "Bạn có chắc chắn mở lại tài khoản?",
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .put(`http://localhost:8080/api/employees/status/active/${idEmployee}`)
                        .then((res) => {
                            toast.success("Mở thành công.");
                            setCheckStatus((pre) => !pre);
                        });
                }
            });
        }
    };
    if (isLoading) {
        return <LoadingCommon />;
    }
    return (
        <>
            <ContainerViewEmployee idEmployee={idEmployee} />
            <div
                className="container-profile-user"
                style={{ margin: "0px 90px", padding: "0 15px" }}
            >
                <div
                    className="notification-user"
                    style={{
                        padding: "30px 0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: "3px solid #ccd1d6",
                    }}
                >
                    <div className="d-flex">
                        <TipsAndUpdatesIcon />
                        <span>
                            Đây là hồ sơ hiện tại của bạn. Có thể chỉnh sửa để thu hút thêm khách
                            hàng.
                        </span>
                    </div>
                </div>
                <h6 className="my-profile" style={{ padding: "25px 0" }}>
                    <AccountBoxIcon />
                    Hồ sơ của tôi
                </h6>

                <div className="my-profile-header" style={{ display: "flex" }}>
                    <div
                        className="my-profile-header-form"
                        style={{
                            display: "flex",
                            borderRight: "1px solid #e7e7e7",
                            width: "25%",
                            justifyContent: "center",
                        }}
                    >
                        <div>
                            <div className="my-profile-img" style={{ marginBottom: "16px" }}>
                                {isLoadingImage ? (
                                    <div
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            border: "1px solid #53585d",
                                            borderRadius: "15px",
                                            paddingLeft: "35px",
                                        }}
                                    >
                                        <LoadingPage />
                                    </div>
                                ) : (
                                    <img
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            border: "1px solid #53585d",
                                            borderRadius: "15px",
                                        }}
                                        src={uploadedImageUrl}
                                        alt=""
                                    />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleUpload}
                            />
                            <label
                                htmlFor="fileInput"
                                className="upload-photo-label"
                                style={{ marginLeft: "31px", cursor: "pointer", color: "blue" }}
                            >
                                Upload photo
                            </label>
                        </div>
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                        <div
                            style={{
                                width: "760px",
                                borderTop: "1px solid #e7e7e7",
                                height: "26px",
                                backgroundColor: "#e7e7e7",
                                borderTopRightRadius: "25px",
                                borderTopLeftRadius: "25px",
                                paddingLeft: "15px",
                            }}
                        >
                            <span style={{ fontWeight: "bold" }}>Thông tin tài khoản </span>
                        </div>
                        <div
                            style={{
                                width: "760px",
                                backgroundColor: "#f5f5f5",
                                paddingLeft: "15px",
                            }}
                        >
                            <div className="row" style={{ padding: "15px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Tên{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.firstName} {employee?.lastName}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Thời gian tạo tài khoản
                                </div>
                                <div
                                    className="col-8"
                                    style={{ fontSize: "11px", cursor: "pointer" }}
                                >
                                    {employee?.time}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Trạng thái{" "}
                                </div>
                                <div className="col-2" style={{ fontSize: "11px" }}>
                                    {employee?.status}
                                </div>
                                <div
                                    onClick={() => handleStatus(employee?.status)}
                                    className="col-4"
                                    style={{ fontSize: "11px", cursor: "pointer", color: "blue" }}
                                >
                                    Thay đổi trạng thái
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Email{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.email}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Địa chỉ{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.address}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Số điện thoại{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.phone}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Căn cước công dân
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.personID}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Giới tính{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.gender}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Kinh nghiệm{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.experience}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Bằng cấp{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.education}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Dịch vụ{" "}
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.idServices.map((e) => (
                                        <div key={e.id}>{e.id}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Kỹ năng
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.idSkills.map((e) => (
                                        <div key={e}>{e}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Thông tin thêm
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.idAddInfos.map((e) => (
                                        <div key={e}>{e}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="row" style={{ padding: "5px 0 5px" }}>
                                <div
                                    className="col-4"
                                    style={{ fontWeight: "bold", fontSize: "13px" }}
                                >
                                    Giới thiệu bản thân
                                </div>
                                <div className="col-8" style={{ fontSize: "11px" }}>
                                    {employee?.descriptionAboutMySelf}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                width: "760px",
                                backgroundColor: "#f5f5f5",
                                paddingLeft: "15px",
                                marginBottom: "40px",
                            }}
                        >
                            {/* {preferencesRender.map((e) => (
                <div key={e.id} style={{ padding: "5px 0 ", color: "#737373" }}>
                  <DoneAllIcon />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>{e.name}</span>
                </div>
              ))} */}
                        </div>
                    </div>
                </div>
            </div>
            <LegalNotice />
            {/* <ModalUnstyled
        paddingCheck={"20px"}
        check={checkModal}
        onClose={() => setCheckModal(false)}
        // children={editProfile}
        widthForm={"40%"}
        heightForm={"80%"}
      /> */}
        </>
    );
}
