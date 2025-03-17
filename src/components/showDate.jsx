import React from "react";

const ShowDate = ({ timestamp ,hasTime= true}) => {
  // console.log(timestamp);
  const date = new Date(timestamp);

  const currentDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  // console.log(date);
  return (
    <div>
      <p>{currentDate}</p>
      {hasTime && <p>{currentTime}</p>}
    </div>
  );
};

export default ShowDate;
