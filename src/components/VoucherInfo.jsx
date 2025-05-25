import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { lineSpinner } from "ldrs";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../stores/useRecordStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

lineSpinner.register();

const VoucherInfo = () => {
  const [token] = useCookie("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const { records, resetRecords } = useRecordStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSending(true);
    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    const currrentVoucher = { ...data, records, total, tax, net_total };

    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currrentVoucher),
    });

    const json = await res.json();

    if (res.status === 200 || res.status === 201) {
      toast.success(json.message);
      
    } else {
      toast.error(json.message);
    }

    if (data.redirect_voucher_detail) {
        navigate(`/dashboard/vouchers/details/${json.data.id}`);
      }

    resetRecords();
    reset();

    setIsSending(false);
  };

  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${prefix}-${timestamp}-${randomNum}`;
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-3">
        <SaleForm />

        <VoucherTable />
      </div>
      <div className="col-span-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
          id="infoForm"
        >
          <div className="grid grid-cols-1 gap-5">
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="voucher_id"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Voucher Id
                </label>
                <input
                  {...register("voucher_id", {
                    required: true,
                  })}
                  type="text"
                  id="voucher_id"
                  defaultValue={generateInvoiceNumber()}
                  className={`bg-gray-50 border ${
                    errors.voucher_id ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                  placeholder="eg: 001"
                />
                {errors.voucher_id?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Voucher Id is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="customer_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Name
                </label>
                <input
                  {...register("customer_name", {
                    required: true,
                  })}
                  type="text"
                  id="customer_name"
                  className={`bg-gray-50 border ${
                    errors.customer_name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                  placeholder="eg: Kyaw Kyaw"
                />
                {errors.customer_name?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Customer Name is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="customer_email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Email
                </label>
                <input
                  {...register("customer_email", {
                    required: true,
                  })}
                  type="email"
                  id="customer_email"
                  className={`bg-gray-50 border ${
                    errors.customer_email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                  placeholder="eg: kyaw@gmail.com"
                />
                {errors.customer_email?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Customer Email is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-5">
                <label
                  htmlFor="sale_date"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sale Date
                </label>
                <input
                  {...register("sale_date", {
                    required: true,
                  })}
                  type="date"
                  id="sale_date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className={`bg-gray-50 border ${
                    errors.sale_date ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                  placeholder="eg: 1/Sept/2025"
                />
                {errors.sale_date?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Sale date is required
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-auto flex-col justify-end items-end gap-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="all_correct"
                className="text-sm font-medium text-gray-900"
              >
                Make sure all field are correct
              </label>
              <input
                {...register("all_correct")}
                id="all_correct"
                form="infoForm"
                type="checkbox"
                required
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="redirect_voucher_detail"
                className="text-sm font-medium text-gray-900"
              >
                Redirect to Voucher Detail
              </label>
              <input
                {...register("redirect_voucher_detail")}
                id="redirect_voucher_detail"
                form="infoForm"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
            </div>
            <button
              type="submit"
              form="infoForm"
              className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
            >
              Confirm Voucher
              {isSending && (
                <l-line-spinner
                  size="18"
                  stroke="1"
                  speed="1"
                  color="white"
                ></l-line-spinner>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherInfo;
