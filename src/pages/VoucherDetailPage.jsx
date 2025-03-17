import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import VoucherDetailCard from "../components/VoucherDetailCard";

const VoucherDetailPage = () => {
  return <section>
    <Container>
      <Breadcrumb currentpageTitle={"Voucher Detail"} links={[{ title: "Voucher Module", path: "/voucher" }]} />
      <VoucherDetailCard />
    </Container>
  </section>;
};

export default VoucherDetailPage;
