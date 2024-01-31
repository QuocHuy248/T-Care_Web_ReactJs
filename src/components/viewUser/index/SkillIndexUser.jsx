import React from "react";

import Button from "@mui/material/Button";


export function SkillIndexUser({ value, selectedSkills, setSelectedSkills }) {
    const handleSelectSkill = (e) => {
        const isSkillSelected = selectedSkills?.some((element) => element === e);
        if (isSkillSelected) {
          const updatedSkills = selectedSkills?.filter((element) => element !== e);
          setSelectedSkills(updatedSkills);
        } else {
          setSelectedSkills((prevSkills) => [...prevSkills, e]);
        }
      };
     
  return (
    <Button
    key={value.id}
    className={`index-user-body-skill-render${
      selectedSkills.includes(value.name) ? "-active" : ""
    }`}
    onClick={() => handleSelectSkill(value.name)}
  >
    {value.name}
  </Button>
  );
}
