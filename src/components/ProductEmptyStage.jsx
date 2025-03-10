import React from "react";

const ProductEmptyStage = () => {
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b border-gray-200">
      <td colSpan={5} className="px-6 py-4 text-center">
        There is no Product yet
      </td>
    </tr>
  );
};

export default ProductEmptyStage;
