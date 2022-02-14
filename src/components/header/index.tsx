import React from "react";
import classNames from "classnames";

import { Logo } from "@components";
import styles from "@styles/components/header.module.scss";
import Link from "next/link";

const NAVS = [
  { url: "/store", name: "store" },
  { url: "/faq", name: "faq" },
  { url: "/help", name: "help" },
];

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="d-flex justify-content-between align-items-center text-dark-theme h-100">
        <div className="d-flex align-items-center">
          <Logo />
          {NAVS.map((nav, id) => (
            <Link href={nav.url} key={id}>
              <div className="d-flex align-items-center px-3 text-uppercase nav-hover">
                {nav.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="d-flex align-items-center h-100">
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
