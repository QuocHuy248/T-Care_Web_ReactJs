import React, { useEffect, useState } from "react";
import LogoProject from "../../../logoProject/LogoProject";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ButtonForMe } from "../../../ButtonForMe";
import { LegalNotice } from "../../../carehub/LegalNotice";
import SearchLocationInput from "../../../apiGoogleMap/SearchLocationInput ";
import MapComponent from "../../../apiGoogleMap/GoogleMap";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import UserServiceAPI from "./../../../../service/userServiceAPI";
import "./UserAddress.css";
import LoadingPage from "../../../common/LoadingPage";

export function UserAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [km, setKm] = useState(10);
  const [place, setPlace] = useState("");
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
  });
  let navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSelectedLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);
  const handleMinus = () => {
    if (km > 5) {
      setKm((prev) => prev - 5);
    } else {
      toast.error("Số km lớn hơn 5");
    }
  };
  const handleAdd = () => {
    if (km < 100) {
      setKm((prev) => prev + 5);
    } else {
      toast.error("Số km bé hơn 100");
    }
  };
  const handleButtonClick = async () => {
    setIsLoading(true);
    if (place != "") {
      const postData = {
        nameLocation: place,
        distanceForWork: km,
        longitude: selectedLocation.lng,
        latitude: selectedLocation.lat,
      };
      await UserServiceAPI.updateLocation(id, postData, navigate, "/user/service");
      setIsLoading(false);
    } else {
      toast.error("Chọn vị trí của bạn");
    }
  };
  return (
    <>
      <div>
        <div className="ms-5 my-2">
          <LogoProject />
        </div>

        <div className="row">
          <div className="col-4 bg-h3"></div>
        </div>
      </div>
      <div className="m-5" style={{ textAlign: "-webkit-center" }}>
        <SearchLocationInput
          setSelectedLocation={setSelectedLocation}
          setPlace={setPlace}
          title={"Bạn tìm kiếm sự chăm sóc ở đâu?"}
        />
        <MapComponent selectedLocation={selectedLocation} widthMap={"60%"} />
        <div className="m30-35">
          <h6 className="pl-50">Bạn dự định tìm kiếm trong bao xa?</h6>
          <div className="d-flex-m30-0-jc-sa">
            <div className="pointer-m10" onClick={() => handleMinus()}>
              <RemoveIcon />
            </div>
            <div>
              <span className="fs30">{km}</span> <br /> <span>Kilomets</span>
            </div>
            <div className="pointer-m10" onClick={() => handleAdd()}>
              <AddIcon />
            </div>
          </div>
        </div>
        <div className="mt-5 h10">
          {isLoading ? (
            <div style={{marginRight:"17%"}}>
              <LoadingPage />
            </div>
          ) : (
            <ButtonForMe childrenButton={"Tiếp theo"} onclick={handleButtonClick} />
          )}
        </div>
      </div>
      <div className="legal-notice-user">
        <LegalNotice />
      </div>
    </>
  );
}
