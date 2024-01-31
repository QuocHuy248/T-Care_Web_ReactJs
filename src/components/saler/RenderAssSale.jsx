  import React, { useEffect, useState } from "react";
  import { Checkbox } from "@mui/material";
  import { Star, StarHalf } from "@mui/icons-material";
  import ButtonClick from "./ButtonClick";

  export function RenderAssSale({ setIsOpen, handleCheckboxChange, isChecked, listFilterAss,handleClick }) {
    return (
      <>
        {listFilterAss?.map((e) => (
          <div key={e?.id} className="render-list-assistant-body-render">
            <div className="render-list-assistant-body-render-container">
              <div className="d-flex render-list-assistant-body-render-container-header">
                <img
                style={{ width: '75px', height: '100px' }}
                  // src="https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_938720.jpg"
                  alt=""
                  src={e?.photoUrl}
                />
                <div className="render-list-assistant-body-render-container-header-information">
                  <h6 className="m-0">
                    {e?.firstName} {e?.lastName}
                  </h6>
                  <div className="d-flex">
                    {new Array(Math.floor(Math.ceil(e?.starAverage * 2) / 2))
                      .fill(1)
                      .map((item, index) => (
                        <Star key={index} style={{ color: "yellow" }} />
                      ))}
                    {Math.ceil(e?.starAverage * 2) / 2 -
                      Math.floor(Math.ceil(e?.starAverage * 2) / 2) >
                      0 && <StarHalf style={{ color: "yellow" }} />}
                    <span className="ml-5-fs12-mt3">
                      (<span >{e?.rateQuantity}</span>)
                    </span>
                   
                    
                  </div>
                  <div>
                    <span>{e?.nameLocation}</span>
                  </div>
                  <div>
                    <span> Số điện thoại: <strong>{e?.phone}</strong></span>
                  </div>
                  <div>
                    <span> Khoảng cách: <strong>{e?.distanceToWork && e.distanceToWork.toFixed(2)} </strong>km</span>
                  </div>
                  <div>
                    <span> Số năm kinh nghiệm: <strong>{e?.experience && e.experience} </strong>năm</span>
                  </div>
                </div>  
                <div>
                  <ButtonClick onclick={() => handleClick(e.id)} />
                </div>
              </div>
              <div className="d-flex mt-3 render-list-assistant-body-render-container-body">
                <div className="ms-4">{e.descriptionAboutMySelf}
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
