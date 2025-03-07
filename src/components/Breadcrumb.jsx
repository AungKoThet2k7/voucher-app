import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowRight, HiChevronRight, HiHome, HiMiniHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Breadcrumb = ({ currentpageTitle }) => {
  return (
    <div className="w-full flex gap-3 mb-5">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-400"
            >
              <HiMiniHome className="me-2"/>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <HiChevronRight className="" />
              <span
                className="ms-1 text-sm font-medium text-gray-700 "
              >
                {currentpageTitle}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
