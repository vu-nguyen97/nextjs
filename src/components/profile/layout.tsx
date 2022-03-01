import React, { useEffect, useState } from "react";
import { Layout } from "@components";
import { Container } from "react-bootstrap";
import styles from "@styles/pages/profile.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const TABS = [
  { id: 0, url: "", name: "General", icon: "person-fill" },
  {
    id: 1,
    url: "linked-accounts",
    name: "Linked Accounts",
    icon: "link-45deg",
  },
  // {
  //   id: 2,
  //   url: "payment-management",
  //   name: "Payment management",
  //   icon: "credit-card-fill",
  // },
  // { id: 3, url: "transactions", name: "Transactions", icon: "bag-check-fill" },
  { id: 4, url: "history", name: "History", icon: "clock-history" },
];

export const ProfileLayout: React.FC = ({ children }: any) => {
  const router = useRouter();
  const [activedTab, setActivedTab] = useState(0);

  useEffect(() => {
    const slug = router.route?.split("/")?.slice(-1)[0];
    const activedTab = TABS.find((el) => el.url === slug);

    if (activedTab) {
      setActivedTab(activedTab.id);
    }
  }, []);

  return (
    <Layout>
      <div className="py-4 flex-grow-1">
        <Container>
          <div className="d-flex">
            <div>
              <div className={styles.sideBar}>
                {TABS.map((tab) => (
                  <Link href={`/profile/${tab.url}`} key={tab.id}>
                    <div
                      className={classNames(
                        "d-flex align-items-center fw-bold",
                        styles.tab,
                        { [styles.activedTab]: activedTab === tab.id }
                      )}
                    >
                      <i className={`h5 m-0 bi bi-${tab.icon}`}></i>
                      <div className="ms-2 text-uppercase font-size-11 mt-1">
                        {tab.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-100">
              <div className={classNames("ms-3 border", styles.content)}>
                {children}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
