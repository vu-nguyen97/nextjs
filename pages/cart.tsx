import React, { useEffect, useState } from "react";
import { Button, Layout, PaymentMethod, ModalInfo } from "@components";
import styles from "@styles/pages/cart.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@redux/store";
import { deleteOrder } from "@redux/actions";
import api from "src/services/axios.config";
import Link from "next/link";
import { addOrder, Order } from "@redux/slices/order";

function cart() {
  const dispatch = useAppDispatch();
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderData, setOrderData] = useState<Order>();

  useEffect(() => {
    api.get("/store/current-order").then(
      (res) => {
        setOrderData(res.data);
      },
      () => {}
    );
  }, []);

  const handleRemovePack = (pack: any) => {
    if (orderData?.packages.length === 1) {
      api.delete(`/store/orders/${orderData.id}`).then(
        (res) => {
          dispatch(deleteOrder());
          setOrderData(res.data);
        },
        () => {}
      );
    }

    const newPackages = orderData?.packages.filter(
      (packInfo) => packInfo.id !== pack.id
    );

    api({
      method: "put",
      url: `store/orders/${orderData?.id}`,
      data: {
        accountId: orderData?.accountId,
        packages: newPackages,
      },
    }).then(
      (res) => {
        dispatch(addOrder(res.data));
        setOrderData(res.data);
      },
      () => {}
    );
  };

  const onClickBuy = () => {
    if (!orderData?.accountId) {
      setIsOpenModal(true);
    } else {
      setIsShowPaymentMethod(true);
    }
  };

  const onSubmitCreditCard = (data: any) => {
    console.log("Payment :>> ", data);
    const { cardNumber, expiration, csc } = data;

    const cardNumParam = cardNumber.split("-").join("");
    let expirationParam = expiration.split("/").join("");
    expirationParam =
      expirationParam.slice(0, 2) + ":20" + expirationParam.slice(2);

    const card = cardNumParam + ":" + expirationParam + ":" + csc;

    // api({
    //   method: "post",
    //   url: "/store/purchase",
    //   data: {
    //     // check
    //     orderId: orderState[0].id,
    //     card,
    //   },
    // });
  };

  const cellClassName = "d-flex align-items-center px-lg-3 p-2 h-100 w-100";
  let subTotal = 0;

  return (
    <Layout>
      <div className="container my-5">
        {!orderData?.id ? (
          <div className="text-center h5 fst-italic">
            You have no items in your cart.
          </div>
        ) : (
          <>
            <div className="row g-0 border">
              <div className="col-3">
                <div className={styles.cartHeader}>Game</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Package</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Account id</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Quantity</div>
              </div>
              <div className="col-3">
                <div className={styles.cartHeader}>Total</div>
              </div>
            </div>

            {orderData?.packages.map((pack) => {
              const { accountId, gameName, gameIcon } = orderData;
              const { quantity, usdValue, discountPercentage } = pack;
              const discount =
                discountPercentage > 1
                  ? discountPercentage / 100
                  : discountPercentage;
              const realPrice = usdValue * (1 - discount);
              const packPrice = realPrice * quantity;
              subTotal += packPrice;

              return (
                <div
                  className={classNames("row g-0 border", styles.itemRow)}
                  key={pack.id}
                >
                  <div className="col-3">
                    <div className={cellClassName}>
                      <div className="d-flex align-items-center">
                        <img
                          src={gameIcon || "/avatar-game.jpg"}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <div className="h6 m-0 ms-2">{gameName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                    <div className={cellClassName}>
                      <div>${usdValue}</div>
                    </div>
                  </div>

                  <div className="col-2">
                    <div className={cellClassName}>
                      <div>
                        {accountId || (
                          <Link href="/profile/linked-accounts">
                            <a className="font-size-14">Link account</a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                    <div className={cellClassName}>{quantity}</div>
                  </div>

                  <div className="col-3">
                    <div className={cellClassName}>
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
                          <div className="h6 m-0 w-price">${packPrice}</div>
                          <div className="badge bg-info ms-2 font-size-12 w-badge">
                            -{discount * 100}%
                          </div>
                        </div>
                        <div
                          className="cursor-pointer d-flex"
                          onClick={() => handleRemovePack(pack)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-3 d-flex justify-content-end">
              <div>
                <div className="d-flex align-items-center">
                  <div className="font-size-14">Subtotal :</div>
                  <div
                    className={classNames(
                      "h5 m-0 text-danger text-end",
                      styles.subTotal
                    )}
                  >
                    ${subTotal}
                  </div>
                </div>

                <Button
                  className="mt-2 w-100 text-uppercase font-size-13"
                  onClick={onClickBuy}
                >
                  Buy now
                </Button>
              </div>
            </div>

            <PaymentMethod
              isOpen={isShowPaymentMethod}
              isShowSaveCheckbox={true}
              submitCardBtn="Buy"
              onSubmitCreditCard={onSubmitCreditCard}
            />

            <ModalInfo
              isOpen={isOpenModal}
              onHide={() => setIsOpenModal(false)}
            >
              <div>
                <i className="h1 bi bi-exclamation-triangle text-warning"></i>
                <div className="h6 mt-3">
                  The game below have not been linked to accounts:
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <img
                    className="me-2 rounded"
                    src={orderData.gameIcon || "/avatar-game.jpg"}
                    width={20}
                    height={20}
                  />
                  {orderData.gameName}
                </div>

                <Link href="/profile/linked-accounts">
                  <div className="mt-3">
                    <Button size="sm">Link account now</Button>
                  </div>
                </Link>
              </div>
            </ModalInfo>
          </>
        )}
      </div>
    </Layout>
  );
}

export default cart;
