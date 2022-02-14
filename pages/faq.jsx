import React from "react";
import { Header, Main, Footer } from "@components";

function faq() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main title="FAQ" />
      <Footer />
    </div>
  );
}

export default faq;
