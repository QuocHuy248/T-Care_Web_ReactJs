import React from "react";

import Button from "@mui/material/Button";


export function SkillIndexSaleEdit({ value,skillIdRequest,setSkillIdRequest }) {
    
    const handleSelectSkill = (e) => {
       
        if (skillIdRequest.includes(e)) {
          const updatedSkills = skillIdRequest?.filter((element) => element !== e);
          setSkillIdRequest(updatedSkills);
        } else {
            setSkillIdRequest((prevSkills) => [...prevSkills, e]); 
           
          }
      };

  return (
    <Button
    key={value.id}
    className={`index-user-body-skill-render${
      skillIdRequest.includes(value.id) ? "-active" : ""
    }`}
    onClick={() => handleSelectSkill(value.id)}
  >
    {value.name}
  </Button>
  );
}
