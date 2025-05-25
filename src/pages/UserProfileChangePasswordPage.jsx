import React from "react";
import { HiPencilSquare } from "react-icons/hi2";
import useCookie from "react-use-cookie";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/userUserStore";

const UserProfileChangePasswordPage = () => {
  const navigate = useNavigate();

  const [token] = useCookie("token");

  const [userCookie, setUserCookie] = useCookie("user");

  const { name, password } = JSON.parse(userCookie);
  const { user, setUser } = useUserStore();

  console.log(password);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateName = async (data) => {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-name",
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (res.status === 200) {
      toast.success("Name updated successfully");
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
      navigate("/dashboard/user-profile");
    } else {
      toast.error(json.message);
    }
  };

  return (
    <section>
      <Container>
        <Breadcrumb
          currentpageTitle={"Change Password"}
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        />

        <form
          onSubmit={handleSubmit(handleUpdateName)}
          className="flex flex-col gap-3 border border-gray-300 rounded-lg p-10"
        >
          <div className="">
            <label
              htmlFor="product_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Change Your Name
            </label>
            <input
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              defaultValue={name}
              type="text"
              id="name"
              className={`bg-gray-50 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm  rounded-lg block w-full p-2.5 focus-visible:outline-none`}
              placeholder="eg: Kyaw Kyaw"
            />
            {errors.name?.type === "required" && (
              <p className="mt-2 text-sm text-red-600">Name is required</p>
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

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300  sm:w-auto"
          >
            Change Name
            <HiPencilSquare className="ml-2" />
          </button>
        </form>
      </Container>
    </section>
  );
};

export default UserProfileChangePasswordPage;
