import React, { useState, useEffect, useRef } from "react";
import "./map.css";

const HOTSPOTS = [
  {
    id: "biblioteca",
    title: "Biblioteca",
    description: "Aquí se encuentran las aulas y libros de consulta.",
    top: "50px",
    left: "80px",
    width: "100px",
    height: "80px",
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
    left: "100px",
    width: "120px",
    height: "100px",
  },
];

export default function App() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

  // Cierra el modal al clickar fuera de un hotspot o del modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !e.target.closest(".hotspot") &&
        !e.target.closest(".info-panel-floating")
      ) {
        setActive(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="map-wrapper" ref={containerRef}>
        <div className="map-container">
          <img src="/campus.png" alt="Campus" className="map-image" />

          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              className="hotspot"
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.width,
                height: spot.height,
              }}
              onClick={(e) => {
                e.stopPropagation(); // evita que el click cierre inmediatamente el modal
                setActive(spot.id);
              }}
            />
          ))}
        </div>

        {/* Panel flotante */}
        {active && (
          <div className="info-panel-floating">
            <h2>{HOTSPOTS.find((s) => s.id === active).title}</h2>
            <p>{HOTSPOTS.find((s) => s.id === active).description}</p>
            <button onClick={() => setActive(null)}>Cerrar</button>
          </div>
        )}
      </div>

      <div className="fixed-panel">
        <h2>Información</h2>
        <p>
          Este panel siempre permanece en pantalla, sin importar scroll o zoom.
        </p>
      </div>
    </>
  );
}
