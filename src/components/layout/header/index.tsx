import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { RootState, useAppDispatch } from "@redux/store";
import { addOrder, logout } from "@redux/actions";
import { Logo } from "@components";
import styles from "@styles/components/header.module.scss";
import Link from "next/link";
import api from "src/services/axios.config";
import { useSelector } from "react-redux";

const NAVS = [
  { url: "/", name: "store" },
  { url: "/faq", name: "faq" },
  { url: "/help", name: "help" },
];

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activedNav, setActivedNav] = useState("");
  const orderData = useSelector((state: RootState) => state.order.data);

  useEffect(() => {
    const pathname = location.pathname.split("/").slice(1);
    const activedNav = NAVS.find((nav) => nav.url === `/${pathname[0]}`);

    if (activedNav) {
      setActivedNav(activedNav.url);
    }

    api.get("/store/current-order").then(
      (res) => {
        if (res.data?.id) {
          dispatch(addOrder(res.data));
        }
      },
      () => {}
    );
  }, []);

  return (
    <div className={styles.header}>
      <div className="d-flex justify-content-between align-items-center text-dark-theme h-100">
        <div className="d-flex align-items-center h-100">
          <Logo />
          {NAVS.map((nav, id) => (
            <Link href={nav.url} key={id}>
              <div className="d-flex align-items-center px-3 text-uppercase nav-hover h-100 position-relative">
                {nav.name}

                {nav.url === activedNav && (
                  <span className={styles.activedLine} />
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="d-flex align-items-center h-100">
          <Link href="/cart">
            <div className="d-flex align-items-end me-2 mb-1 cursor-pointer">
              <div>
                <i className="h4 bi bi-cart-plus"></i>
              </div>

              <div className={styles.notificationIcon}>
                {orderData?.id && (
                  <div className={classNames("ms-1 mb-1", styles.dot)} />
                )}
              </div>
            </div>
          </Link>

          <Link href="/profile">
            <div className="nav-hover d-flex align-items-center cursor-pointer">
              <i className="h4 m-0 bi bi-person"></i>
              <span className="text-uppercase font-size-11 ms-2">
                vu nguyen 97
              </span>
            </div>
          </Link>

          <Link href="/login">
            <div
              onClick={() => dispatch(logout())}
              className={classNames(
                "d-flex align-items-center px-3 h-100 bg-primary text-white cursor-pointer",
                styles.logout
              )}
            >
              <i className="h5 m-0 bi bi-box-arrow-right"></i>
              <span className="ms-2">Log out</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
