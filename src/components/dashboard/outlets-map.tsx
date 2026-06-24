"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { topOutlets } from "@/lib/data";
import { Space, Typography, Progress, Badge } from "antd";
import { ArrowUpRight, ArrowDownRight, Building2 } from "lucide-react";

const { Text, Title } = Typography;

// Custom Marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: white;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const getStatusColor = (status: string, score: number) => {
  if (status === "offline" || score < 60) return "#ef4444"; // Red
  if (status === "warning" || score < 80) return "#f59e0b"; // Yellow/Orange
  return "#22c55e"; // Green
};

export default function OutletsMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: 400, background: '#f1f5f9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>;

  // Center roughly on West Java / Jakarta
  const mapCenter: [number, number] = [-6.5, 107.5];

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", zIndex: 1 }}>
      <MapContainer 
        center={mapCenter} 
        zoom={8} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {topOutlets.map((outlet) => {
          if (!outlet.lat || !outlet.lng) return null;
          
          const iconColor = getStatusColor(outlet.status, outlet.healthScore);
          
          return (
            <Marker 
              key={outlet.id} 
              position={[outlet.lat, outlet.lng]} 
              icon={createCustomIcon(iconColor)}
            >
              <Popup>
                <div style={{ minWidth: 200, padding: 4 }}>
                  <Space align="start" style={{ marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={16} color="#475569" />
                    </div>
                    <div>
                      <Title level={5} style={{ margin: 0, fontSize: 16 }}>{outlet.name}</Title>
                      <Text type="secondary" style={{ fontSize: 12 }}>{outlet.area}</Text>
                    </div>
                  </Space>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>Revenue</Text>
                      <Text strong style={{ fontSize: 14 }}>Rp {(outlet.revenue / 1000000).toFixed(0)}M</Text>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>Growth</Text>
                      <Space size={2}>
                        {outlet.growth >= 0 ? <ArrowUpRight size={14} color="#22c55e" /> : <ArrowDownRight size={14} color="#ef4444" />}
                        <Text strong style={{ color: outlet.growth >= 0 ? '#22c55e' : '#ef4444' }}>{outlet.growth}%</Text>
                      </Space>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text type="secondary" style={{ fontSize: 11 }}>Health Score</Text>
                      <Text strong style={{ fontSize: 12, color: iconColor }}>{outlet.healthScore}</Text>
                    </div>
                    <Progress 
                      percent={outlet.healthScore} 
                      showInfo={false} 
                      strokeColor={iconColor} 
                      size="small" 
                      style={{ marginBottom: 0 }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 11 }}>Status</Text>
                    <Badge color={iconColor} text={<Text strong style={{ fontSize: 12, color: iconColor }}>{outlet.status.toUpperCase()}</Text>} />
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
