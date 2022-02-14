import React from "react";
import { Header, Footer } from "@components";
import { Container } from "react-bootstrap";
import styles from "@styles/pages/profile.module.scss";
import classNames from "classnames";
import Link from "next/link";

const TABS = [
  { url: "", name: "General", icon: "person-fill" },
  { url: "communications", name: "Communications", icon: "bell-fill" },
  {
    url: "payment-management",
    name: "Payment management",
    icon: "credit-card-fill",
  },
  { url: "transactions", name: "Transactions", icon: "bag-check-fill" },
  { url: "history", name: "History", icon: "clock-history" },
];

export const ProfileLayout: React.FC = ({ children }: any) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="py-4 flex-grow-1">
        <Container>
          <div className="d-flex">
            <div className={styles.sideBar}>
              {TABS.map((tab, id) => (
                <Link href={`/profile/${tab.url}`} key={id}>
                  <div
                    className={classNames(
                      "d-flex align-items-center",
                      styles.tab
                    )}
                  >
                    <i className={`h5 m-0 bi bi-${tab.icon}`}></i>
                    <div className="ms-2 text-uppercase font-size-12">
                      {tab.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex-grow-1 ms-3 p-4 border">{children}</div>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};
