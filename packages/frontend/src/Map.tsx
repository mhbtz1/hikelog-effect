import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

type MarkerProps = { text: string } & { lat: number; lng: number }
const Marker = ({ text }: MarkerProps) => (
    <div className="-translate-x-1/2 -translate-y-full rounded bg-blue-600 px-2 py-1 text-xs text-white shadow">
        {text}
    </div>
)

type MapProps = {
    height?: number | string
    apiKey?: string
    defaultCenter?: { lat: number; lng: number }
    defaultZoom?: number
    onSelect?: (lat: number, lng: number) => void
}

export default function SimpleMap({
    height = 240,
    apiKey = '',
    defaultCenter = { lat: 10.99835602, lng: 77.01502627 },
    defaultZoom = 11,
    onSelect,
}: MapProps) {
    const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null)

    return (
        <div style={{ height, width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                onClick={({ lat, lng }) => {
                    setSelected({ lat, lng })
                    onSelect?.(lat, lng)
                }}
            >
                {selected ? (
                    <Marker lat={selected.lat} lng={selected.lng} text="Selected" />
                ) : null}
            </GoogleMapReact>
        </div>
    )
}