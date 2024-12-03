'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getHealthFacilities, getNGOs } from '@/actions/actions';
import styles from '@/app/components/tabMaps/Map.module.css';
import Loading from '@/app/components/loading/Loading';

const MapComponent = dynamic(() => import('@/app/components/tabMaps/MapComponent'), {
  ssr: false
});

interface PrismaHealthFacility {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaNGO {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  email: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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

const convertHealthFacilityData = (data: PrismaHealthFacility): Location => ({
  id: data.id,
  name: data.name,
  type: data.type,
  latitude: data.latitude,
  longitude: data.longitude,
  address: data.address,
  phone: data.phone || undefined,
  website: data.website || undefined,
});

const convertNGOData = (data: PrismaNGO): Location => ({
  id: data.id,
  name: data.name,
  type: 'ONG',
  latitude: data.latitude,
  longitude: data.longitude,
  address: data.address,
  phone: data.phone,
  website: data.website || undefined,
  description: data.description,
});

export default function MapPage() {
  const [facilities, setFacilities] = useState<Location[]>([]);
  const [ngos, setNGOs] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facilitiesData, ngosData] = await Promise.all([
          getHealthFacilities(),
          getNGOs()
        ]);
        
        setFacilities(facilitiesData.map(convertHealthFacilityData));
        setNGOs(ngosData.map(convertNGOData));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mapa de Recursos contra Dengue</h1>
      <div className={styles.mapWrapper}>
        <MapComponent
          facilities={facilities}
          ngos={ngos}
        />
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendMarker} ${styles.hospitalMarker}`}></div>
          Hospitais
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendMarker} ${styles.upaMarker}`}></div>
          UPAs
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendMarker} ${styles.ngoMarker}`}></div>
          ONGs
        </div>
      </div>
    </div>
  );
}