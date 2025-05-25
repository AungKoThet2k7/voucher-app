import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../stores/useRecordStore";
import useCookie from "react-use-cookie";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SaleForm = () => {

   const [token] = useCookie("token");

  const fetcher = (url) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/products?limit=100",
    fetcher
  );

  const { register, handleSubmit, reset } = useForm();

  const { addRecord, records, changeQuantity } = useRecordStore();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);

    const currentProductId = currentProduct.id;

    const isExited = records.find(
      ({ product: { id } }) => currentProductId === id
    );

    if (isExited) {
      changeQuantity(isExited.id, data.quantity);
      reset();

    } else {
      addRecord({
        id: Date.now(),
        product_id: currentProductId,
        product: currentProduct,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      });
      reset();
    }
    
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-5 border shadow-md border-gray-50 p-5 rounded-lg mb-5"
      >
        <div className="col-span-2">
          <label
            htmlFor="selectProduct"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Product
          </label>
          <select
            id="selectProduct"
            name="select_product"
            {...register("product")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">Select a product</option>
            {isLoading ? (
              <option>Loading...</option>
            ) : (
              data?.data?.map((product) => (
                <option key={product.id} value={JSON.stringify(product)}>
                  {product.product_name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="col-span-1">
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity")}
            name="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Quantity"
            required
          />
        </div>

        <div className="col-span-1 flex items-end">
          <button
            type="submit"
            className="text-sky-500 w-full border border-sky-500 bg-white  rounded-lg hover:bg-sky-700 hover:text-white font-medium text-sm px-5 py-2.5"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
