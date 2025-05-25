import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = ({
  links: { prev, next },
  meta: { from, to, total, links },
  updateFetchUrl,
}) => {
  const handleprevBtn = () => {
    updateFetchUrl(prev);
  };

  const handlenextBtn = () => {
    updateFetchUrl(next);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
        </span>

        <div className="inline-flex shadow-xs rounded-lg mt-2 xs:mt-0">
          {/* <button
            onClick={handleprevBtn}
            disabled={!prev}
            className="border rounded-lg rounded-r-none border-gray-500 size-8 flex justify-center items-center text-sm font-medium text-black bg-white hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
          >
            <HiArrowLeft />
          </button>
          <button
            onClick={handlenextBtn}
            disabled={!next}
            className=" border border-gray-500 size-8 flex justify-center items-center rounded-lg  rounded-l-none text-sm font-medium text-black bg-white hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
          >
            <HiArrowRight />
          </button> */}

          {links.map((link) => {
            return (
              <button
                key={link.label}
                onClick={() => updateFetchUrl(link.url)}
                disabled={!link.url}
                className={`${link.active ? "bg-sky-300 hover:bg-sky-300" : "bg-white"} first:rounded-lg last:rounded-lg first:rounded-r-none last:rounded-l-none border border-gray-500 border-r-0 last:border size-8 flex justify-center items-center text-sm font-medium text-black hover:bg-sky-200 disabled:pointer-events-none disabled:opacity-50`}
              >
                {link.label === "&laquo; Previous" ? (
                  <HiArrowLeft />
                ) : link.label === "Next &raquo;" ? (
                  <HiArrowRight />
                ) : (
                  link.label
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
