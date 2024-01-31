import React, { useEffect, useState } from "react";
import LogoProject from "../../../logoProject/LogoProject";
import { LegalNotice } from "../../../carehub/LegalNotice";
import { useNavigate, useParams } from "react-router-dom";
import "./DateSession.css";
import { ButtonForMe } from "../../../ButtonForMe";
import { SelectDate } from "../../../selectDate/SelectDate";
import DateBetween from "./DateBetween";
import { toast } from "react-toastify";
import axios from "axios";
import "./DateSession.css";
import LoadingPage from "../../../common/LoadingPage";

export function DateSession() {
  const [value, setValue] = useState();
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [dayInWeek, setDayInWeek] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();
  const getDaysInRange = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push({
        date: new Date(currentDate),
        dayOfWeek: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };
  const handleDay = (objectDay) => {
    const dateValue = objectDay?.$d;
    const formattedDate = dateValue?.toLocaleDateString("en-GB");
    return formattedDate;
  };
  useEffect(() => {
    if (selectedDate != null) {
      const daysInRange = getDaysInRange(selectedDate[0], selectedDate[1]);
      const dayInWeekSelect = daysInRange.map((e) => e.dayOfWeek);
      setDayInWeek(dayInWeekSelect);
      setStartDay(handleDay(selectedDate[0]));
      setEndDay(handleDay(selectedDate[1]));
    }
  }, [selectedDate]);

  const handleSubmitDate = async () => {
    setIsLoadingPage(true);
    try {
      if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
        toast.error("Vui lòng ngày bắt đầu và ngày kết thúc");
        return;
      }

      const startDate = selectedDate[0];
      const endDate = selectedDate[1];
      const currentDate = new Date();

      if (startDate <= currentDate) {
        toast.error("Vui lòng điền ngày bắt đầu lớn hơn ngày hiện tại");
        setIsLoadingPage(false);

        return;
      }

      if (endDate <= startDate) {
        toast.error("Vui lòng điền ngày kết thúc phải lớn hơn ngày bắt đầu");
        setIsLoadingPage(false);

        return;
      }

      if (Object.keys(value).length === 0) {
        toast.error("Vui lòng điền thời gian trong tuần bạn muốn thuê");
        setIsLoadingPage(false);

        return;
      }

      const transformedData = Object.keys(value).map((day) => ({
        date: day,
        sessionOfDateList: value[day],
      }));

      await axios.put(`http://localhost:8080/api/carts/dateSessions/${id}`, {
        listDateSession: transformedData,
        timeStart: startDay,
        timeEnd: endDay,
      });

      navigate(`/user/need-care/${id}`);
      toast.success("Hoàn thành hồ sơ ngày thuê");
      setIsLoadingPage(false);
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      setIsLoadingPage(false);
    }
  };
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>

        <div className="row ">
          <div className="col-8 header"></div>
        </div>
      </div>
      <div className="d-flex mt-5 date-session">
        <div>
          <h4>Bạn cần chăm sóc những ngày nào?</h4>
        </div>
      </div>
      <div className="date-session-map">
        <div className="m0-400">
          <DateBetween
            onChange={handleDateChange}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
        <div className="mtop-20">
          {selectedDate && selectedDate[0] && selectedDate[1] && (
            <SelectDate dayInWeek={dayInWeek} setValue={setValue} />
          )}{" "}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        {/* Đừng lo lắng, bạn luôn có thể chỉnh sửa nó sau. */}
      </div>

      <div className="mt-2 mb-5 button-date-session">
        {isLoadingPage ? (
          <div style={{ marginRight: "17%" }}>
            <LoadingPage />
          </div>
        ) : (
          <ButtonForMe childrenButton={"Tiếp theo"} onclick={handleSubmitDate} />
        )}
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
