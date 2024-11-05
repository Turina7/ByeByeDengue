'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from "@/app/components/button/button";

// Load MapComponent only on the client side
const MapComponent = dynamic(() => import('@/app/components/tabMaps/MapComponent'), { ssr: false });

// Define the type for marker coordinates
type Marker = {
  position: number[];
  description: string;
};

const coordinatesHospitals: Marker[] = [
  { position: [-20.818, -49.376], description: 'Hospital de Base de São José do Rio Preto' },
  { position: [-20.801, -49.370], description: 'Hospital da Unimed São José do Rio Preto' },
  { position: [-20.816, -49.390], description: 'Hospital São Lucas' },
  { position: [-20.805, -49.370], description: 'Hospital Infantil de São José do Rio Preto' },
];

const coordinatesUpas: Marker[] = [
  { position: [-20.825, -49.377], description: 'UPA São José do Rio Preto - Jardim Nazareth' },
  { position: [-20.814, -49.392], description: 'UPA São José do Rio Preto - Vila Elvira' },
  { position: [-20.803, -49.373], description: 'UPA São José do Rio Preto - Parque da Cidadania' },
  { position: [-20.810, -49.385], description: 'UPA São José do Rio Preto - Parque Industrial' },
];

export default function Mapas() {
  // Specify the type for the useState array
  const [markers, setMarkers] = useState<Marker[]>([]);

  const handleHospitaisClick = () => {
    setMarkers(coordinatesHospitals);
  };

  const handleUpasClick = () => {
    setMarkers(coordinatesUpas);
  };

  return (
    <div>
      <h1>Mapas</h1>
      <Button onClick={handleHospitaisClick} style={{ margin: "5px" }}>Hospitais</Button>
      <Button onClick={handleUpasClick}>Upas</Button>
      <MapComponent markers={markers} />
    </div>
  );
}
