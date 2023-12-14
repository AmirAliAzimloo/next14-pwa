import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js'
import { useEffect } from 'react';

const Map = () => {
    useEffect(() => {
        document.getElementById('contact-map').innerHTML = "<div id='map' style='height: 345px'></div>"

        var map = L.map('map').setView([35.700105, 51.400394], 14);
        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);
        var marker = L.marker([35.700105, 51.400394], {
            icon: L.icon({
                popupAnchor: [12, 6],
                iconUrl: 'images/map/marker-icon.png',
                shadowUrl: 'images/map/marker-shadow.png'
            })
        }).addTo(map)
            .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();
    }, [])

    return (
        <div id="contact-map"></div>
    )
}

export default Map;