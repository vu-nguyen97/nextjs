import React from "react";
import { Header, Main, Footer } from "@components";

function help() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main title="Help" />
      <Footer />
    </div>
  );
}

export default help;
