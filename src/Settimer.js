import React from "react";
import moment from "moment";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Settimer({
  title,
  count,
  handleincrease,
  handledecrease,
}) {
  const timeinminutes = moment.duration(count, "s").minutes();

  return (
    <div className="timer-container">
      <h1>{title}</h1>
      <div className="flex action-wrapper">
        <button onClick={handledecrease}>
          <FaMinus />
        </button>
        <span>{timeinminutes}</span>
        <button onClick={handleincrease}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
