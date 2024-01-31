import React from "react";
import Button from "@mui/material/Button";

export function InfoIndexSale({ value, selectedInfos, setSelectedInfos }) {
  const handleSelectInfo = (e) => {
    const isInfoSelected = selectedInfos?.some((element) => element === e);
    if (isInfoSelected) {
      const updatedInfos = selectedInfos?.filter((element) => element !== e);
      setSelectedInfos(updatedInfos);
    } else {
      setSelectedInfos((prev) => [...prev, e]);
    }
  };
  return (
    <Button
      key={value.id}
      className={`index-user-body-skill-render${
        selectedInfos.includes(value.id) ? "-active" : ""
      }`}
      onClick={() => handleSelectInfo(value.id)}
    >
      {value.name}
    </Button>
  );
}
