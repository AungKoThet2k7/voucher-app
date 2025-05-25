import React, { useState } from "react";
import Container from "./Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import useCookie from "react-use-cookie";

lineSpinner.register();

const ProductCreateCard = () => {
  const [token] = useCookie("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    setIsSending(true);
    const res = await fetch(import.meta.env.VITE_API_URL + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
    });

    const json = await res.json();

    setIsSending(false);

    if (data.back_to_product) {
      navigate("/dashboard/product");
    }

    if (res.status === 200 || res.status === 201) {
      toast.success(json.message);
      reset();
    } else {
      toast.error(json.message);
    }
    // console.log(data);
  };
  return (
    <section>
      <Container>
        <div className="bg-gray-100 rounded-lg shadow-md p-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-3">Create Product</h1>
          <p className="mb-10 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            itaque maiores sit ullam obcaecati aliquid!
          </p>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
            <div className="mb-3">
              <label
                htmlFor="product_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                {...register("product_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                type="text"
                id="product_name"
                className={`bg-gray-50 border ${
                  errors.product_name ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                placeholder="eg: Apple"
              />
              {errors.product_name?.type === "required" && (
                <p className="mt-2 text-sm text-red-600">
                  Product name is required
                </p>
              )}

              {errors.product_name?.type === "minLength" && (
                <p className="mt-2 text-sm text-red-600">
                  Product name must be greater than 3 characters
                </p>
              )}

              {errors.product_name?.type === "maxLength" && (
                <p className="mt-2 text-sm text-red-600">
                  Product name must be less than 20 characters
                </p>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="product_price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Product Price
              </label>
              <input
                {...register("price", {
                  required: true,
                  min: 100,
                  max: 10000,
                })}
                type="number"
                id="product_price"
                className={`bg-gray-50 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                placeholder="eg: 500"
              />
              {errors.price?.type === "required" && (
                <p className="mt-2 text-sm text-red-600">
                  Product price is required
                </p>
              )}

              {errors.price?.type === "min" && (
                <p className="mt-2 text-sm text-red-600">
                  Product price must be greater than 100
                </p>
              )}

              {errors.price?.type === "max" && (
                <p className="mt-2 text-sm text-red-600">
                  Product price must be less than 10000
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                {...register("all_correct", { required: true })}
                id="all_correct"
                type="checkbox"
                defaultValue
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
              <label
                htmlFor="all_correct"
                className="text-sm font-medium text-gray-900"
              >
                Make sure all field are correct
              </label>
              {errors.all_correct?.type === "required" && (
                <p className=" text-sm text-red-600">
                  Please make sure all field are correct
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                {...register("back_to_product")}
                id="back_to_product"
                type="checkbox"
                defaultValue
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
              />
              <label
                htmlFor="back_to_product"
                className="text-sm font-medium text-gray-900"
              >
                Back to product module after created
              </label>
            </div>

            <div className="flex gap-3">
              <Link
                to={"/dashboard/product"}
                className="px-4 py-2  text-sm font-medium text-sky-500 bg-white rounded-lg border border-sky-500 hover:bg-sky-700 hover:text-white"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
              >
                Create Product
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
      </Container>
    </section>
  );
};

export default ProductCreateCard;
