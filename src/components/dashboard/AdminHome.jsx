import React, { useEffect, useState } from "react";
import "./ContainerDashboard.css";
import axios from "axios";
import LoadingCommon from "../common/LoadingCommon";
import { ContainerDashboard } from "./ContainerDashboard";
import { BarChart } from "@mui/x-charts/BarChart";

export function AdminHome() {
  const [listEmployee, setListEmployee] = useState();
  const [listUser, setListUser] = useState();
  const [revenue, setRevenue] = useState();
  const [week, setWeek] = useState();
  const [totalUser, setTotalUser] = useState();
  const [totalEmployee, setTotalEmployee] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const day = {
      startDay: "",
      endDay: "",
    };
    let axiosData = async () => {
      const responseRevenue = await axios.post(
        "http://localhost:8080/api/admin/revenue/contract",
        day
      );
      setRevenue(responseRevenue.data);

      const responseUser = await axios.get("http://localhost:8080/api/users");
      setListUser(responseUser.data);
      setTotalUser(responseUser?.data ? responseUser.data.length : 0);

      const responseEmployee = await axios.get("http://localhost:8080/api/employees");
      setListEmployee(responseEmployee.data);
      setTotalEmployee(
        responseEmployee?.data.totalElements ? responseEmployee.data.totalElements : 0
      );

      setIsLoading(false);
    };

    axiosData();
  }, []);
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const weeksData = [];
    function formatDate(month, day) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      const paddedMonth = month < 10 ? `0${month}` : `${month}`;
      const paddedDay = day < 10 ? `0${day}` : `${day}`;

      const formattedDate = `${currentYear}-${paddedMonth}-${paddedDay}`;
      return formattedDate;
    }

    for (let i = 0; i < 4; i++) {
      const startDay = formatDate(currentMonth, i * 7 + 1);
      const endDay = formatDate(currentMonth, (i + 1) * 7 + 1);

      weeksData.push({ startDay, endDay });
    }
    console.log(weeksData);
    let axiosData = async () => {
      const promises = weeksData.map(async (week) => {
        const responseRevenue = await axios.post(
          "http://localhost:8080/api/admin/revenue/contract",
          week
        );
        return responseRevenue.data;
      });
      const revenueData = await Promise.all(promises);
      setWeek(revenueData);
    };
    axiosData();
  }, []);
  if (isLoading) {
    return <LoadingCommon />;
  }
  const x = Array.from({ length: 21 }, (_, index) => -1 + 0.2 * index);
  return (
    <>
      <ContainerDashboard />
      <div className="container-dashboard-body">
        <h5>Trang quản lý</h5>
        <div
          className="row"
          style={{ justifyContent: "space-around", padding: "40px 0px", textAlign: "center" }}
        >
          <div
            className="col-2"
            style={{
              height: "130px",
              backgroundColor: "white",
              paddingTop: "3%",
              border: "1px solid #9f9b9b",
              borderRadius: "5px",
            }}
          >
            {(revenue?.feeAmountRevenue + revenue?.feeContactRevenue).toLocaleString() + " " + "VND"} <div>Tổng doanh thu</div>
          </div>
          <div
            className="col-2"
            style={{
              height: "130px",
              backgroundColor: "white",
              paddingTop: "3%",
              border: "1px solid #9f9b9b",
              borderRadius: "5px",
            }}
          >
            <div>{(revenue?.feeAmountRevenue).toLocaleString() + " " + "VND"}</div>
            <div>Doanh thu sản phẩm</div>
          </div>
          <div
            className="col-2"
            style={{
              height: "130px",
              backgroundColor: "white",
              paddingTop: "3%",
              border: "1px solid #9f9b9b",
              borderRadius: "5px",
            }}
          >
            <div>{(revenue?.feeContactRevenue).toLocaleString() + " " + "VND"}</div>
            <div>Doanh thu khác</div>
          </div>
          <div
            className="col-2"
            style={{
              height: "130px",
              backgroundColor: "white",
              paddingTop: "3%",
              border: "1px solid #9f9b9b",
              borderRadius: "5px",
            }}
          >
            <div>{totalEmployee}</div>

            <div>Hộ lý</div>
          </div>
          <div
            className="col-2"
            style={{
              height: "130px",
              backgroundColor: "white",
              paddingTop: "3%",
              border: "1px solid #9f9b9b",
              borderRadius: "5px",
            }}
          >
            <div>{totalUser}</div>
            <div>Khách hàng</div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            margin: "30px 0",
            border: "1px solid #9f9b9b",
            borderRadius: "5px",
          }}
        >
          <div style={{ padding: "15px 30px", borderBottom: "1px solid rgb(207 207 207)" }}>
            <span>Biểu đồ </span>
          </div>
          <div style={{ padding: " 30px 40px 0 40px" }}>
            <div className="d-flex">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#02B2AF",
                  marginRight: "10px",
                }}
              ></div>{" "}
              Tổng doanh thu
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#2E96FF",
                  marginRight: "10px",
                  marginLeft: "50px",
                }}
              ></div>{" "}
              Doanh thu sản phẩm
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#B800D8",
                  marginRight: "10px",
                  marginLeft: "50px",
                }}
              ></div>
              Doanh thu khác
            </div>
          </div>
          <div style={{ padding: "20px" }}>
           
            <BarChart
              series={[
                {
                  data: [
                    week[0]?.feeAmountRevenue + week[0]?.feeContactRevenue,
                    week[1]?.feeAmountRevenue + week[1]?.feeContactRevenue,
                    week[2]?.feeAmountRevenue + week[2]?.feeContactRevenue,
                    week[3]?.feeAmountRevenue + week[3]?.feeContactRevenue,
                  ],
                },
                {
                  data: [
                    week[0]?.feeAmountRevenue,
                    week[1]?.feeAmountRevenue,
                    week[2]?.feeAmountRevenue,
                    week[3]?.feeAmountRevenue,
                  ],
                },
                {
                  data: [
                    week[0]?.feeContactRevenue,
                    week[1]?.feeContactRevenue,
                    week[2]?.feeContactRevenue,
                    week[3]?.feeContactRevenue,
                  ],
                },
              ]}
              height={290}
              xAxis={[{ data: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"], scaleType: "band" }]}
              yAxis={[{ hide: false }]}

              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
