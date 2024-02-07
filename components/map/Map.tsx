"use client";
import dynamic from 'next/dynamic'
import { UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";


const MapWithNoSSR = dynamic(
  () => import('./MapWithNoSSR'),
  { ssr: false }
)

interface MapProps {
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<any>;
  btnTitle: string;
  forEdit?:boolean;
}

const Map: React.FC<MapProps> = ({
  showMap,
  setShowMap,
  setValue,
  btnTitle,
  forEdit
}) => {


  return (
    <>
     <MapWithNoSSR 
    showMap={showMap}
    setShowMap={setShowMap}
    setValue={setValue}
    btnTitle={btnTitle}
    forEdit={forEdit}
    />
    </>
  );
}; 

export default Map;
