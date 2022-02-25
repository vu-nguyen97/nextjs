import React, { useState } from "react";
import { Button, Layout, PaymentMethod } from "@components";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import styles from "@styles/pages/cart.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@redux/store";
import { deleteOrder } from "@redux/actions";

function cart() {
  const dispatch = useAppDispatch();
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);

  const orderState = useSelector((state: RootState) => state.order.data);

  const handleRemoveOrder = (orderId: number) => {
    dispatch(deleteOrder(orderId));
  };

  const cellClassName = "d-flex align-items-center px-lg-3 p-2 h-100 w-100";
  let subTotal = 0;

  const onClickBuy = () => {
    setIsShowPaymentMethod(true);
  };

  return (
    <Layout>
      <div className="container my-5">
        {orderState.length === 0 ? (
          <div className="text-center h5 fst-italic">
            You have no items in your cart.
          </div>
        ) : (
          <>
            <div className="row g-0 border">
              <div className="col-4">
                <div className={styles.cartHeader}>Game</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Package</div>
              </div>
              <div className="col-3">
                <div className={styles.cartHeader}>Quantity</div>
              </div>
              <div className="col-3">
                <div className={styles.cartHeader}>Total</div>
              </div>
            </div>

            {orderState.map((order, id) => {
              const { game, pack, quantity } = order;
              const discount =
                pack.discountPercentage > 1
                  ? pack.discountPercentage / 100
                  : pack.discountPercentage;
              const realPrice = pack.usdValue * (1 - discount);
              const packPrice = realPrice * quantity;
              subTotal += packPrice;

              return (
                <div
                  className={classNames("row g-0 border", styles.itemRow)}
                  key={id}
                >
                  <div className="col-4">
                    <div className={cellClassName}>
                      <div className="d-flex align-items-center">
                        <img
                          src={game.icon || "/avatar-game.jpg"}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <div className="h6 m-0 ms-2">{game.name}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                    <div className={cellClassName}>
                      <div>{pack.usdValue}$</div>
                    </div>
                  </div>

                  <div className="col-3">
                    <div className={cellClassName}>{quantity}</div>
                  </div>

                  <div className="col-3">
                    <div className={cellClassName}>
                      <div className="d-flex justify-content-between w-100">
                        <div className="h6 m-0">{packPrice}$</div>
                        <div
                          className="cursor-pointer d-flex"
                          onClick={() => handleRemoveOrder(id)}
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
                    {subTotal}$
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
              onSubmitCreditCard={() => {
                console.log("first");
              }}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default cart;
