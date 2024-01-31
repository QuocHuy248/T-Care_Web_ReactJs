import React, { useEffect, useRef, useState } from "react";
import "./IndexUser.css";
import { LegalNotice } from "../../carehub/LegalNotice";
import { ContainerViewUser } from "../containerViewUser/ContainerViewUser";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import SearchLocationInput from "../../apiGoogleMap/SearchLocationInput ";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ServiceIndexUser } from "./ServiceIndexUser";
import { SkillIndexUser } from "./SkillIndexUser";
import { InfoIndexUser } from "./InfoIndexUser";
import { DateIndexUser } from "./DateIndexUser";
import { ButtonForMe } from "./../../ButtonForMe";
import { RenderListAssistantIndexUser } from "./RenderListAssistantIndexUser";
import { toast } from "react-toastify";
import LoadingCommon from "../../common/LoadingCommon";
import LoadingPage from "../../common/LoadingPage";

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};
export function IndexUser() {
  const [listInformation, setListInformation] = useState();
  const [listService, setListService] = useState();
  const [listSkill, setListSkill] = useState();
  const [listAssistant, setListAssistant] = useState();
  const [listAssistantFilter, setListAssistantFilter] = useState();
  const [checkButtonService, setCheckButtonService] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState([]);
  const [resetInputAddress, setResetInputAddress] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [km, setKm] = useState("10");
  const [place, setPlace] = useState("");
  const [value, setValue] = useState();
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [dayInWeek, setDayInWeek] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [count, setCount] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [checking, setChecking] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [checkIconPage, setCheckIconPage] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();
  const [checkButton, setCheckButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleReset = () => {
    setSelectedInfos([]);
    setSelectedSkills([]);
    setCheckButtonService("");
    setResetInputAddress((pre) => !pre);
    setValue(undefined);
    setSelectedLocation({
      lat: 0,
      lng: 0,
    });
    setSelectedDate([null, null])
    setCheckButton(false)
  };

  useEffect(() => {
    let axiosData = async () => {
      const responseInformation = await axios.get("http://localhost:8080/api/add-infos");
      setListInformation(responseInformation.data);

      const responseService = await axios.get("http://localhost:8080/api/serviceGenerals");
      setListService(responseService.data);

      const responseSkill = await axios.get("http://localhost:8080/api/skills");
      setListSkill(responseSkill.data);
      const responseAssistant = await axios.get(`http://localhost:8080/api/employees?page=0`);
      setListAssistant(responseAssistant.data.content);
      setPageTotal(responseAssistant.data.totalPages);
      setTotalElements(responseAssistant.data.totalElements);
      setIsLoading(false);

    };
    axiosData();
  }, []);
  console.log(listAssistant);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees?page=${count}`);
      setListAssistant((prevList) => [...(prevList || []), ...response.data.content]);
      setCount((pre) => pre + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setChecking(false);
    }
  };
  const debouncedHandleScroll = debounce(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPosition = window.scrollY + clientHeight;

    if (scrollPosition >= 0.95 * scrollHeight && count <= pageTotal) {
      setChecking(true);
    }
  }, 500);
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  useEffect(() => {
    if (checking) {
      fetchData();
    }
  }, [checking]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingImage(true);

    if (
      selectedLocation.lat !== 0 &&
      selectedLocation.lng !== 0 &&
      value !== undefined &&
      checkButtonService !== "" &&
      selectedInfos.length > 0 &&
      selectedSkills.length > 0
    ) {

      const selectedService = listService.find((service) => service.name === checkButtonService);
      const selectedSkillIds = selectedSkills.map((selectedSkill) => {
        const matchingSkill = listSkill.find((skill) => skill.name === selectedSkill);
        return matchingSkill ? matchingSkill.id : null;
      });
      const selectedInfoIds = selectedInfos.map((selectedInfo) => {
        const matchingInfo = listInformation.find((info) => info.name === selectedInfo);
        return matchingInfo ? matchingInfo.id : null;
      });
      const transformedData = Object.keys(value).map((day) => ({
        date: day,
        sessionOfDateList: value[day],
      }));
      const data = {
        longitude: selectedLocation.lng,
        latitude: selectedLocation.lat,
        distanceForWork: km,
        nameLocation: place,
        listSkillId: selectedSkillIds,
        listInfoId: selectedInfoIds,
        service: selectedService.id,
        timeStart: startDay,
        timeEnd: endDay,
        listDateSession: transformedData,
      };
      axios.post(`http://localhost:8080/api/carts/create-filter/${id}`, data).then((res) => {
        setListAssistantFilter(res.data.content);
        setCheckButton(true);
              setIsLoadingImage(false);

      });
    } else {
      toast.error("Nhập đầy đủ thông tin trước khi tìm kiếm");
      setIsLoadingImage(false);

    }
  };
  if (isLoading) {
    return <LoadingCommon />;
  }
  return (
    <>
      <ContainerViewUser idUser={id} checkIconPage={true} />
      <div className="container-index-user">
        <div className="index-user-header">
          <LocalPoliceIcon className="icon-local-police" />
          <span>Tất cả người chăm sóc đều được kiểm tra lý lịch</span>
        </div>
      </div>

      <div className="index-user-body row ">
        <div className="index-user-body-filter col-4 sidebar">
            <div className="index-user-body-title">
              <h5>Tìm kiếm người chăm sóc theo mong muốn của bạn</h5>
              <span className="reset-filter" onClick={handleReset}>
                Chọn lại
              </span>
            </div>

            <div className="w-100">
              <SearchLocationInput
                setSelectedLocation={setSelectedLocation}
                setPlace={setPlace}
                marginTest={"0"}
                resetInputAddress={resetInputAddress}
                children={true}
                km={km}
                setKm={setKm}
                checkButton={checkButton}
              />
            </div>
            <div className="index-user-body-dates">
              <h6 style={{ margin: "0" }}>Thời gian cần chăm sóc</h6>
              <div className="index-user-body-dates-render">
                <DateIndexUser
                  setSelectedDate={setSelectedDate}
                  dayInWeek={dayInWeek}
                  setValue={setValue}
                  selectedDate={selectedDate}
                  setDayInWeek={setDayInWeek}
                  setStartDay={setStartDay}
                  setEndDay={setEndDay}
                />
              </div>
            </div>
            <div className="index-user-body-services">
              <h6>Có thể giúp bạn với</h6>
              <div className="index-user-body-services-render">
                {listService?.map((e) => (
                 
                  <ServiceIndexUser
                    key={e.id}
                    value={e}

                    setCheckButtonService={setCheckButtonService}
                    checkButtonService={checkButtonService}
                  />
                ))}
              </div>
            </div>
            <div className="index-user-body-skills">
              <h6>Kỹ năng chuyên nghiệp</h6>
              <div className="index-user-body-skills-render">
                {listSkill?.map((e) => (
                  <SkillIndexUser
                    key={e.id}
                    setSelectedSkills={setSelectedSkills}
                    selectedSkills={selectedSkills}
                    value={e}
                  />
                ))}
              </div>
            </div>
            <div className="index-user-body-infos">
              <h6>Thông tin khác</h6>
              <div className="index-user-body-infos-render">
                {listInformation?.map((e) => (
                  <InfoIndexUser
                    key={e.id}
                    setSelectedInfos={setSelectedInfos}
                    selectedInfos={selectedInfos}
                    value={e}
                  />
                ))}
              </div>
            </div>
            {!checkButton ? (
              <div className="button-index-user">
                <ButtonForMe
                  value={60}
                  childrenButton={"Tìm kiếm"}
                  colorButton={"#3b71aa"}
                  type="submit"
                  onclick={handleSubmit}
                />
              </div>
            ) : (
              <div className="button-index-user">
                <ButtonForMe
                  value={60}
                  childrenButton={"Tạo mới yêu cầu"}
                  colorButton={"#3b71aa"}
                  type="submit"
                  onclick={handleReset}
                />
              </div>
            )}
        </div>
        {!checkButton ? (
          <>
            <div className="index-user-body-render-assistant col-8">
              {listAssistant?.map((e, index) => (
                <div key={index}>
                  <RenderListAssistantIndexUser
                    listAssistant={listAssistant}
                    value={e}
                    index={index}
                    checkButtonForme={true}
                  />
                </div>
              ))}
            </div>
            {totalElements === listAssistant?.length || (
              <div style={{ textAlign: "center", paddingLeft: "42%" }}>
                <span className="loader-index-user"></span>
              </div>
            )}
          </>
        ) : (
          <div className="index-user-body-render-assistant col-8">
            {isLoadingImage ? <div style={{margin:"50%"}}><LoadingPage/></div> : listAssistantFilter?.map((e, index) => (
              
              <div key={index}>
                <RenderListAssistantIndexUser
                  listAssistant={listAssistantFilter}
                  value={e}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <LegalNotice />
    </>
  );
}
