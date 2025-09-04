import React, { useState, useEffect, useRef } from "react";
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
    left: "200px",
    width: "70px",
    height: "100px",
  },
];

export default function App() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

  // Cierra el panel al clickar fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActive(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="map-wrapper">
        <div className="map-container" ref={containerRef}>
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
              onClick={(e) => {
                e.stopPropagation(); // evita que el click se propague al document
                setActive(spot.id);
              }}
            />
          ))}
        </div>

        {active && (
          <div className="info-panel">
            <h2>{HOTSPOTS.find((s) => s.id === active).title}</h2>
            <p>{HOTSPOTS.find((s) => s.id === active).description}</p>
          </div>
        )}
      </div>
    </>
  );
}
