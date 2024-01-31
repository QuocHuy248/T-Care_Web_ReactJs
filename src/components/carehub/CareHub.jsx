import React from "react";
import YouTube from "@mui/icons-material/YouTube";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import './CareHub.css'

import Facebook from "@mui/icons-material/Facebook";
import { LegalNotice } from "./LegalNotice";
export function CareHub() {
  return (
    <div className="care-hub"  >
      <div className="care-hub-container"  >
        <div className="d-flex care-hub-header" >
          <div className="mx-2">
            <Facebook className="facebook icons"  />
          </div>
          <div className="mx-2">
            <Twitter className="twitter icons"  />
          </div>
          <div className="mx-2">
            <YouTube className="youtube icons"  />
          </div>
          <div className="mx-2">
            <Instagram className="instagram icons"  />
          </div>
        </div>
        <div
          className="row mt-5 pb-5 d-flex care-hub-body"
        >
          <div className="col-3">
            <h6>Về T-Care</h6>
            <p className="m-0">Về chúng tôi</p>
            <p className="m-0">Lịch sử</p>
            <p className="m-0">Điều khoản và dịch vụ</p>
            <p className="m-0">Chính sách bảo mật</p>
          </div>
          <div className="col-3">
            <h6>Giúp đỡ</h6>
            <p className="m-0">An toàn</p>
            <p className="m-0">Hướng dẫn</p>
            <p className="m-0">Trung tâm hỗ trợ</p>
          </div>
          <div className="col-3">
            <h6>Chính sách giúp đỡ người cao tuổi</h6>
            <p className="m-0">Chăm sóc người cao tuổi</p>
            <p className="m-0">Chăm sóc tại nhà</p>
            <p className="m-0">Cộng đồng người hỗ trợ</p>
            <p className="m-0">Công việc chăm sóc người cao tuổi</p>
            <p className="m-0">Hướng dẫn chăm sóc</p>
          </div>
          <div className="col-3">
            <h6>Tìm kiếm</h6>
            <p className="m-0">HomePay℠ - thanh toán</p>
            <p className="m-0">Danh sách dịch vụ</p>
            <p className="m-0">Chính sách công ty</p>
            <p className="m-0">Gia nhập chúng tôi</p>
            <p className="m-0">Điều khoản chăm sóc</p>
          </div>
        </div>

        <LegalNotice/>
      </div>
    </div>
  );
}
