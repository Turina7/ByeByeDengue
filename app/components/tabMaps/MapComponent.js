import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Configuração do ícone personalizado com URL do CDN
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const SaoJose = [-20.82, -49.37];

export default function MapComponent({ markers }) {
  return (
    <MapContainer center={SaoJose} zoom={12} scrollWheelZoom={false} className="map-container" style={{width:"110vh", height:"50vh"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((item, index) => (
        <Marker key={index} position={item.position} icon={customIcon}>
          <Popup>
            {item.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
