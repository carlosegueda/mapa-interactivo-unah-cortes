import React, { useState, useEffect, useRef } from "react";
import "./map.css";

const HOTSPOTS = [
  {
    id: "edificio1",
    title: "Edificio 1",
    description: "Edificio 1 bla bla bla.",
    top: "208px",
    left: "132px",
    width: "88px",
    height: "46px",
  },
  {
    id: "edificio2",
    title: "Edificio 2",
    description: "Edificio 2 bla bla bla.",
    top: "160px",
    left: "151px",
    width: "70px",
    height: "36px",
  },
  {
    id: "edificio3",
    title: "Edificio 3",
    description: "Edificio 3 bla bla bla.",
    top: "116px",
    left: "224px",
    width: "55px",
    height: "37px",
  },
  {
    id: "edificio4",
    title: "Edificio 4",
    description: "Edificio 4 bla bla bla.",
    top: "63px",
    left: "263px",
    width: "72px",
    height: "37px",
  },
  {
    id: "edificio5",
    title: "Edificio 5",
    description: "Edificio 5 bla bla bla.",
    top: "27px",
    left: "93px",
    width: "72px",
    height: "35px",
  },
  {
    id: "edificio6",
    title: "Edificio 6",
    description: "Edificio 6 bla bla bla.",
    top: "209px",
    left: "9px",
    width: "95px",
    height: "35px",
  },
  {
    id: "anexos",
    title: "Anexos",
    description: "Anexos bla bla bla.",
    top: "162px",
    left: "132px",
    width: "16px",
    height: "46px",
  },
  {
    id: "biblio",
    title: "Bliblioteca",
    description: "biblioteca bla bla bla.",
    top: "233px",
    left: "266px",
    width: "20px",
    height: "24px",
  },

  {
    id: "cafeteria1",
    title: "CocaCola",
    description: "La coca bla bla bla.",
    top: "94px",
    left: "134px",
    width: "48px",
    height: "30px",
  },
  {
    id: "cafeteria2",
    title: "Pepsi",
    description: "La Pepsi bla bla bla.",
    top: "190px",
    left: "116px",
    width: "17px",
    height: "17px",
  },
  {
    id: "espresso",
    title: "EspressoAmericano",
    description: "esrpeso bla bla bla.",
    top: "212px",
    left: "264px",
    width: "28px",
    height: "17px",
  },

  {
    id: "cancha1",
    title: "Cancha",
    description: "cancha bla bla bla.",
    top: "59px",
    left: "37px",
    width: "41px",
    height: "60px",
  },

  {
    id: "cancha2",
    title: "Canchas",
    description: "canchas bla bla bla.",
    top: "132px",
    left: "111px",
    width: "36px",
    height: "26px",
  },

  {
    id: "plaza",
    title: "Plaza Cívica",
    description: "plaza bla bla bla.",
    top: "162px",
    left: "224px",
    width: "23px",
    height: "43px",
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
        {active &&
          (() => {
            const spot = HOTSPOTS.find((s) => s.id === active);
            return (
              <div
                className="info-panel-floating"
                style={{
                  position: "absolute",
                  top: `calc(${spot.top} - 10px)`, // un poquito arriba del hotspot
                  left: `calc(${spot.left} + ${spot.width} + 10px)`, // a la derecha del hotspot
                }}
              >
                <h2>{spot.title}</h2>
                <p>{spot.description}</p>
              </div>
            );
          })()}
      </div>
    </>
  );
}
