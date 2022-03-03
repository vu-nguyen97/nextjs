import React, { useEffect, useState } from "react";
import { Button, Layout, PaymentMethod, ModalInfo, Loading } from "@components";
import styles from "@styles/pages/cart.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@redux/store";
import { deleteOrder } from "@redux/actions";
import api from "src/services/axios.config";
import Link from "next/link";
import { addOrder, Order } from "@redux/slices/order";
import { Form, Modal } from "react-bootstrap";
import { IncAndDecButton } from "@components/common/IncAndDecButton";
import ReactTooltip from "react-tooltip";

function cart() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState<Order>();
  const [linkedAccs, setLinkedAccs] = useState<any>();
  const [activedAccId, setActivedAccId] = useState<string>();
  const [gameWidth, setGameWidth] = useState<number>();

  useEffect(() => {
    api.get("/store/current-order").then(
      (res: any) => {
        const gameWidth = document.getElementById("GameName")?.clientWidth;
        if (gameWidth) {
          setGameWidth(gameWidth - 80);
        }

        api
          .get("/users/linked-accounts", {
            params: { gameId: res.data.gameId },
          })
          .then(
            (resData) => {
              const linkedAccList = resData.data?.linkedAccounts?.filter(
                (acc: any) => acc.verified
              );

              if (res.data.accountId) {
                setActivedAccId(res.data.accountId);
              } else if (linkedAccList?.length) {
                setActivedAccId(linkedAccList[0].id);
              }

              setLinkedAccs(linkedAccList || []);
              setOrderData(res.data);
              setIsLoading(false);
            },
            () => setIsLoading(false)
          );
      },
      () => setIsLoading(false)
    );
  }, []);

  const handleRemovePack = (pack: any) => {
    setIsLoading(true);

    if (orderData?.packages.length === 1) {
      api.delete(`/store/orders/${orderData.id}`).then(
        (res: any) => {
          dispatch(deleteOrder());
          setOrderData(res.data);
          setIsLoading(false);
        },
        () => setIsLoading(false)
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
      (res: any) => {
        dispatch(addOrder(res.data));
        setOrderData(res.data);
        setIsLoading(false);
      },
      () => setIsLoading(false)
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
    const {
      cardNumber,
      expiration,
      csc,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
    } = data;

    setIsLoading(true);
    const cardNumParam = cardNumber.split("-").join("");
    let expirationParam = expiration.split("/").join("");
    expirationParam =
      expirationParam.slice(0, 2) + ":20" + expirationParam.slice(2);

    const card = cardNumParam + ":" + expirationParam + ":" + csc;

    const paramsData = {
      orderId: orderData?.id,
      billing: {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode,
        country,
        phoneNumber,
      },
      card,
    };

    api({
      method: "post",
      url: "/store/purchase",
      data: paramsData,
    }).then(
      (res: any) => {
        dispatch(deleteOrder());
        setIsShowPaymentMethod(false);
        setIsPaymentSuccess(true);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  const onUpdatePack = (updatedPackIndex: number, newQuantity: number) => {
    let isUpdate = true;
    let newPackages =
      orderData?.packages.map((pack, packId) => {
        if (packId !== updatedPackIndex) {
          return pack;
        }

        if (pack.quantity === newQuantity) {
          return (isUpdate = false);
        }

        return Object.assign({}, pack, { quantity: newQuantity });
      }) || [];

    if (!isUpdate) return;

    api({
      method: "put",
      url: `store/orders/${orderData?.id}`,
      data: {
        accountId: orderData?.accountId,
        packages: newPackages,
      },
    }).then(
      (res: any) => {
        dispatch(addOrder(res.data));
        setOrderData(res.data);
      },
      () => {}
    );
  };

  const onChangeAcc = (accId: string) => {
    setActivedAccId(accId);

    if (accId === chooseAccContent) return;

    setIsLoading(true);
    api({
      method: "put",
      url: `store/orders/${orderData?.id}`,
      data: {
        accountId: accId,
        packages: orderData?.packages,
      },
    }).then(
      (res: any) => {
        dispatch(addOrder(res.data));
        setOrderData(res.data);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  const chooseAccContent = "Change receiving account";
  const cellClassName = "d-flex align-items-center px-lg-3 p-2 h-100 w-100";
  let subTotal = 0;

  if (isPaymentSuccess) {
    return (
      <Layout>
        <div className="container my-5 text-center">
          <i className="h1 bi bi-check-circle-fill text-success"></i>

          <div className="h4 mt-3">Your payment was successfully!</div>
          <div className="mt-2">Thank you for your billing.</div>

          <Link href="/">
            <div>
              <Button size="sm" className="mt-3">
                Go to store
              </Button>
            </div>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container my-5">
        {isLoading && <Loading />}

        {linkedAccs?.length > 1 && (
          <div className="mb-3 d-flex justify-content-end">
            <Form.Select
              className={styles.selectAcc}
              onChange={(e) => onChangeAcc(e.target.value)}
            >
              <option>{chooseAccContent}</option>
              {linkedAccs.map((accInfo: any, id: number) => (
                <option key={id} value={accInfo.id}>
                  {accInfo.id}
                </option>
              ))}
            </Form.Select>
          </div>
        )}

        {!orderData?.id && !isLoading && (
          <div className="text-center h5 fst-italic">
            You have no items in your cart.
          </div>
        )}

        {orderData?.id && (
          <>
            <div className="row g-0 border">
              <div className="col-3">
                <div className={styles.cartHeader}>Game</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Package</div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>
                  <div className="d-flex align-items-center">
                    Account id
                    <div className="px-1 mb-1">
                      <i
                        className="bi bi-exclamation-circle font-size-13 text-primary"
                        data-tip="You can only select accounts that are already connected to the game."
                      />
                    </div>
                  </div>

                  <ReactTooltip
                    place="top"
                    type="info"
                    className="tooltip-width"
                  />
                </div>
              </div>
              <div className="col-2">
                <div className={styles.cartHeader}>Quantity</div>
              </div>
              <div className="col-3">
                <div className={styles.cartHeader}>Total</div>
              </div>
            </div>

            {orderData?.packages.map((pack, packIndex) => {
              const { accountId, gameName } = orderData;
              const { quantity, usdValue, discountPercentage, icon } = pack;
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
                    <div className={cellClassName} id="GameName">
                      <div className="d-flex align-items-center">
                        <img
                          src={icon || "/avatar-game.jpg"}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <div
                          className="h6 m-0 ms-2 text-truncate-2"
                          style={{ width: gameWidth }}
                        >
                          {gameName}
                        </div>
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
                    <div className={cellClassName}>
                      <IncAndDecButton
                        value={quantity}
                        onChange={(newQuantity: number) =>
                          onUpdatePack(packIndex, newQuantity)
                        }
                      />
                    </div>
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
                          <i className="bi bi-x-lg py-2 px-3"></i>
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

            <Modal
              size="lg"
              show={isShowPaymentMethod}
              onHide={() => setIsShowPaymentMethod(false)}
            >
              <Modal.Body>
                <PaymentMethod
                  accountId={activedAccId}
                  isOpen={isShowPaymentMethod}
                  onSubmitCreditCard={onSubmitCreditCard}
                />
              </Modal.Body>
            </Modal>

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
