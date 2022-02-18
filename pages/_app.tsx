import React from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import { Provider } from "react-redux";
import storeInstance from "@redux/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { store, persistor } = storeInstance;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />

        <ToastContainer autoClose={3500} hideProgressBar />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
