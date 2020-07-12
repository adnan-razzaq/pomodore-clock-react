import React, { useState, useEffect } from "react";
import { GrPlayFill, GrSync } from "react-icons/gr";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

export default function Timeleft({
  timeleft,
  isplaying,
  playAndpause,
  curentses,
  reset,
}) {
  const formattedtime = moment
    .duration(timeleft, "s")
    .format("mm:ss", { trim: false });
  return (
    <div className="clock-container">
      <h1>{curentses === "session" ? "session" : "break"}</h1>
      <span>{formattedtime}</span>
      <div className="flex">
        <button onClick={playAndpause}>
          <GrPlayFill />
          {isplaying ? "play" : "stop"}
        </button>
        <button onClick={reset}>
          <GrSync />
        </button>
      </div>
    </div>
  );
}
