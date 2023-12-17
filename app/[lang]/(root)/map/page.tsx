import dynamic from "next/dynamic";


const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false })


const Map = () => {
    return ( 
        <MapComponent />
     );
}
 
export default Map;