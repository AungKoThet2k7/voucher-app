import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="flex flex-col items-center gap-3 bg-sky-500 text-white p-5 rounded-lg"
    >
      {icon}
      {name}
    </Link>
  );
};

export default ModuleBtn;
