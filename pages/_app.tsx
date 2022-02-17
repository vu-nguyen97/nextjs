import React from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <ToastContainer autoClose={3500} hideProgressBar />
    </Provider>
  );
}

export default MyApp;
