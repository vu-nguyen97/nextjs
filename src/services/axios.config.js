import axios from "axios";
import storeInstance from "@redux/store";
import { toast } from "react-toastify";
import Router from "next/router";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST + "/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
});

service.interceptors.request.use(
  function (config) {
    const token = storeInstance.store.getState()?.account?.token || "";

    if (token) {
      config.headers["X-Authorization"] = token;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    const managedStatus = [400, 401];

    if (managedStatus.includes(response.data?.code)) {
      if (response.data?.data) {
        toast(response.data?.data, { type: "error" });
      }

      if (response.data?.code === 401) {
        Router.push("login");
      }

      return Promise.reject(new Error(response.data?.message || "Error"));
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
