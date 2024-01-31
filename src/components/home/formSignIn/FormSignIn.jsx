import React, { useContext, useState } from "react";
import "./FormSignIn.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { ButtonForMe } from "../../ButtonForMe";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../common/LoadingPage";
import { textAlign } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../App";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  firstName: yup.string().required("Tên không được để trống"),
  lastName: yup.string().required("Họ không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận phải giống mật khẩu"),
  personID: yup
    .number()
    .typeError("Số Căn Cước Công Dân phải là số")
    .test(
      "len",
      "Số Căn Cước Công Dân phải có đúng 10 số",
      (val) => val && val.toString().length === 10
    )
    .required("Số Căn Cước Công Dân không được để trống"),
  termsAgreed: yup.bool().oneOf([true], "Bạn phải đồng ý với các điều khoản và dịch vụ"),
});

export function FormSignIn({ url, marginContainer, marginHeader, termAgreed, color, checkRole, api ,loginUser}) {
  const [gender, setGender] = useState("MALE");
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber : "",
      password: "",
      confirmPassword: "",
      personID: "",
      termsAgreed: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)

        await api(
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phone,
            password: values.password,
            gender: gender,
            personId: values.personID,
            role: checkRole,
          },
          navigate,
          url
        );
        if (loginUser) {
          const loginUser = async () => {
            const login = { username: values.email, password: values.password };
          
            try {
              const resp = await axios.post("http://localhost:8080/api/auth/login", login);
          
              if (resp.data.isUser) {
                const userDispatch = {
                  type: "UPDATE_ROLE",
                  payload: {
                    userId: resp.data.idAccount,
                    role: "ROLE_USER",
                  },
                };
                dispatch(userDispatch);
                localStorage.setItem("user", JSON.stringify(userDispatch));
                // navigate("/user/address/" + resp.data.idAccount);
              }
            } catch (error) {
              console.error("Đăng nhập thất bại", error);
              // Xử lý lỗi nếu cần thiết
            }
          };
          loginUser()
        }
        formik.resetForm();
        setIsLoading(false)
      } catch (error) {
        console.error("An error occurred during form submission:", error);
      }
    },
  });

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="container-form-sign-in" style={{ margin: marginContainer || "0 27%" }}>
      <div>
        <div className="form-sign-in-header" style={{ margin: marginHeader || "3% 16%" }}>
          <h3 className="form-sign-in-content">
            {marginHeader || "Một số thông tin về bản thân bạn"}
          </h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                label="Số điện thoại"
                type="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                label="Tên"
                value={formik.values.firstName}
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
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                label="Mật khẩu"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="personID"
                label="Số Căn Cước Công Dân"
                value={formik.values.personID}
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
            <Grid item xs={12}>
              <FormControlLabel
                className="term-agreed"
                control={
                  <Checkbox
                    checked={formik.values.termsAgreed}
                    onChange={formik.handleChange}
                    name="termsAgreed"
                    color="primary"
                  />
                }
                label={
                  termAgreed ||
                  " Khi chọn vào ô này, bạn đã chấp thuận với điều khoản và dịch vụ của công ty chúng tôi."
                }
              />
              {formik.touched.termsAgreed && formik.errors.termsAgreed && (
                <div className="error-message cl-red">
                  {formik.errors.termsAgreed}
                </div>
              )}
            </Grid>

            {!isLoading? <Grid item xs={12} className="d-flex justify-content-center">
              <ButtonForMe
                value={100}
                childrenButton={"Đăng kí"}
                colorButton={color}
                type="submit"
              />
            </Grid>
          : 
          <div style={{ padding:"20px 45%"}}>
            <LoadingPage />
          </div>
          }
          </Grid>
        </form>
      </div>
    </div>
  );
}
