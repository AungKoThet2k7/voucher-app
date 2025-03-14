import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { lineSpinner } from "ldrs";
import useRecordStore from "../stores/useRecordStore";
import toast from "react-hot-toast";

lineSpinner.register();

const VoucherTableRow = ({
  record: {
    id,
    quantity,
    cost,
    product: { name, price },
  },
  index,
}) => {
  const { removeRecord, changeQuantity } = useRecordStore();


  const handleDelete = () => {
    removeRecord(id);
    toast.success("Record deleted successfully");
  };

  const increseQuantity = () => {
    changeQuantity(id, 1);
  };
  const decreseQuantity = () => {
    changeQuantity(id, -1);
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50  border-b border-gray-200 group">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {index + 1}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4 text-end flex justify-center items-center gap-3">
        <button onClick={decreseQuantity}>
          <CiCircleMinus className="size-4 text-sky-500" />
        </button>
        {quantity}
        <button onClick={increseQuantity}>
          <CiCirclePlus className="size-4 text-sky-500" />
        </button>
      </td>
      <td className="px-6 py-4 text-end">{cost}</td>
      <td className="px-6 py-4 flex justify-center">
        <button
          onClick={handleDelete}
          type="button"
          className="size-8 text-sm font-medium text-red-500 hover:text-red-700"
        >
          <HiOutlineTrash className="size-5" />
        </button>
      </td>
    </tr>
  );
};

export default VoucherTableRow;
