import html2pdf from "html2pdf.js";
import printJS from "print-js";
import React from "react";
import { useParams } from "react-router-dom";
import useCookie from "react-use-cookie";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherDetailCard = () => {

   const [token] = useCookie("token");

  const fetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { id } = useParams();

  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + "/vouchers/" + id,
    fetcher
  );

  


  // const { data, isLoading, error } = useSWR(
  //   import.meta.env.VITE_API_URL + `/vouchers/` + id,
  //   fetcher
  // );

  const handlePrint = () => {
    printJS({
      printable: "printArea",
      type: "html",
      css: "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css", // Load Tailwind
      scanStyles: false,
    });
  };

  const handlePdf = () => {
    const content = document.querySelector("#printArea");

    html2pdf()
      .set({
        margin: 0.5,
        filename: "voucher.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a5" },
      })
      .from(content)
      .save();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-3">
      <div
        id="printArea"
        className="w-[14.8cm] bg-white p-8 border border-gray-200"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              INVOICE
            </h1>
            <div className="mt-1 text-sm text-gray-600">
              <p>{data?.data?.voucher_id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-md text-gray-700 font-bold">Invoice to</p>
            <p className="text-sm font-medium text-gray-700">
              {data?.data?.customer_name}
            </p>
            <p className="text-sm text-gray-600">Date: {data?.data?.sale_date}</p>
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  total
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.records.map((record, index) => (
                <tr key={index} className="  border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-5 py-4">{record.product.product_name}</td>
                  <td className="px-5 py-4 text-right">{record.quantity}</td>
                  <td className="px-5 py-4 text-right">
                    {record.product.price}
                  </td>
                  <td className="px-5 py-4 text-right">{record.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-b ">
                <th
                  scope="row"
                  colSpan={4}
                  className="px-5 py-4 text-right font-medium text-gray-500 whitespace-nowrap"
                >
                  Total
                </th>
                <td className="px-5 py-4 text-right">
                  {data?.data?.total.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={4}
                  className="px-5 py-4 text-right font-medium text-gray-500 whitespace-nowrap"
                >
                  Tax
                </th>
                <td className="px-5 py-4 text-right" id="recordTax">
                  {data?.data?.tax.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <th
                  scope="row"
                  colSpan={4}
                  className="px-5 py-4 text-right font-medium text-gray-500 whitespace-nowrap"
                >
                  Net Total
                </th>
                <td className="px-5 py-4 text-end" id="recordNetTotal">
                  {data?.data?.net_total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-between mt-5">
          <div className="text-sm text-gray-800">
            <div className="text-lg font-semibold mb-2">
              Payment Transfer to
            </div>
            <p className="">
              Kpay, Wave: <span className="font-medium">09250152018</span>
            </p>
            <p className="">
              KBZ Bank: <span className="font-medium">02730102705025601</span>
            </p>
            <p className="">
              AYA Bank: <span className="font-medium">20003674121</span>
            </p>
          </div>
          <div className="text-sm text-gray-800 text-right">
            <p className="text-lg font-bold mb-2">MMS IT</p>
            <p>48, 1st Floor, Shan Kone St.</p>
            <p>+959-250-152-018</p>
            <p>enquiry@mms-it.com</p>
          </div>
        </div>

        <div className="border-t border-gray-400 text-center mt-5 pt-4">
          <p>Thanks to You</p>
        </div>

        <div className="mt-4 text-sm text-gray-800"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 w-30 flex items-center gap-1 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
          >
            Print Voucher
          </button>
        </div>
        <div>
          <button
            onClick={handlePdf}
            className="px-4 py-2 w-30 flex items-center gap-1 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
          >
            Download Pdf
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetailCard;
