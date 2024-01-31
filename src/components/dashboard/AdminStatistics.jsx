import React, { useEffect, useState } from "react";
import { ContainerDashboard } from "./ContainerDashboard";
import { PieChart } from "@mui/x-charts/PieChart";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axios from "axios";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import LoadingCommon from "../common/LoadingCommon";

export function AdminStatistics() {
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [selectedMonth, setSelectedMonth] = useState([null, null]);
  const [selectedYear, setSelectedYear] = useState([null, null]);
  const [dateTotal, setDateTotal] = useState([]);
  const [monthTotal, setMonthTotal] = useState([]);
  const [yearTotal, setYearTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const convertDate = (data) => {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, "0");
    const day = String(data.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const fetchData = async (dayData, setTotalFunction) => {
      try {
        if (dayData.startDay && dayData.endDay) {
          const response = await axios.post(
            "http://localhost:8080/api/admin/revenue/contract",
            dayData
          );
          setTotalFunction(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const selectNewDate = dayjs();
    console.log(selectNewDate);
    const startOfDay = selectNewDate.startOf("day");
    const endOfDay = selectNewDate.endOf("day");

    const formattedStartOfDay = convertDate(startOfDay.toDate());
    const formattedEndOfDay = convertDate(endOfDay.toDate());
    const dayData = {
      startDay: formattedStartOfDay,
      endDay: formattedEndOfDay,
    };
    setSelectedDate([selectNewDate, selectNewDate]);
    fetchData(dayData, setDateTotal);

    const selectNewMonth = dayjs();
    const newDateOfMonth = new Date(selectNewMonth);
    const firstDayOfMonth = new Date(newDateOfMonth.getFullYear(), newDateOfMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(newDateOfMonth.getFullYear(), newDateOfMonth.getMonth() + 1, 0);
    const formattedFirstDayMonth = convertDate(firstDayOfMonth);
    const formattedLastDayMonth = convertDate(lastDayOfMonth);
    const monthData = {
      startDay: formattedFirstDayMonth,
      endDay: formattedLastDayMonth,
    };
    setSelectedMonth(selectNewMonth);
    fetchData(monthData, setMonthTotal);

    const selectNewYear = dayjs();
    const newDateOfYear = new Date(selectNewYear);
    const firstDayOfYear = new Date(newDateOfYear.getFullYear(), 0, 1);
    const lastDayOfYear = new Date(newDateOfYear.getFullYear() + 1, 0, 0);
    const formattedFirstDayYear = convertDate(firstDayOfYear);
    const formattedLastDayYear = convertDate(lastDayOfYear);
    const yearData = {
      startDay: formattedFirstDayYear,
      endDay: formattedLastDayYear,
    };
    setSelectedYear(selectNewYear);
    fetchData(yearData, setYearTotal);
    setIsLoading(false);
  }, []);
  //   console.log(selectedDate)
  const handleDateRangeChange = async (newDateRange) => {
    const formattedDatesArray = newDateRange?.map((dateObject) => {
      if (dateObject && dateObject.$d) {
        const date = new Date(dateObject.$d);
        const formatDate = convertDate(date);
        return formatDate;
      }
    });
    const day = {
      startDay: formattedDatesArray[0],
      endDay: formattedDatesArray[1],
    };
    if (newDateRange[0] !== null && newDateRange[1] !== null) {
      const responseRevenue = await axios.post(
        "http://localhost:8080/api/admin/revenue/contract",
        day
      );

      setDateTotal(responseRevenue.data);
    }
    setSelectedDate(newDateRange);
  };
  const handleMonthChange = (newDateRange) => {
    const currentDate = new Date(newDateRange.$d);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const formattedFirstDay = convertDate(firstDayOfMonth);
    const formattedLastDay = convertDate(lastDayOfMonth);
    const day = {
      startDay: formattedFirstDay,
      endDay: formattedLastDay,
    };
    if (newDateRange !== null) {
      axios.post("http://localhost:8080/api/admin/revenue/contract", day).then((res) => {
        setMonthTotal(res.data);
      });
    }
    setSelectedMonth(newDateRange);
  };
  const handleYearChange = (newDateRange) => {
    const currentDate = new Date(newDateRange.$d);
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const lastDayOfYear = new Date(currentDate.getFullYear() + 1, 0, 0);
    const formattedFirstDay = convertDate(firstDayOfYear);
    const formattedLastDay = convertDate(lastDayOfYear);
    const day = {
      startDay: formattedFirstDay,
      endDay: formattedLastDay,
    };
    if (newDateRange !== null) {
      axios.post("http://localhost:8080/api/admin/revenue/contract", day).then((res) => {
        setYearTotal(res.data);
      });
    }
    setSelectedYear(newDateRange);
  };
  if (isLoading) {
    return <LoadingCommon />;
  }
  console.log(yearTotal);
  return (
    <>
      <ContainerDashboard />
      <div
        style={{ padding: "30px 60px", backgroundColor: "#f5f7fb", justifyContent: "space-around" }}
        className="row"
      >
        <div
          className="col-8"
          style={{
            padding: "30px ",
            backgroundColor: "white",
            borderRadius: "30px",
            border: "1px solid",
          }}
        >
          <span style={{ fontWeight: "600", fontSize: "25px" }}>Doanh thu theo ngày</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker
                value={selectedDate}
                onChange={handleDateRangeChange}
                localeText={{ start: "Bắt đầu", end: "Kết thúc" }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ marginTop: "20px" }}>
            {dateTotal.feeAmountRevenue == 0 && dateTotal.feeContactRevenue == 0 ? (
              <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
            ) : (
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: dateTotal?.feeAmountRevenue || 0 + dateTotal?.feeContactRevenue || 0,
                        label: "Tổng doanh thu",
                      },
                      {
                        id: 1,
                        value: dateTotal?.feeAmountRevenue || 0,
                        label: "Doanh thu sản phẩm",
                      },
                      { id: 2, value: dateTotal?.feeContactRevenue || 0, label: "Doanh thu khác" },
                    ],
                  },
                ]}
                sx={{ width: "100%" }}
                height={200}
              />
            )}
          </div>
        </div>
        <div
          className="col-8"
          style={{
            padding: "30px ",
            backgroundColor: "white",
            borderRadius: "30px",
            border: "1px solid",
            marginTop: "40px",
          }}
        >
          <span style={{ fontWeight: "600", fontSize: "25px", marginRight: "30px" }}>
            Doanh thu theo tháng
          </span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Chọn tháng"
              value={selectedMonth}
              onChange={(date) => handleMonthChange(date)}
            />
          </LocalizationProvider>
          <div style={{ marginTop: "20px" }}>
            {monthTotal.feeAmountRevenue == 0 && monthTotal.feeContactRevenue == 0 ? (
              <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
            ) : (
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value:
                          monthTotal?.feeAmountRevenue || 0 + monthTotal?.feeContactRevenue || 0,
                        label: "Tổng doanh thu",
                      },
                      {
                        id: 1,
                        value: monthTotal?.feeAmountRevenue || 0,
                        label: "Doanh thu sản phẩm",
                      },
                      { id: 2, value: monthTotal?.feeContactRevenue || 0, label: "Doanh thu khác" },
                    ],
                  },
                ]}
                sx={{ width: "100%" }}
                height={200}
              />
            )}
          </div>
        </div>
        <div
          className="col-8"
          style={{
            padding: "30px ",
            backgroundColor: "white",
            borderRadius: "30px",
            border: "1px solid",
            marginTop: "40px",
          }}
        >
          <span style={{ fontWeight: "600", fontSize: "25px", marginRight: "30px" }}>
            Doanh thu theo năm
          </span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="Chọn Năm"
              value={selectedYear}
              onChange={(date) => handleYearChange(date)}
            />
          </LocalizationProvider>
          <div style={{ marginTop: "20px" }}>
            {yearTotal.feeAmountRevenue == 0 && yearTotal.feeContactRevenue == 0 ? (
              <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
            ) : (
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: yearTotal?.feeAmountRevenue || 0 + yearTotal?.feeContactRevenue || 0,
                        label: "Tổng doanh thu",
                      },
                      {
                        id: 1,
                        value: yearTotal?.feeAmountRevenue || 0,
                        label: "Doanh thu sản phẩm",
                      },
                      { id: 2, value: yearTotal?.feeContactRevenue || 0, label: "Doanh thu khác" },
                    ],
                  },
                ]}
                sx={{ width: "100%" }}
                height={200}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
