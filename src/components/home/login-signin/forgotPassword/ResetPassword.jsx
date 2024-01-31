import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FrameLoginSignIn } from "../frameLoginSignIn/FrameLoginSignIn";
import { Grid, TextField } from "@mui/material";
import { ButtonForMe } from "../../../ButtonForMe";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoadingPage from "../../../common/LoadingPage";

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp.")
      .required("Vui lòng nhập lại mật khẩu."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const passSubmit = {
        newPassword: values.password,
      };
      axios
        .post(`http://localhost:8080/api/auth/reset-password${window.location.search}`, passSubmit)
        .then((resp) => {
          setIsLoading(false);
          toast.success("Thay đổi mật khẩu thành công");
          navigate("/login");
        })
        .catch((err) => {
          setIsLoading(false);

          console.log("b", err);
        });
    },
  });

  const forgotPassword = (
    <>
      <div className="forgot-password-container">
        <h2> Nhập mật khẩu của bạn</h2>
        <div className="forgot-password-header"></div>
        <span>Vui lòng nhập mật khẩu .</span>
        <form className="mt-2" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Mật khẩu"
                size="small"
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
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                size="small"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>

            <div className="forgot-password-button">
              {isLoading ? (
                <div style={{ marginLeft: "70%" }}>
                  <LoadingPage />
                </div>
              ) : (
                <>
                  <div className="forgot-password-button-left">
                    <NavLink to={"/login"} className="forgot-password-button-left-style-nav-link">
                      <div className="forgot-password-button-left-style">
                        <span>Hủy</span>
                      </div>
                    </NavLink>
                  </div>
                  <Grid item xs={4} className="forgot-password-button-right">
                    <ButtonForMe value={100} childrenButton={"Xác nhận"} type="submit" />
                  </Grid>
                </>
              )}
            </div>
          </Grid>
        </form>
      </div>
    </>
  );

  return <FrameLoginSignIn children={forgotPassword} />;
}
