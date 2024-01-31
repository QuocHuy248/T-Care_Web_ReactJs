import React, { useEffect, useState } from "react";
import "./RenderAss.css";
import { Radio } from "@mui/material";
import { Star, StarHalf } from "@mui/icons-material";

export function RenderAss({
  setIsOpen,
  setSelectedAssistant,
  selectedAssistant,
  listFilterAss,
  setProfileAssistant,
}) {

  return (
    <>
      {listFilterAss?.map((e) => (
        <div key={e?.id} className="render-list-assistant-body-render">
          <div className="render-list-assistant-body-render-container">
            <div className="d-flex render-list-assistant-body-render-container-header">
              <img alt="" src={e?.photoUrl} style={{ width: "75px", height: "100px" }} />
              <div className="render-list-assistant-body-render-container-header-information">
                <h6 className="m-0">
                  {e?.firstName} {e?.lastName}
                </h6>
                <div className="d-flex">
                  {e && e.starAverage !== null && e.rateQuantity !== null && (
                    <>
                      {Array.from({ length: Math.floor(e.starAverage * 2) / 2 })
                        .fill(1)
                        .map((item, index) => (
                          <Star key={index} style={{ color: "yellow", fontSize: "18px", marginTop:"3px" }} />
                        ))}
                      {e.starAverage % 1 !== 0 && <StarHalf style={{ color: "yellow", fontSize: "18px", marginTop:"3px" }} />}
                      <span className="ml-5-fs12-mt3">
                        (<span style={{ fontSize: "14px"}}>{e.rateQuantity}</span>)
                      </span>
                    </>
                  )}
                </div>
                <div>
                  <span style={{ fontSize: "14px"}}>{e?.nameLocation}</span>
                </div>
              </div>
              <div>
                <Radio
                  checked={selectedAssistant?.id === e.id}
                  onChange={() =>  setSelectedAssistant(e)}
                />
              </div>
            </div>
            <div className="d-flex mt-3 render-list-assistant-body-render-container-body">
              <div className="ms-4">
                {e?.descriptionAboutMySelf?.slice(0, 100)}
                {e?.descriptionAboutMySelf?.length > 100 ? "..." : ""}{" "}
                <span onClick={() => (setIsOpen(true), setProfileAssistant(e))}>Đọc thêm</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
