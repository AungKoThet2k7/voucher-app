import React from "react";
import { HiCamera, HiLockOpen, HiPencil, HiPencilSquare } from "react-icons/hi2";
import useCookie from "react-use-cookie";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userUserStore";

const UserProfilePage = () => {
  // const [userCookie] = useCookie("user");

  // const { name, email, profile_image } = JSON.parse(userCookie);

  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <section>
      <Container>
        <Breadcrumb currentpageTitle={"User Profile"} />
        <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-10">
          <div className="flex gap-5">
            <div className="relative">
              <img
                className="size-40 rounded-lg"
                src={
                  profile_image
                    ? profile_image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScvC6w8tifYJLzXGgX42aMl4aInILAAozKgw&s"
                }
                alt="Helene avatar"
              />
              <Link
                to={"change-profile-image"}
                className="bg-sky-400 text-white hover:bg-sky-600 rounded-full border-2 border-white p-1 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
              >
                <HiCamera size={18} />
              </Link>
            </div>
            <div className="flex flex-col justify-end">
              <span className="mb-2 inline-block rounded bg-sky-100 px-2.5 py-0.5 text-sm font-semibold text-gray-900">
                Account Name
              </span>
              <div className="flex gap-3 items-center">
                <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 sm:text-2xl">
                  {name}
                </h2>
                <Link
                  to={"change-name"}
                  className="bg-sky-400 text-white hover:bg-sky-600 rounded-full p-1"
                >
                  <HiPencilSquare size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">Email Address</span>
            <h2 className="text-gray-500">{email}</h2>
          </div>

          <Link
            to={"change-password"}
            type="button"
            className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 sm:w-auto"
          >
            <HiLockOpen className="mr-2" />
            Change Password
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
