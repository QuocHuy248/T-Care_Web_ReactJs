import React, { useEffect, useState } from "react";
import "./Experience.css";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import { SideBarFindJob } from "../sideBarFindJob/SideBarFindJob";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MapToMe } from "./MapToMe";
import { ButtonForMe } from "../../../ButtonForMe";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingCommon from "../../../common/LoadingCommon";
export function Experience() {
  const listEducation = [
    { id: "HIGHSCHOOL", name: "Trung học phổ thông" },
    { id: "UNIVERSITY", name: "Đại Học" },
    { id: "COLLEGE", name: "Cao Đẳng" },
    { id: "GRADUTEDEGREE", name: "Cử Nhân" },
  ];
  const listYear = [
    { id: "ONE", name: "1" },
    { id: "TWO", name: "2" },
    { id: "THREE", name: "3" },
    { id: "FOUR", name: "4" },
    { id: "FIVE", name: "5" },
    { id: "SIX", name: "6" },
    { id: "SEVEN", name: "7" },
    { id: "EIGHT", name: "8" },
    { id: "NIGHT", name: "9" },
    { id: "TEN", name: "10+" },
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  let navigate = useNavigate();
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [educationId, setEducationId] = useState("");
  const [years, setYears] = useState(listYear[0]);
  const [servicer, setServicer] = useState([]);
  const [skill, setSkill] = useState([]);
  const [information, setInformation] = useState([]);
  const [listInformation, setListInformation] = useState();
  const [listService, setListService] = useState();
  const [listSkill, setListSkill] = useState();
  const [educationName, setEducationName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseInformation = await axios.get("http://localhost:8080/api/add-infos");
        setListInformation(responseInformation.data);

        const responseService = await axios.get("http://localhost:8080/api/serviceGenerals");
        setListService(responseService.data);

        const responseSkill = await axios.get("http://localhost:8080/api/skills");
        setListSkill(responseSkill.data);

        setIsLoading(false); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingCommon />;
  }
  const handleMinus = () => {
    const currentIndex = listYear.findIndex((item) => item.id === years.id);
    const nextIndex = currentIndex - 1;

    if (nextIndex >= 0) {
      setYears(listYear[nextIndex]);
    } else {
      toast.error("Số năm phải lớn hơn 1");
    }
  };
  const handleAdd = () => {
    const currentIndex = listYear.findIndex((item) => item.id === years.id);
    const nextIndex = currentIndex + 1;
    if (nextIndex < listYear.length) {
      setYears(listYear[nextIndex]);
    } else {
      toast.error("Số năm đã quá giới hạn");
    }
  };
  const handleChangeEducation = (event) => {
    const selectedEducationId = event.target.value;
    setEducationId(selectedEducationId);

    const selectedEducation = listYear.find((item) => item.id === selectedEducationId);

    if (selectedEducation) {
      setEducationName(selectedEducation.name);
    }
  };
  const handleSubmitExperience = async () => {
    setIsLoading(true)
    const listExperience = {
      idSkills: skill.map((s) => s.id),
      experience: years.id,
      idAddInfos: information.map((info) => info.id),
      idServices: servicer.map((service) => service.id),
      education: educationId,
    };
    await axios
      .put(`http://localhost:8080/api/employees/experience/${id}`, listExperience)
      .then((resp) => {
        setIsLoading(false)
        toast.success("Lưu thông tin thành công");
        navigate(`/assistant/bio/${id}`)
      })
     
      .catch((err) => {
        console.error("Lỗi khi gửi POST request:", err);
        toast.error("Vui lòng điền đầy đủ thông tin");
        setIsLoading(false)
      });
      
  };
  const servicesToShow = showMore ? listService : listService?.slice(0, 5);

  const experience = (
    <div className="col-9 container-experience">
      <h4 className="experience-title">Hồ sơ chăm sóc người cao tuổi</h4>
      <div className="services-provided">
        <div className="services-provided-side-bar">
          <span>Các dịch vụ cung cấp</span> <br />
          <span className="services-provided-side-bar-select">Vui lòng chọn ít nhất một</span>
        </div>
        <div>
          <MapToMe mapToMe={servicesToShow}  checkService={true} valueList={servicer} setValueList={setServicer} />
          {listService?.length > 5 && (
            <div className="show-more" onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? (
                <span>
                  <KeyboardArrowUpIcon />
                  Hiển thị bớt
                </span>
              ) : (
                <span>
                  <KeyboardArrowDownIcon /> Hiển thị thêm
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="separation-experience"></div>
      <div className="education">
        <div className="education-title">
          <span>Giáo dục</span>
        </div>
        <div>
          <span className="education-highest-level">BẰNG CẤP CAO NHẤT ĐẠT ĐƯỢC</span>
          <br />
          <FormControl sx={{ width: 300 }}>
            <Select
              displayEmpty
              value={educationId}
              onChange={handleChangeEducation}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              sx={{ backgroundColor: "#f3f4f6", height: "40px" }}
            >
              <MenuItem disabled value="">
                <em>Vui lòng chọn trường này</em>
              </MenuItem>
              {listEducation?.map((e) => (
                <MenuItem key={e?.id} value={e?.id}>
                  {e?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="separation-experience"></div>
      <div className="year-experience">
        <div className="year-experience-title">
          <div className="w-75">Số năm kinh nghiệm làm việc</div>
        </div>
        <div className="year-experience-handle">
          <div className="year-experience-handle-minus" onClick={() => handleMinus()}>
            <RemoveIcon />
          </div>
          <div>
            <span className="year-experience-handle-years">{years.name}</span> <br />{" "}
            <span>Years</span>
          </div>
          <div className="year-experience-handle-add" onClick={() => handleAdd()}>
            <AddIcon />
          </div>
        </div>
      </div>
      <div className="separation-experience"></div>
      <div className="skills-training">
        <div className="skills-training-title">
          <span>Kĩ năng</span>
        </div>
        <div>
          <MapToMe mapToMe={listSkill} valueList={skill} setValueList={setSkill} />
        </div>
      </div>
      <div className="separation-experience"></div>
      <div className="additional-info">
        <div className="additional-info-title">
          <span>Thông tin thêm</span>
        </div>
        <div>
          <MapToMe
            mapToMe={listInformation}
            valueList={information}
            setValueList={setInformation}
          />
        </div>
      </div>
      <div className="experience-button">
        <ButtonForMe
          childrenButton={"Lưu và tiếp tục"}
          colorButton={"#213f5f"}
          onclick={handleSubmitExperience}
        />
      </div>
    </div>
  );
  return (
    <NavBarFindJob
      children={
        <SideBarFindJob col={"col-6"} value={experience} check={true} activeIds={[1, 2, 3]} />
      }
    />
  );
}
