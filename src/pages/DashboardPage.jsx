import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import { HiBriefcase } from "react-icons/hi2";
import { MdOutlinePointOfSale } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div className="col-span-1">
            <ModuleBtn
              name={"product Module"}
              icon={<HiBriefcase className="size-10" />}
              url={"/product"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Sale Module"}
              icon={<MdOutlinePointOfSale className="size-10" />}
              url={"/sale"}
            />
          </div>
          <div className="col-span-1">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-10" />}
              url={"/voucher"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
