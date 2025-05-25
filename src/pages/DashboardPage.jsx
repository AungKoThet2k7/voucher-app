import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import { HiBriefcase, HiUserCircle } from "react-icons/hi2";
import { MdOutlinePointOfSale } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import Logout from "../components/Logout";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
          <div className="col-span-1">
            <ModuleBtn
              name={"product Module"}
              icon={<HiBriefcase className="size-10" />}
              url={"/dashboard/product"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Sale Module"}
              icon={<MdOutlinePointOfSale className="size-10" />}
              url={"/dashboard/sale"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-10" />}
              url={"/dashboard/voucher"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"User Profile"}
              icon={<HiUserCircle className="size-10" />}
              url={"/dashboard/user-profile"}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <p className="pointer-events-none font-sans ">If you want to logout .</p>
          <Logout />
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
