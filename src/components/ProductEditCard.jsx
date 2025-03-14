import React, { useState } from "react";
import Container from "./Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { lineSpinner } from "ldrs";
import toast from "react-hot-toast";
import useSWR from "swr";

lineSpinner.register();

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductEditCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/products/${id}`,
    fetcher
  );

  const handleCreateProduct = async (data) => {
    setIsSending(true);
    await fetch(import.meta.env.VITE_API_URL + "/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
    });
    setIsSending(false);

    if (data.back_to_product) {
      navigate("/product");
    }
    toast.success("Product update successfully");
    // console.log(data);
  };
  return (
    <section>
      <Container>
        <div className="bg-gray-100 rounded-lg shadow-md p-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-3">Edit Product</h1>
          <p className="mb-10 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            itaque maiores sit ullam obcaecati aliquid!
          </p>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="mb-3">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>

              <div className="mb-3">
                <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 bg-gray-300 rounded-sm"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 bg-gray-300 rounded-sm"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
              </div>

              <div className="flex gap-3">
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="mb-3">
                <label
                  htmlFor="product_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                  })}
                  defaultValue={data.name}
                  type="text"
                  id="product_name"
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none`}
                  placeholder="eg: Apple"
                />
                {errors.name?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Product name is required
                  </p>
                )}

                {errors.name?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Product name must be greater than 3 characters
                  </p>
                )}

                {errors.name?.type === "maxLength" && (
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
                  defaultValue={data.price}
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
                  {...register("back_to_product", { required: true })}
                  id="back_to_product"
                  type="checkbox"
                  defaultChecked
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
                  to={"/product"}
                  className="px-4 py-2  text-sm font-medium text-sky-500 bg-white rounded-lg border border-sky-500 hover:bg-sky-700 hover:text-white"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-500 hover:bg-sky-700"
                >
                  Edit Product
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
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductEditCard;
