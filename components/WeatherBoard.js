import React from "react";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Countries from "./Countries";
import { useWeatherStore } from "../zustand/weatherStore";
import { forecastHandler } from "./../utils/forecastHandler";

export default function WeatherBoard() {
  const [home, setHome] = useState(true);
  const storeActiveLocal = useWeatherStore((state) => state.activeLocal);
  const storeWeatherData = useWeatherStore((state) => state.weatherData);
  const storeSetWeather = useWeatherStore((state) => state.setWeather);
  const storeLoading = useWeatherStore((state) => state.loading);
  const storeSetLoading = useWeatherStore((state) => state.setLoading);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const isHome = () => {
    storeActiveLocal === null ? setHome(true) : setHome(false);
  };

  const fetchForecast = async (lat, lon) => {
    var apiKey = process.env.API_KEY;
    var responses = {
      data: null,
      today: null,
    };
    await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    }).then(async (apiResFor) => {
      responses.data = await apiResFor.data;
    });

    await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    })
      .then(async (apiResWea) => {
        responses.today = await apiResWea.data;
      })
      .then(async () => {
        storeSetWeather(
          forecastHandler(
            responses.data,
            responses.today,
            storeActiveLocal.name
          )
        );
      })
      .finally(async () => {
        await sleep(1000);
        storeSetLoading(2);
      });
  };

  /*  0 = home, 1 = loading, 2 = done */
  useEffect(() => {
    if (storeLoading === 0) {
      isHome();
    }
    if (storeLoading === 1) {
      fetchForecast(storeActiveLocal.lat, storeActiveLocal.lon);
    }
    if (storeLoading === 2) {
    }
  }, [storeLoading, storeActiveLocal]);

  return (
    <div className=" bg-gray-200 min-h-screen min-w-screen">
      <div className="flex flex-col pt-[3%] w-screen ">
        <div className="flex justify-center mb-10">
          <Countries />
        </div>

        {storeLoading === 0 && (
          <div className="flex justify-center items-start ">
            <h3 className=" text-3xl font-normal  text-black">
              Select a location above.
            </h3>
          </div>
        )}

        {storeLoading === 1 && (
          <div className="flex justify-center items-start">
            <RotateLoader className="m-5" />
          </div>
        )}

        {storeLoading === 2 && (
          <div className="flex mt-1 flex-col justify-center items-center relative">
            <div className="scale-75 sm:my-5 sm:scale-100">
              <WeatherCard
                today={true}
                title={storeWeatherData.name}
                date={storeWeatherData.reports[0].date}
                avgTemp={storeWeatherData.reports[0].avgTemp}
                humid={storeWeatherData.reports[0].humid}
                img={storeWeatherData.reports[0].img}
                maxTemp={storeWeatherData.reports[0].maxTemp}
                minTemp={storeWeatherData.reports[0].minTemp}
                data={storeWeatherData.reports[1]}
              />
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 mb-5">
              {storeWeatherData.reports[1].map((e) => {
                return (
                  <WeatherCard
                    key={e.date}
                    today={false}
                    title={storeWeatherData.name}
                    date={e.date}
                    humid={e.humid}
                    img={e.img}
                    eveTemp={e.eveTemp}
                    morTemp={e.morTemp}
                    nitTemp={e.nitTemp}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
