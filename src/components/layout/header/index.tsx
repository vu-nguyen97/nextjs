import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { RootState, useAppDispatch } from "@redux/store";
import { addOrder, logout } from "@redux/actions";
import { Logo } from "@components";
import styles from "@styles/components/header.module.scss";
import Link from "next/link";
import api from "src/services/axios.config";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { TABS } from '../../profile/layout';

const NAVS = [
  { url: "/", name: "store" },
  // { url: "/faq", name: "faq" },
  // { url: "/help", name: "help" },
];

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activedNav, setActivedNav] = useState(null);
  const [userName, setUserName] = useState("");
  const [isActive, setIsactive] = useState(false);
  const [activeProfilePage, setActiveProfilePage] = useState(null)

  const orderData = useSelector((state: RootState) => state.order.data);
  const accountInfo = useSelector((state: RootState) => state.account.user);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    const pathname = location.pathname.split("/").slice(1);
    const activedNav = NAVS.find((nav) => nav.url === `/${pathname[0]}`);

    if (activedNav) {
      setActivedNav(activedNav.url);
    } else if (pathname[0] === 'profile' && pathname.length === 1 ) {
      setActiveProfilePage('')
    } else if (pathname[0] === 'profile') {
      setActiveProfilePage(pathname[1])
    }

    if (accountInfo!.email) {
      setUserName(accountInfo!.email);
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

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (
      !isActive ||
      e.target === hamburger.current
    ) {
      return;
    }

    closeMenu();
  };

  return (
    <div className={styles.header}>
      <div className="d-flex justify-content-between align-items-center text-dark-theme h-100">
        <div className="d-flex align-items-center h-100">
          <Link href="/">
            <div className="cursor-pointer"><Logo /></div>
          </Link>
          
          <div className="d-none d-lg-flex align-items-center h-100">
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
        </div>

        <div className="d-flex align-items-center h-100">
          <Link href="/cart">
            <div
              className="d-flex align-items-end me-2 mb-1 cursor-pointer position-relative"
              title="Cart"
            >
              <div>
                <i className="h4 bi bi-cart2"></i>
              </div>

              <div className={styles.notificationIcon}>
                {orderData?.id && (
                  <div
                    className={classNames(
                      "text-white font-size-12 d-flex align-items-center justify-content-center",
                      styles.number
                    )}
                  >
                    {orderData?.packages.length}
                  </div>
                )}
              </div>
            </div>
          </Link>

          <div className="d-none d-lg-flex align-items-center h-100">
            <Link href="/profile">
              <div>
                <Button
                  variant="success"
                  className="accountAvt rounded-circle flex-shrink-0"
                  size="sm"
                  title={userName}
                >
                  {userName && userName[0].toUpperCase()}
                </Button>
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

          <div className="d-lg-none me-4">
            <button
              ref={hamburger}
              className="header-nav-toggle"
              onClick={isActive ? closeMenu : openMenu}
            >
              <span className="screen-reader">Menu</span>
              <span className="hamburger">
                <span className="hamburger-inner"></span>
              </span>
            </button>  
          </div>
        </div>
      </div>
      
      <div ref={nav} className={classNames(isActive && styles.isActive, 'd-lg-none', styles.headerMobile)}>
        {NAVS.map((nav, id) => (
          <Link href={nav.url} key={id}>
            <div className={classNames("py-2 cursor-pointer text-uppercase", nav.url === activedNav && 'fw-bold text-primary')}>
              {nav.name}
            </div>
          </Link>
        ))}

        {TABS.map((tab, id) => (
          <Link href={`/profile/${tab.url}`} key={id}>
            <div className={classNames("py-2 cursor-pointer text-uppercase", tab.url === activeProfilePage && 'fw-bold text-primary')}>
              {tab.name}
            </div>
          </Link>
        ))}

        <Link href="/login"><div className="py-2 cursor-pointer text-uppercase">Logout</div></Link>
      </div>
    </div>
  );
};
