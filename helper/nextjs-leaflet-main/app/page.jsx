"use client"

import { Button } from '@/components/ui/button'
import Map from '@components/Map';
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Tracks from "./data.json"
import { useMap } from 'react-leaflet/hooks'

const GeoJSON = dynamic(() => import('react-leaflet/GeoJSON'), {
  ssr: false,
});

const DEFAULT_CENTER = [47.000, -72.000]

export default function Home() {
  const featureGroupRef = useRef();

  return (
    <>
      <Map className="mapcomponent" width="800" height="600" center={DEFAULT_CENTER} zoom={8}>
        {({ TileLayer, GeoJSON, FeatureGroup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <FeatureGroup ref={featureGroupRef}>
              {Tracks.map((track, index) => (
                <GeoJSON key={index} data={track} eventHandlers={{
                  add: (e) => {
                    if (featureGroupRef.current === undefined) return;
                    e.target._map.fitBounds(featureGroupRef.current.getBounds())
                  },

                }} />
              ))}
            </FeatureGroup>
          </>
        )}
      </Map >
      <p>Hello.</p>
    </>
  )
}
