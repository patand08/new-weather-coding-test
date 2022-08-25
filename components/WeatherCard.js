import React from "react";
import Image from "next/image";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { WiRaindrop, WiHorizonAlt, WiDaySunny } from "react-icons/wi";
import { BsFillMoonStarsFill } from "react-icons/bs";

export default function WeatherCard(props) {
  return (
    <div>
      <div
        className={
          "max-w-md " +
          (props.today ? " scale-125 " : " ") +
          " rounded-lg border shadow-md bg-gradient-to-b from-gray-600 to-gray-900 border-gray-500 relative "
        }
      >
        <Image
          src={"/./../static/img/" + props.img + ".jpg"}
          alt={props.img}
          layout="fill"
          objectFit="cover"
          className="object-contain mix-blend-overlay rounded-lg absolute noDrag"
        />
        <div className="pb-5 pt-3 flex flex-col justify-center items-center relative">
          <h3 className=" text-3xl font-normal tracking-tight text-white">
            {props.title}
          </h3>
          <p className="mb-2 text-sm font-semibold tracking-tight text-white">
            {props.date}
          </p>
          {/* Today's weather */}
          {props.today && (
            <>
              <h3 className="my-1 text-5xl font-normal tracking-tight text-white">
                {Math.trunc(props.avgTemp) + "°C"}
              </h3>
              <p className="mb-6 text-sm font-semibold tracking-tight text-white">
                AVG
              </p>
            </>
          )}
          {/* Forecast not today */}
          {!props.today && (
            <>
              <div className="divide-x-2 mb-3 mx-2 divide-slate-400/70 py-3 grid grid-cols-3  items-center">
                {/* morning */}
                <div className="pl-1 pr-2 flex justify-center items-center">
                  <WiHorizonAlt
                    className="mt-2 mr-1"
                    color="#FFFFFF"
                    size="26px"
                  />
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {Math.trunc(props.morTemp) + "°C"}
                  </h3>
                </div>
                {/* eve */}
                <div className="pl-1 pr-2 flex justify-center items-center">
                  <WiDaySunny
                    className="mt-1 mr-1"
                    color="#FFFFFF"
                    size="26px"
                  />
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {Math.trunc(props.eveTemp) + "°C"}
                  </h3>
                </div>
                {/* nit */}
                <div className="pl-1 pr-2 flex justify-center items-center">
                  <BsFillMoonStarsFill
                    className="mt-1 mr-2"
                    color="#FFFFFF"
                    size="16px"
                  />
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {Math.trunc(props.nitTemp) + "°C"}
                  </h3>
                </div>
              </div>
            </>
          )}
          <div className="absolute bottom-0 right-0 flex justify-center items-center pr-5">
            <WiRaindrop
              className={props.today ? " mt-2" : " "}
              color="#FFFFFF"
              size="30px"
            />
            {/* humidity */}
            <h3
              className={
                "text-xl font-semibold tracking-tight text-white" +
                (!props.today ? " mb-2 " : " ")
              }
            >
              {props.humid + "%"}
            </h3>
          </div>
        </div>
        {/* Today */}
        {props.today && (
          <div className="flex divide-y-2 divide-white/70 flex-col justify-center p-4 pt-1">
            <div></div>
            <div className="divide-x-2 divide-white/70 p-3 grid grid-cols-2  items-center">
              {/* Max temp */}
              <div className=" flex ml-[-0.5rem] justify-center items-center">
                <RiArrowDownSFill color="#0EA5E9" size="32px" />
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {Math.trunc(props.minTemp) + "°C"}
                </h3>
              </div>
              {/* Min temp */}
              <div className=" flex justify-center items-center">
                <RiArrowUpSFill color="#DC2626" size="32px" />
                <h3 className="text-2xl  pr-4 font-semibold tracking-tight text-white">
                  {Math.trunc(props.maxTemp) + "°C"}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
