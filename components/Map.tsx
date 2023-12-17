"use client"

import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function MyMap(props : any) {
  // const { position, zoom } = props;
  const [position,setPosition] = useState({lat : 35.715298, lng: 51.404343});
  const [zoom,setZoom] = useState("");
 

  const markerRef = useRef<any>(null)

  const eventHandlers = useMemo(
          () => ({
              dragend() {
                  const marker = markerRef.current
                  if (marker != null) {
                      setPosition(marker.getLatLng())
                      console.log(marker.getLatLng())
                  }
              },
          }),
          [],
      )
      useEffect(() => {
       // you will get the current position of the marker here
          console.log(markerRef.current)
      }, [markerRef.current])


  return ( 
    <>
        <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }} className="map-root">
      {/* <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={[35.715298, 51.404343]}
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}

<MapContainer className="z-10" style={{ width: '100%', height: '100%' }} center={[35.715298, 51.404343]} zoom={15} scrollWheelZoom={true}> 
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />


        <Marker
            eventHandlers={eventHandlers}
            position={position}
            draggable={true}
            // animate={true}
            ref={markerRef}
        >
       <Popup>
           Hey ! you found me
       </Popup>
   </Marker>  

    

  </MapContainer>

   

      </div>

<button onClick={()=>alert(`position : ${position}`)} className="bg-red-700 w-full absolute z-50 bottom-0 left-0" >
click
</button>
    </>

  )
}