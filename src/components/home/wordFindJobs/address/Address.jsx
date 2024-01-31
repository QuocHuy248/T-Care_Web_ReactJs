import React, { useEffect, useState } from "react";
import "./Address.css";
import { NavBarFindJob } from "../navBarFindJob/NavBarFindJob";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SearchLocationInput from "../../../apiGoogleMap/SearchLocationInput ";
import MapComponent from "../../../apiGoogleMap/GoogleMap";
import { ButtonForMe } from "../../../ButtonForMe";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import EmployeeServiceAPI from "../../../../service/employeeServiceAPI";
export function Address() {
  const [km, setKm] = useState(10);
  const { id } = useParams();
  const [place, setPlace] = useState("");
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
    if (place != "") {
      const postData = {
        nameLocation: place,
        distanceForWork: km,
        longitude: selectedLocation.lng,
        latitude: selectedLocation.lat,
      };
      await EmployeeServiceAPI.updateLocation(id, postData, navigate, "/assistant/process");
    } else {
      toast.error("Vui lòng chọn vị trí của bạn")
    }
  };
console.log(place);
  const formAddress = (
    <div
      style={{
        margin: "5% 10%",
        backgroundColor: "white",
        borderRadius: "15px",
        border: "1px solid #b3bac1",
      }}
    >
      <div style={{ margin: "30px 200px" }}>
        <SearchLocationInput setSelectedLocation={setSelectedLocation} setPlace={setPlace} />
        <MapComponent selectedLocation={selectedLocation} />
      </div>
      <div style={{ margin: "30px 35%" }}>
        <h6 style={{ paddingLeft: "50px" }}>Bạn có thể di chuyển bao xa?</h6>
        <div
          style={{
            display: "flex",
            margin: "30px 0",
            justifyContent: "space-around",
          }}
        >
          <div style={{ cursor: "pointer", margin: "10px" }} onClick={() => handleMinus()}>
            <RemoveIcon />
          </div>
          <div>
            <span style={{ fontSize: "30px" }}>{km}</span> <br /> <span>Kilomets</span>
          </div>
          <div style={{ cursor: "pointer", margin: "10px" }} onClick={() => handleAdd()}>
            <AddIcon />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "end", marginBottom: "40px", marginRight: "80px" }}>
        <ButtonForMe childrenButton={"Tiếp theo"} colorButton={"#213f5f"} onclick={handleButtonClick} />
      </div>
    </div>
  );
  return (
    <>
      <NavBarFindJob children={formAddress} />
    </>
  );
}
