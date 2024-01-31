import { Checkbox, Radio } from "@mui/material";
import React, { useState } from "react";
import "./RadioService.css";

export function RadioService({ value, selectedRadioId, setSelectedRadioId }) {
  console.log(value);
  return value?.map((e) => {
    const sentences = e.description.split('.');

    return (
      <div
        key={e.id}
        className={`d-flex mb-3 py-3 radioService${selectedRadioId === e.id ? "-active" : ""}`}
      >
        <div className="w300">
          <label htmlFor={e.id}>
            <h5 className="mx-3 mb-0">{e.name} ({Math.round(e.price).toLocaleString()} VND)</h5>
            {sentences.map((sentence, index) => (
              sentence.length > 0 && <span key={index} className="mx-3">- {sentence.trim()}<br /></span>
            ))}
          </label>
        </div>
        <div>
          <Radio checked={selectedRadioId === e.id} id={e.id} value={e.id} onChange={() => setSelectedRadioId(e.id)} />
        </div>
      </div>
    );
  });
}
