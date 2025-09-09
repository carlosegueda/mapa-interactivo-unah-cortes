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
    title: "Espresso Americano",
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

  {
    id: "sitraunah",
    title: "SITRAUNAH",
    description: "sitraunah bla bla bla.",
    top: "40px",
    left: "224px",
    width: "17px",
    height: "15px",
  },

  {
    id: "lab",
    title: "Laboratorio",
    description: "laboratorio bla bla bla.",
    top: "40px",
    left: "259px",
    width: "17px",
    height: "15px",
  },

  {
    id: "sala",
    title: "Sala de Innovaciones",
    description: "sala de innovaciones bla bla bla.",
    top: "60px",
    left: "192px",
    width: "17px",
    height: "15px",
  },
  {
    id: "odonto",
    title: "Odontología",
    description: "odonto bla bla bla.",
    top: "93px",
    left: "232px",
    width: "19px",
    height: "18px",
  },
  {
    id: "libreria",
    title: "Librería",
    description: "libreria bla bla bla.",
    top: "212px",
    left: "307px",
    width: "15px",
    height: "13px",
  },
];

export default function App() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

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
      <div className="foot">
        {" "}
        <p>Mapa UNAH Cortés</p> <img src="unahlogo.png" />
      </div>
      <div className="band">
        {" "}
        <img src="banda.png" />
      </div>
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
                e.stopPropagation();
                setActive(spot.id);
              }}
            />
          ))}
        </div>

        {active &&
          (() => {
            const spot = HOTSPOTS.find((s) => s.id === active);
            const containerWidth =
              containerRef.current?.offsetWidth || window.innerWidth;

            const spotLeft = parseInt(spot.left, 10);
            const spotWidth = parseInt(spot.width, 10);

            const isLeftSide = spotLeft < containerWidth / 2;

            const panelStyle = {
              position: "absolute",
              top: `calc(${spot.top} - 10px)`,
              left: isLeftSide
                ? `calc(${spot.left} + ${spot.width} + 5px)`
                : `calc(${spot.left} - 77px)`,
            };

            return (
              <div className="info-panel-floating" style={panelStyle}>
                <p className="titulo">{spot.title}</p>
                {/* <p className="info">{spot.description}</p> */}
              </div>
            );
          })()}
      </div>
      <div className="band">
        {" "}
        <img src="banda.png" />
      </div>
      <div className="informacion">
        <img src="unahlogo.png"/><p>HOLA HOLA HOLA</p>
      </div>
    </>
  );
}
