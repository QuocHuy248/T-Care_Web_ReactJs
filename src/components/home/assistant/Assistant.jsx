import React from "react";
import "./Assistant.css";
import { Star, StarHalf } from "@mui/icons-material";

export function Assistant({ employee }) {

  const roundedStars = Math.ceil(employee?.employeeStar * 2) / 2;
  const hasHalfStar = roundedStars - Math.floor(roundedStars) > 0;

  return (
    <div className="mx-2 border-profile bg-white">
      <div className="m-3 d-flex border-bottom pb-4">
        <img src={employee?.photoURL} alt="" className="img-profile-assistant" />
        <div className="ms-3">
          <h4>{employee?.employeeName}</h4>
          <h6>{employee?.employeeLocation}</h6>
          <div className="d-flex">
            {new Array(Math.floor(roundedStars)).fill(1).map((item, index) => (
              <Star key={index} style={{ color: "yellow" }}  />
            ))}
            {hasHalfStar && <StarHalf style={{ color: "yellow" }} />}
            <span className="m5-fs12">
              (<span>{employee?.employeeRateQuantity}</span>)
            </span>
          </div>
        </div>
      </div>
      <div className="m-3">
        <p className="h72">"{employee?.content}"</p>
      </div>
      <div className="m-3">
        <h6>{employee?.userName}.</h6>
      </div>
    </div>
  );
}
