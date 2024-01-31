import React, { useEffect, useState } from "react";
import "./Profile.css";
import { LegalNotice } from "../../carehub/LegalNotice";
import { ContainerViewUser } from "../containerViewUser/ContainerViewUser";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ModalUnstyled from "../../ModalToMe";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { ButtonForMe } from "../../ButtonForMe";
import LoadingCommon from "../../common/LoadingCommon";
import LoadingPage from "../../common/LoadingPage";

import { useFormik } from "formik";
import * as yup from "yup";
const preferencesRender = [
  {
    id: 1,
    name: "Gửi email cho tôi về các tính năng, dịch vụ, ưu đãi đặc biệt của T-Care.com và những nội dung thú vị khác.",
  },
  {
    id: 2,
    name: "Gửi email cho tôi về những người chăm sóc mới ở gần tôi, những người gần đây đã tham gia T-Care.com.",
  },
  {
    id: 3,
    name: "Gửi email cho tôi về các tính năng, dịch vụ, ưu đãi đặc biệt của T-Care.com và những nội dung thú vị khác.",
  },
  {
    id: 4,
    name: "Chia sẻ trạng thái trực tuyến của tôi với các thành viên khác của T-Care.com.",
  },
 
  {
    id: 6,
    name: "Công khai hồ sơ và tin tuyển dụng của tôi. (?)",
  },
  {
    id: 7,
    name: "Đưa hồ sơ của tôi vào kết quả tìm kiếm người chăm sóc và một số email nhất định của người chăm sóc.",
  },
  { id: 8, name: "Cho phép người chăm sóc biết rằng tôi đã xem hồ sơ của họ." },
 
];
export function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [checkModal, setCheckModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [gender, setGender] = useState("");
  const validationSchema = yup.object({
    phoneNumber: yup.string().required("Số điện thoại không được trống"),
    firstName: yup.string().required("Tên không được trống"),
    lastName: yup.string().required("Họ không được trống"),
    personID: yup
      .number()
      .typeError("Số Căn Cước Công Dân phải là số")
      .test(
        "len",
        "Số Căn Cước Công Dân phải có đúng 10 số",
        (val) => val && val.toString().length === 10
      )
      .required("Số Căn Cước Công Dân không được để trống"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      firstName: "",
      lastName: "",
      personID: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const apiUrl = `http://localhost:8080/api/users/${id}`;

      const updatedUserData = {
        phoneNumber: values.phoneNumber || user.phoneNumber,
        firstName: values.firstName || user.firstName,
        fullName: values.lastName || user.lastName,
        personID: values.personID || user.personID,
        gender: values.gender || user.gender,
      };
      const response = await axios.put(apiUrl, updatedUserData);

      if (response.status === 204) {
        toast.success("User data updated successfully");
        setCheckModal(false);
      } else {
        toast.error("Failed to update user data");
      }
    },
  });

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
    formik.setFieldValue("gender", selectedGender);
  };
  const editProfile = (
    <>
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Số điện thoại"
                type="phoneNumber"
                value={formik.values.phoneNumber || user?.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="Tên"
                value={formik.values.firstName || user?.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Họ"
                value={formik.values.lastName || user?.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="personID"
                label="Số Căn Cước Công Dân"
                value={formik.values.personID || user?.personID}
                onChange={formik.handleChange}
                error={formik.touched.personID && Boolean(formik.errors.personID)}
                helperText={formik.touched.personID && formik.errors.personID}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Giới tính</FormLabel>
                <div className="d-flex">
                  <Button
                    onClick={() => handleGenderClick("MALE")}
                    variant={gender === "MALE" ? "contained" : "outlined"}
                    className="mx-1"
                  >
                    Nam
                  </Button>
                  <Button
                    onClick={() => handleGenderClick("FEMALE")}
                    variant={gender === "FEMALE" ? "contained" : "outlined"}
                    className="mx-1"
                  >
                    Nữ
                  </Button>
                  <Button
                    onClick={() => handleGenderClick("OTHER")}
                    variant={gender === "OTHER" ? "contained" : "outlined"}
                    className="mx-1"
                  >
                    Khác
                  </Button>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="d-flex justify-content-center">
              <ButtonForMe
                value={50}
                childrenButton={"Lưu"}
                colorButton={"orangered"}
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );

  useEffect(() => {
    const axiosData = async () => {
      axios.get(`http://localhost:8080/api/users/${id}`).then((res) => {
        setUser(res.data);
        setUploadedImageUrl(res.data.photoUrl);
        setGender(res.data.gender);
        formik.setValues({});
        setIsLoading(false);
      });
    };
    axiosData();
  }, [id, checkModal]);

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
            .put(`http://localhost:8080/api/users/photo/${id}`, photoEmployee)
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
  if (isLoading) {
    return <LoadingCommon />;
  }

  return (
    <>
      <ContainerViewUser idUser={id} />
      <div className="container-profile-user" style={{ margin: "0px 90px", padding: "0 15px" }}>
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
              Hồ sơ bạn như thế này, hãy hoàn thiện hồ sơ để việc tìm kiếm hộ lý có thể triển khai nhanh hơn.
            </span>
          </div>
        </div>
        <h6 className="my-profile" style={{ padding: "25px 0" }}>
          <AccountBoxIcon />
          Thông tin của tôi
        </h6>

        <div className="my-profile-header" style={{ display: "flex" }}>
          <div
            className="my-profile-header-form"
            style={{ display: "flex", borderRight: "1px solid #e7e7e7", width: "33%" }}
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
                    src={
                      uploadedImageUrl ||
                      "https://res.cloudinary.com/dw4xpd646/image/upload/v1703929545/Cloudinary-React/gfxdp8xr8hhsdx0jxyea.png"
                    }
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
                Tải ảnh lên
              </label>
            </div>
            <div style={{ margin: " 43px 10px 0 20px" }}>
              <h5>
                {user?.lastName} {user?.firstName}
              </h5>

              <div style={{ fontSize: "14px" }}>{user?.email}</div>
              <div style={{ fontSize: "14px" }}>{user?.time} </div>
              <div
                onClick={() => setCheckModal(true)}
                style={{ textAlign: "center", marginTop: "50px", color: "blue", cursor: "pointer" }}
              >
                Sửa hồ sơ
              </div>
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
              <span style={{ fontWeight: "bold" }}>Thông tin thành viên </span>
            </div>
            <div
              style={{
                width: "760px",
                backgroundColor: "#f5f5f5",
                paddingLeft: "15px",
              }}
            >
              <div className="row" style={{ padding: "15px 0 5px"  }}>
                <span className="col-3" style={{ fontWeight: "bold", fontSize: "13px" }}>Thơi gian tạo tài khoản </span>
                <span className="col-3" style={{ fontSize: "11px",  cursor: "pointer" }}>
                  {user?.time}
                </span>
              </div>
              <div className="row" style={{ padding: "5px 0" }}>
                <span className="col-3" style={{ fontWeight: "bold", fontSize: "13px" }}>Trạng thái tài khoản</span>
                <span className="col-3" style={{ fontSize: "11px",  cursor: "pointer" }}>
                  Đang hoạt động
                </span>
              </div>
              <div className="row" style={{ padding: "5px 0 15px" }}>
                <span className="col-3" style={{ fontWeight: "bold", fontSize: "13px" }}>Gói thành viên </span>
                <span className="col-3" style={{ fontSize: "11px",  cursor: "pointer" }}>
                  Thường
                </span>
              </div>
            </div>
            <div
              style={{
                width: "760px",
                borderTop: "1px solid #e7e7e7",
                height: "26px",
                backgroundColor: "#e7e7e7",
                borderTopRightRadius: "25px",
                borderTopLeftRadius: "25px",
                paddingLeft: "15px",
                marginTop: "25px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Preferences </span>
            </div>
            <div
              style={{
                width: "760px",
                backgroundColor: "#f5f5f5",
                paddingLeft: "15px",
                marginBottom: "40px",
              }}
            >
              {preferencesRender.map((e) => (
                <div key={e.id} style={{ padding: "5px 0 ", color: "#737373" }}>
                  <DoneAllIcon />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LegalNotice />
      <ModalUnstyled
        paddingCheck={"20px"}
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={editProfile}
        widthForm={"40%"}
        heightForm={"80%"}
      />
    </>
  );
}
