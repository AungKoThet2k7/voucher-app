import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import SaleForm from "../components/SaleForm";
import VoucherInfo from "../components/voucherInfo";

const SalePage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentpageTitle={"Sale Module"} />
        <VoucherInfo />
      </Container>
    </section>
  );
};

export default SalePage;
