import React from "react";
import Button from "@mui/material/Button";

export function InfoIndexSaleEdit({ value,setInforIdRequest,infoIdRequest }) {
  const handleSelectInfo = (e) => {

    if (infoIdRequest.includes(e)) {
      const updatedInfos = infoIdRequest?.filter((element) => element !== e);
      setInforIdRequest(updatedInfos);
    } else {
        setInforIdRequest((prevSkills) => [...prevSkills, e]); 
    }
  };
  return (
    <Button
      key={value.id}
      className={`index-user-body-skill-render${
        infoIdRequest.includes(value.id) ? "-active" : ""
      }`}
      onClick={() => handleSelectInfo(value.id)}
    >
      {value.name}
    </Button>
  );
}
