import React, { useState } from "react";
import "./Availability.css";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import { SideBarFindJob } from "../sideBarFindJob/SideBarFindJob";

import { SelectDate } from "../../../selectDate/SelectDate";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { ButtonForMe } from "../../../ButtonForMe";
import axios from "axios";
import { toast } from "react-toastify";

export function Availability() {
  const { id } = useParams();
  const [value, setValue] = useState();
  let navigate = useNavigate();

  const handleSubmitAvailability = async () => {
    try {
      if (Object.keys(value).length === 0) {
        toast.error("Chọn ngày làm");
        return;
      }

      const transformedData = Object.keys(value).map((day) => ({
        date: day,
        sessionOfDateList: value[day],
      }));

      await axios.put(`http://localhost:8080/api/employees/dateSessions/${id}`, {
        listDateSession: transformedData,
      });

      navigate(`/assistant/experience/${id}`);
      toast.success("Hoàn thành cập nhật ngày có thể làm");
    } catch (error) {
      console.error("Lỗi khi gửi PUT request:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const needCare = (
    <div className="col-9 ">
      <h4 className="availability-title">Lịch làm của tôi</h4>
      <p className="availability-value">
        Hãy cho chúng tôi biết lịch trình hàng tuần của bạn thường như thế nào. Nếu cần, rất dễ để
        quay lại và chỉnh sửa nó khi đăng nhập lại
      </p>
      <h6>Tôi có thể làm việc vào...</h6>
      <div className="date-session-map-job">
        <SelectDate paddingSpan={"12px"} setValue={setValue} />
      </div>
      <div style={{ textAlign: "end", margin: " 0 50px 40px 0" }}>
        <ButtonForMe
          childrenButton={"Tiếp theo"}
          colorButton={"#213f5f"}
          onclick={handleSubmitAvailability}
        />
      </div>
    </div>
  );

  return (
    <NavBarFindJob
      children={<SideBarFindJob col={"col-4"} value={needCare} check={true} activeIds={[1, 2]} />}
    />
  );
}
