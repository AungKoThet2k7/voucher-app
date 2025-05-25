import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import ProductCreateCard from "../components/ProductCreateCard";
import ProductEditCard from "../components/ProductEditCard";

const ProductEditPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentpageTitle={"Product Edit"}
          links={[{ title: "Product Module", path: "/dashboard/product" }]}
        />
        <ProductEditCard />
      </Container>
    </section>
  );
};

export default ProductEditPage;
