import React from "react";
import Button from "@mui/material/Button";

export function InfoIndexUser({ value, selectedInfos, setSelectedInfos }) {
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
        selectedInfos.includes(value.name) ? "-active" : ""
      }`}
      onClick={() => handleSelectInfo(value.name)}
    >
      {value.name}
    </Button>
  );
}
