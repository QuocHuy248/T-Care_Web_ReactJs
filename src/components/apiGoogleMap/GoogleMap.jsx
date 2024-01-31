import React, { useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import GetServiceAPI from "../../service/getServiceAPI";


const MapComponent = ({ selectedLocation, widthMap }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GetServiceAPI.keyGGMap,
  });
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(18);
    }
  }, [selectedLocation]);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "30px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: widthMap || "auto"
        }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          icon={"https://res.cloudinary.com/dw4xpd646/image/upload/v1704201738/Cloudinary-React/nvxi1h4uw1ziv3bvygqu.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
