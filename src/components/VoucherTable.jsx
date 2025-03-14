import React from "react";
import useRecordStore from "../stores/useRecordStore";
import VoucherTableRow from "./VoucherTableRow";

const VoucherTable = () => {
  const { records } = useRecordStore();

  const total = records.reduce((a, b) => a + b.cost, 0);
  const tax = total * 0.07;
  const netTotal = total + tax;

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg mb-5">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Cost
            </th>
            <th scope="col" className="px-6 py-3 table-cell print:hidden">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody id="recordGroup">
          {records.length === 0 ? (
            <tr className="hidden last:table-row odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                colSpan={6}
                className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap"
              >
                There is no record. Buy somthing
              </th>
            </tr>
          ) : (
            records.map((record, index) => (
              <VoucherTableRow key={record.id} record={record} index={index} />
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="border-b">
            <th
              scope="row"
              colSpan={4}
              className="px-6 py-4 text-end font-medium text-gray-900 whitespace-nowrap"
            >
              Total
            </th>
            <td className="px-6 py-4 text-end">
              {total.toFixed(2)}
            </td>
            <td className="px-6 py-4 text-end">{""}</td>
          </tr>
          <tr className="border-b">
            <th
              scope="row"
              colSpan={4}
              className="px-6 py-4 text-end font-medium text-gray-900 whitespace-nowrap"
            >
              Tax ( Vat 7%)
            </th>
            <td className="px-6 py-4 text-end" id="recordTax">
              {tax.toFixed(2)}
            </td>
          </tr>
          <tr className="border-b">
            <th
              scope="row"
              colSpan={4}
              className="px-6 py-4 text-end font-medium text-gray-900 whitespace-nowrap"
            >
              Net Total
            </th>
            <td className="px-6 py-4 text-end" id="recordNetTotal">
              {netTotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default VoucherTable;
