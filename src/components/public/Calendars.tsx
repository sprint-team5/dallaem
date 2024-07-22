"use client";

import Calendar from "react-calendar";
import "./Calendars.scss";

const Calendars = () => {
  return (
    <div>
      <Calendar next2Label={null} prev2Label={null} locale="en" />
      <button className="bg-gray-400 text-sm font-semibold left-5 text-center">
        적용
      </button>
    </div>
  );
};

export default Calendars;
