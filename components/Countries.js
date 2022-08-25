import React from "react";
import { useState, useEffect } from "react";
import { useWeatherStore } from "../zustand/weatherStore";

export default function Countries() {
  const [active, setActive] = useState({});

  //Zustand
  const storeSetLocal = useWeatherStore((state) => state.setLocal);
  const storeSetLoading = useWeatherStore((state) => state.setLoading);

  const tabs = [
    {
      key: "SP",
      name: "São Paulo",
      flag: "🇧🇷",
      lat: -23.54,
      lon: -46.63,
    },
    {
      key: "TK",
      name: "Tokyo",
      flag: "🇯🇵",
      lat: 35.68,
      lon: 139.69,
    },
    {
      key: "SF",
      name: "San Francisco",
      flag: "🇺🇸",
      lat: 37.72,
      lon: -123.03,
    },
    {
      key: "UK",
      name: "London",
      flag: "🇬🇧",
      lat: 51.5,
      lon: -0.11,
    },
    {
      key: "AN",
      name: "Antarctica",
      flag: "",
      lat: -69.52,
      lon: 0,
    },
  ];

  const isActive = (tab) => {
    if (active.key === tab) {
      return "mx-5 outline outline-offset-2 outline-black rounded-full shadow-sm  px-5 py-2.5 text-center mr-2 mb-2";
    } else {
      return "mx-5 hover:outline hover:outline-offset-2 hover:outline-black/25 rounded-full  px-5 py-2.5 text-center mr-2 mb-2 hover:cursor-pointer";
    }
  };

  const handleClick = (tab) => {
    /* disables click if active */
    if (active.key !== tab.key) {
      storeSetLocal(tab);
      setActive(tab);
      storeSetLoading(1);
    }
  };

  return (
    <div>
      <ul className="inline-flex rounded-md text-md font-bold text-center text-black">
        <li className="mr-2">
          {tabs.map((tab) => (
            <input
              value={tab.name}
              key={tab.key}
              type="button"
              className={isActive(tab.key)}
              onClick={() => handleClick(tab)}
            />
          ))}
        </li>
      </ul>
    </div>
  );
}
