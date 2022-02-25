import React, { useState } from "react";
import { Button, Layout, PaymentMethod, ModalInfo } from "@components";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import styles from "@styles/pages/cart.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@redux/store";
import { deleteOrder } from "@redux/actions";
import api from "src/services/axios.config";
import Link from "next/link";

function cart() {
  const dispatch = useAppDispatch();
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [gameNotLinked, setGameNotLinked] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const orderState = useSelector((state: RootState) => state.order.data);

  const handleRemoveOrder = (orderId: number) => {
    dispatch(deleteOrder(orderId));
  };

  const cellClassName = "d-flex align-items-center px-lg-3 p-2 h-100 w-100";
  let subTotal = 0;

  const onClickBuy = () => {
    api
      .get("/users/linked-accounts", {
        params: { gameId: "" },
      })
      .then((res) => {
        const listGameInOrder: any = [];
        const gameNotLinked: any = [];

        orderState.forEach((order) => {
          const isExist = listGameInOrder.some((game: any) => {
            return order.game.id === game.id;
          });

          if (!isExist) {
            const linkedWithGame = res.data.find(
              (item: any) => item.game.id === order.game.id
            );

            listGameInOrder.push(
              Object.assign({}, order.game, {
                linkedAccounts: linkedWithGame?.linkedAccounts || [],
              })
            );

            if (!linkedWithGame?.linkedAccounts) gameNotLinked.push(order.game);
          }
        });

        setGameNotLinked(gameNotLinked);

        if (gameNotLinked.length) {
          setIsOpenModal(true);
        } else {
          setIsShowPaymentMethod(true);
        }
      });
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
                        <div className="d-flex align-items-center">
                          <div className="h6 m-0 w-price">{packPrice}$</div>
                          <div className="badge bg-info ms-2 font-size-12 w-badge">
                            -{discount * 100}%
                          </div>
                        </div>
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

            <ModalInfo
              isOpen={isOpenModal}
              onHide={() => setIsOpenModal(false)}
            >
              <div>
                <i className="h1 bi bi-exclamation-triangle text-warning"></i>
                <div className="h6 mt-3">
                  The {gameNotLinked.length > 1 ? "games" : "game"} below have
                  not been linked to accounts:
                </div>

                <ul className={classNames("list-group", styles.listGame)}>
                  {gameNotLinked.map((game, id) => (
                    <li key={id} className="list-group-item font-size-14">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="me-2 rounded"
                          src={game.icon || "/avatar-game.jpg"}
                          width={20}
                          height={20}
                        />
                        {game.name}
                      </div>
                    </li>
                  ))}
                </ul>

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
