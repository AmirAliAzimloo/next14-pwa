"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Fileds from "./Fileds";
import { UseFormSetValue } from "react-hook-form";
import Marker from "./Marker";

interface MapProps {
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<any>;
  btnTitle: string;
  forEdit?: boolean;
}

const MapWithNoSSR: React.FC<MapProps> = ({
  showMap,
  setShowMap,
  setValue,
  btnTitle,
  forEdit,
}) => {
  const [center, setCenter] = useState({
    lat: 35.715298,
    lng: 51.404343,
  });
  const [zoom, setZoom] = useState(15);
  const [position, setPosition] = useState({
    lat: 35.715298,
    lng: 51.404343,
  });
  const [address, setAddress] = useState("");

  const [mapState, setMapState] = useState<any>(null);

  const Draggable = () => {
    let map = useMapEvents({
      dragend: (e) => {
        setPosition(e.target.getCenter());
      },
      locationfound(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        setCenter(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        map.locate();
      },
    });

    setMapState(map);
    return null;
  }

  useEffect(() => {
    if (mapState) {

      mapState.flyTo(position,mapState.getZoom());
    }
  }, [position, mapState]);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Api-Key", "service.0906cb8f5bb342a6baa504f9eac27983");

    fetch(
      `https://api.neshan.org/v2/reverse?lat=${position.lat}&lng=${position.lng}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.formatted_address);
        setValue("latlang", position);
        return data ? data : false;
      })
      .catch((error) => console.log("error", error));
  }, [position]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = {
            lat: latitude,
            lng: longitude,
          };

          // Update the map center and position
          setCenter(currentLocation);
          setPosition(currentLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <Navbar setShowMap={setShowMap} forEdit={forEdit} />

      <div
        className={
          `absolute  left-0 bottom-0 right-0`
        }
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
          className="map-root"
        >
          <MapContainer
            style={{ width: "100%", height: "100%" }}
            center={center}
            zoom={zoom}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Draggable />

            <Marker />
          </MapContainer>
        </div>
      </div>

      <Fileds
        address={address}
        setValue={setValue}
        setShowMap={setShowMap}
        btnTitle={btnTitle}
      />
    </>
  );
};

export default MapWithNoSSR;
