import React from "react";
import { Header, Main, Footer } from "@components";

function store() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main title="Store" />
      <Footer />
    </div>
  );
}

export default store;
