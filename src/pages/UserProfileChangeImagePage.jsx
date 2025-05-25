import React, { useRef } from "react";
import { HiCamera } from "react-icons/hi2";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import useCookie from "react-use-cookie";
import toast from "react-hot-toast";
import useUserStore from "../stores/userUserStore";

const UserProfileChangeImagePage = () => {
  const [token] = useCookie("token");

  const [userCookie, setUserCookie] = useCookie("user");

  const { profile_image } = JSON.parse(userCookie);
  const { user, setUser } = useUserStore();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  const handleUpdateImage = async (event) => {
    // console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);

    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          // Accept: "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (res.status === 200) {
      toast.success("Image updated successfully");
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
    } else {
      toast.error(json.message);
    }
  };

  const fileInputRef = useRef();

  const handleImageUploader = () => {
    // console.log(fileInputRef.current);
    fileInputRef.current.click();
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
          currentpageTitle={"Change Profile Image"}
        />

        <div className="border border-gray-300 rounded-lg p-10">
          <div className="relative inline-block">
            <img
              className="size-40 rounded-lg"
              src={
                profile_image
                  ? profile_image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScvC6w8tifYJLzXGgX42aMl4aInILAAozKgw&s"
              }
              alt=""
            />
            <button onClick={handleImageUploader} className="bg-sky-400 text-white hover:bg-sky-600 rounded-full border-2 border-white p-1 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <HiCamera size={20} />
            </button>
          </div>
        </div>

        {/* <form
          onSubmit={handleSubmit(handleUpdateImage)}
          className="flex flex-col gap-3 border border-gray-300 rounded-lg p-10"
        > */}
          
          <div className="">
            <input
              onChange={handleUpdateImage}
              ref={fileInputRef}
              // defaultValue={profile_image}
              type="file"
              id="profile_image"
              className={`bg-gray-50 border hidden text-gray-900 text-sm  rounded-lg w-full p-2.5 focus-visible:outline-none`}
            />

            
          </div>

          {/* <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300  sm:w-auto"
          >
            Change profile Image
            <HiCamera className="ml-2" />
          </button>
        </form> */}
      </Container>
    </section>
  );
};

export default UserProfileChangeImagePage;
