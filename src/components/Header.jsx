import React from "react";
import Container from "./Container";
import useCookie from "react-use-cookie";
import useUserStore from "../stores/userUserStore";

const Header = () => {
  // const [userCookie] = useCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);

  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <header className="mb-5">
      <Container>
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Voucher App</h1>
            <p className="text-gray-500">MMS IT</p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={
                profile_image
                  ? profile_image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScvC6w8tifYJLzXGgX42aMl4aInILAAozKgw&s"
              }
              alt=""
              className="size-12 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <div>
              <p className="font-bold text-lg">{name}</p>
              <p className="text-sm text-stone-500">{email}</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
