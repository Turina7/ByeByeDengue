import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import styles from './Map.module.css';

const hospitalIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const upaIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ngoIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Location {
  id: number;
  name: string;
  type?: string;
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  website?: string;
  description?: string;
}

interface MapComponentProps {
  facilities: Location[];
  ngos: Location[];
}

export default function MapComponent({ facilities, ngos }: MapComponentProps) {
  // Centro do mapa (você pode ajustar para sua região)
  const defaultCenter: LatLngTuple = [-23.5505, -46.6333]; // São Paulo

  const getIcon = (type: string | undefined) => {
    switch (type?.toUpperCase()) {
      case 'HOSPITAL':
        return hospitalIcon;
      case 'UPA':
        return upaIcon;
      default:
        return ngoIcon;
    }
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className={styles.map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {facilities.map((facility) => (
        <Marker
          key={facility.id}
          position={[facility.latitude, facility.longitude] as LatLngTuple}
          icon={getIcon(facility.type)}
        >
          <Popup>
            <div className={styles.popup}>
              <h3>{facility.name}</h3>
              <p><strong>{facility.type}</strong></p>
              <p>{facility.address}</p>
              {facility.phone && <p>📞 {facility.phone}</p>}
              {facility.website && (
                <p>
                  <a href={facility.website} target="_blank" rel="noopener noreferrer">
                    Visitar website
                  </a>
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {ngos.map((ngo) => (
        <Marker
          key={ngo.id}
          position={[ngo.latitude, ngo.longitude] as LatLngTuple}
          icon={ngoIcon}
        >
          <Popup>
            <div className={styles.popup}>
              <h3>{ngo.name}</h3>
              <p><strong>ONG</strong></p>
              {ngo.description && <p>{ngo.description}</p>}
              <p>{ngo.address}</p>
              {ngo.phone && <p>📞 {ngo.phone}</p>}
              {ngo.website && (
                <p>
                  <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                    Visitar website
                  </a>
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}