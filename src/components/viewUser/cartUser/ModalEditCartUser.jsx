import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ModalUnstyled from "../../ModalToMe";
import { ButtonForMe } from "../../ButtonForMe";
import axios from "axios";

import {
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
export function ModalEditCartUser({
  noteForEmployee,
  setFirstName,
  setNoteForEmployee,
  firstName,
  handleChangeMemberOfFamily,
  checkModal,
  setCheckModal,
  handleGenderClick,
  ageRender,
  decade,
  member,
  idCart,
  setPhone,
  phone,
  handleChangeAge,
  memberOfFamilyList,
  setNoteForPatient,
  noteForPatient,
  setLastName,
  lastName,
  setGender,
  gender,
  
}) {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      decade !== "" &&
      gender !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      member !== "" &&
      noteForEmployee !== "" &&
      noteForPatient !== ""
    ) {
      const formSubmit = {
        decade,
        gender,
        firstName,
        lastName,
        memberOfFamily: member,
        noteForEmployee,
        noteForPatient,
        phone,
      };
      axios.put(`http://localhost:8080/api/carts/updateField/${idCart}`, formSubmit).then((res) => {
        toast.success("Cập nhật thông tin thành công");
        setCheckModal(false);
      });
    } else {
      toast.error("Nhập đầy đủ thông tin ( có thể bỏ qua số điện thoại)");
    }
  };
  const editCart = (
    <div>
      <div style={{ padding: " 20px 29%" }}>
        <span style={{ fontWeight: "bold", fontSize: "25px" }}>Thông tin người bệnh</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              label="Tên"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Họ"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phoneNumber"
              label="Số điện thoại"
              type="phoneNumber"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <FormControl sx={{ mt: 2, mx: 2, width: 295 }}>
                <InputLabel id="member-label">Thành viên</InputLabel>
                <Select
                  labelId="member-label"
                  id="member"
                  value={member || ""}
                  onChange={handleChangeMemberOfFamily}
                  autoWidth
                  label="Member"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {memberOfFamilyList.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ mt: 2, width: 295 }}>
                <InputLabel id="age-label">Tuổi</InputLabel>
                <Select
                  labelId="age-label"
                  id="age"
                  value={decade || ""}
                  onChange={handleChangeAge}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ageRender.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="mb-3">
              <textarea
                defaultValue={noteForPatient}
                className="form-control"
                rows="3"
                placeholder="Nhập thông tin người cần chăm sóc"
                onChange={(e) => setNoteForPatient(e.target.value)}
              ></textarea>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="mb-3">
              <textarea
                defaultValue={noteForEmployee}
                className="form-control"
                rows="3"
                placeholder="Nhập thông tin người cần yêu cầu cho trợ lý"
                onChange={(e) => setNoteForEmployee(e.target.value)}
              ></textarea>
            </div>
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
              value={20}
              childrenButton={"Hủy"}
              colorButton={"rgb(116 116 116)"}
              onclick={(e) => setCheckModal(false)}
              marginMe={" 0 10px 0 0"}
            />
            <ButtonForMe
              value={30}
              childrenButton={"Lưu"}
              colorButton={"orangered"}
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
  return (
    <>
      <ModalUnstyled
        paddingCheck={"20px"}
        check={checkModal}
        onClose={() => setCheckModal(false)}
        children={editCart}
        widthForm={"50%"}
        heightForm={"80%"}
      />
    </>
  );
}
