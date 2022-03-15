import React, { useEffect, useState } from "react";
import { Button, Layout, PaymentMethod, Loading } from "@components";
import styles from "@styles/pages/cart.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@redux/store";
import { deleteOrder } from "@redux/actions";
import api from "src/services/axios.config";
import Link from "next/link";
import { addOrder, Order } from "@redux/slices/order";
import { Modal } from "react-bootstrap";
import { IncAndDecButton } from "@components/common/IncAndDecButton";
import FormikControl from "@components/form-control/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { OPTION_DEFAULT } from "@components/form-control/Select";
import AuthRoute from "../src/services/auth.config";
import { REQUIRED_CONTENT } from "@components/constants";

const cart = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState<Order>();
  const [linkedAccs, setLinkedAccs] = useState<any>();
  const [activedAccId, setActivedAccId] = useState<string>();
  const [gameWidth, setGameWidth] = useState<number>();

  const initialValues = {
    accountId: "",
  };
  const schema = Yup.object().shape({
    accountId: Yup.string().required(`Account id ${REQUIRED_CONTENT}`),
  });

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

              setActivedAccId(res.data.accountId);
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
    setIsShowPaymentMethod(true);
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

    setIsLoading(true);
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

  const onChangeAcc = (accId: string) => {
    setActivedAccId(accId);

    if (accId === OPTION_DEFAULT || orderData?.accountId === accId) return;

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

  const cellClassName =
    "d-flex align-items-center px-lg-3 py-lg-2 py-1 px-2 h-100 w-100";

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
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={() => onClickBuy()}
      >
        {({}) => (
          <Form>
            <div className="container my-5">
              {isLoading && <Loading />}

              {!orderData?.id && !isLoading && (
                <div className="text-center h5 fst-italic">
                  You have no items in your cart.
                </div>
              )}

              {orderData?.id && (
                <>
                  {!linkedAccs?.length && (
                    <div className="d-flex justify-content-end mb-3">
                      <div>
                        <i className="bi bi-exclamation-triangle text-warning me-1"></i>
                      </div>
                      <div>
                        You must be linked to an account to make a payment.
                      </div>
                      <div className="ms-1">
                        <Link href="/profile/linked-accounts">
                          <a>Link now</a>
                        </Link>
                      </div>
                    </div>
                  )}

                  {linkedAccs?.length > 0 && (
                    <div className="mb-3 d-flex justify-content-end align-items-start">
                      <div
                        className={classNames(
                          "me-2 mt-err",
                          styles.customLabel
                        )}
                      >
                        Account id:
                      </div>
                      <FormikControl
                        name="accountId"
                        control="select"
                        containerClass={styles.selectAcc}
                        options={linkedAccs}
                        optionLabel="id"
                        optionValue="id"
                        defaultOption="Change receiving account"
                        defaultValue={orderData.accountId}
                        onChange={onChangeAcc}
                      />
                    </div>
                  )}

                  <div className="d-none d-md-flex row g-0 border border-bottom-0">
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

                  {orderData?.packages.map((pack, packIndex) => {
                    const { gameName } = orderData;
                    const { quantity, usdValue, discountPercentage, icon } =
                      pack;
                    const discount =
                      discountPercentage > 1
                        ? discountPercentage / 100
                        : discountPercentage;
                    const realPrice = usdValue * (1 - discount);
                    const packPrice = realPrice * quantity;

                    return (
                      <div
                        className={classNames(
                          "row g-0 border border-top-0",
                          !packIndex && styles.itemRow
                        )}
                        key={pack.id}
                      >
                        <div className="col-md-4 col-12">
                          <div
                            className={classNames(
                              cellClassName,
                              styles.cellItem,
                              styles.field1
                            )}
                            id="GameName"
                          >
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
                                title={gameName}
                              >
                                {gameName}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2 col-12">
                          <div
                            className={classNames(
                              cellClassName,
                              styles.cellItem,
                              styles.field2
                            )}
                          >
                            <div>${usdValue}</div>
                          </div>
                        </div>

                        <div className="col-md-3 col-12">
                          <div
                            className={classNames(
                              cellClassName,
                              styles.cellItem,
                              styles.field3
                            )}
                          >
                            <IncAndDecButton
                              value={quantity}
                              onChange={(newQuantity: number) =>
                                onUpdatePack(packIndex, newQuantity)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-3 col-12">
                          <div
                            className={classNames(
                              cellClassName,
                              styles.cellItem,
                              styles.field4
                            )}
                          >
                            <div className="d-flex justify-content-between w-100">
                              <div className="d-flex align-items-center">
                                <div className="h6 m-0 w-price">
                                  ${packPrice}
                                </div>
                                <div className="badge bg-info ms-2 font-size-12 w-badge">
                                  -{discount * 100}%
                                </div>
                              </div>
                              <div
                                className="cursor-pointer d-flex me-lg-2"
                                onClick={() => handleRemovePack(pack)}
                              >
                                <i className="bi bi-x-lg py-2 px-sm-3 px-2"></i>
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
                          ${orderData.subTotal}
                        </div>
                      </div>

                      <Button
                        className="mt-2 w-100 text-uppercase font-size-13"
                        type="submit"
                      >
                        Buy now
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>

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
    </Layout>
  );
};

export default AuthRoute(cart);
