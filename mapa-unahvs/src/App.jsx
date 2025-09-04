import React, { useState } from "react";
import "./map.css";

const HOTSPOTS = [
  {
    id: "cancha",
    title: "Cancha",
    description: "Aquí se juega futbol.",
    top: "112px",
    left: "60px",
    width: "55px",
    height: "83px",
  },
  {
    id: "cafeteria",
    title: "Cafetería",
    description: "Lugar para comer y relajarse.",
    top: "200px",
    left: "150px",
    width: "120px",
    height: "100px",
  },
  {
    id: "edificio1",
    title: "Edificio 1",
    description: "Aulas de Ingeniería y laboratorios.",
    top: "100px",
    left: "300px",
    width: "120px",
    height: "100px",
  },
];

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="map-container">
      <img src="/campus (2).png" alt="Campus" className="map-image" />

      {HOTSPOTS.map((spot) => (
        <button
          key={spot.id}
          className={`hotspot ${active === spot.id ? "active" : ""}`}
          style={{
            top: spot.top,
            left: spot.left,
            width: spot.width,
            height: spot.height,
          }}
          onClick={() => setActive(spot.id)}
        />
      ))}

      {active && (
        <div className="info-panel">
          <h2>{HOTSPOTS.find((s) => s.id === active).title}</h2>
          <p>{HOTSPOTS.find((s) => s.id === active).description}</p>
          <button onClick={() => setActive(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
