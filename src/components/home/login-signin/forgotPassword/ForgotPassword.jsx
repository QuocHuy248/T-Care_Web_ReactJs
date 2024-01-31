import React, { useState } from "react";
import { useFormik } from "formik";
import { FrameLoginSignIn } from "../frameLoginSignIn/FrameLoginSignIn";
import { Grid, TextField } from "@mui/material";
import { ButtonForMe } from "../../../ButtonForMe";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./ForgotPassword.css";
import { toast } from "react-toastify";
import LoadingPage from "../../../common/LoadingPage";
export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const emailSubmit = {
        email: values.email,
      };
      axios
        .post("http://localhost:8080/api/auth/check-mail", emailSubmit)
        .then((resp) => {
          axios
            .post("http://localhost:8080/api/auth/password-reset-request", emailSubmit)
            .then((res) => {
              toast.success("Vui lòng kiểm tra Email của bạn");
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              toast.error("Vui lòng kiểm tra Email của bạn");
            });
        })
        .catch((err) => {
          setIsLoading(false);

          toast.error("Email không tồn tài");
        });
    },
  });

  const forgotPassword = (
    <>
      <div className="forgot-password-container">
        <h2> Nhập Email của bạn</h2>
        <div className="forgot-password-header"></div>
        <span>Vui lòng nhập email để tìm kiếm tài khoản của bạn.</span>
        <form className="mt-2" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                size="small"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                    <ButtonForMe value={100} childrenButton={"Tìm kiếm"} type="submit" />
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
