import React, { useRef, useState } from "react";
import { ProfileLayout } from "@components";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "src/components/form-control/FormikControl";
import { REQUIRED_CONTENT } from "src/components/constants";
import styles from "@styles/pages/profile.module.scss";

function PaymentManagement() {
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCreditCardDetail, setIsShowCreditCardDetail] = useState(false);
  const [isShowPaypalDetail, setIsShowPaypalDetail] = useState(false);

  const formRef = useRef(null);

  const cardNumberLimit = 16;
  const expirationCharLimit = 4;
  const cscCharLimit = 3;
  const initialValues = {
    cardNumber: "",
    expiration: "",
    csc: "",
  };

  const schema = Yup.object().shape({
    cardNumber: Yup.string().required(`card number ${REQUIRED_CONTENT}`),
    expiration: Yup.string().required(`card number ${REQUIRED_CONTENT}`),
    csc: Yup.string().required(),
  });

  const handleAddPaymentMethod = () => {
    const arrowEl = document.getElementsByClassName("effect-arrow")?.[0];

    if (arrowEl) {
      if (!isShowPaymentMethod) {
        arrowEl.classList.add("open");
      } else {
        arrowEl.classList.remove("open");
      }
    }

    setIsShowPaymentMethod(!isShowPaymentMethod);
  };

  const onChangeCheckbox = (isChoosePaypalCB, formik) => {
    setIsShowCreditCardDetail(!isChoosePaypalCB);
    setIsShowPaypalDetail(isChoosePaypalCB);
    formik?.resetForm();
  };

  const onChangeCardNumber = (e, formik) => {
    const currentValue = formRef.current.values.cardNumber;
    const cleanedData = currentValue.split("-").join("");
    const currentLength = cleanedData.length;

    if (e.which < 48 || e.which > 57 || currentLength >= cardNumberLimit) {
      e.preventDefault();
    } else if (currentLength % 4 === 0 && currentLength > 0) {
      formik?.setFieldValue("cardNumber", currentValue + "-");
    }
  };

  const onChangeExpiration = (e, formik) => {
    const currentValue = formRef.current.values.expiration;
    const cleanedData = currentValue.split("/").join("");
    const currentLength = cleanedData.length;

    if (e.which < 48 || e.which > 57 || currentLength >= expirationCharLimit) {
      e.preventDefault();
    } else if (currentLength % 2 === 0 && currentLength > 0) {
      formik?.setFieldValue("expiration", currentValue + "/");
    }
  };

  const onChangeCSC = (e) => {
    const currentLength = formRef.current.values.csc.length;

    if (e.which < 48 || e.which > 57 || currentLength >= cscCharLimit) {
      e.preventDefault();
    }
  };

  const onSubmit = () => {
    console.log("onSubmit");
  };

  const childrenEl = (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form id={styles.PaymentManagement}>
          <div>
            <h5 className="text-uppercase">Payment Management</h5>

            <div className="mt-3 text-muted-custom">
              View your payment activity and the current balance of your
              account. View our{" "}
              <span>
                <a href="/">Privacy Policy</a>
              </span>
              .
            </div>

            <br />
            <div className="h6 mt-2">YOUR PAYMENT METHODS</div>
            <hr />

            <div className="text-muted-custom">
              Add or manage payment methods associated with your account.
            </div>
          </div>

          <div className="mt-4">
            <div
              className="d-flex align-items-center text-info cursor-pointer"
              onClick={handleAddPaymentMethod}
            >
              <div className="font-size-14 ">ADD A PAYMENT METHOD</div>
              <Image
                src="/icons/arrow-down.svg"
                className="effect-arrow"
                width="40"
                height="7"
              />
            </div>
          </div>

          <div className={styles.paymentMethod}>
            {isShowPaymentMethod && (
              <>
                <div
                  className={classNames("mt-2 bg-gray rounded-3 p-3", {
                    "border border-info-custom": isShowCreditCardDetail,
                  })}
                >
                  <div
                    className={classNames("d-flex align-items-center", {
                      "cursor-pointer": !isShowCreditCardDetail,
                    })}
                    onClick={() => onChangeCheckbox(false, formik)}
                  >
                    <input
                      type="radio"
                      id="credit_card"
                      value="credit_card"
                      className="radio-lg me-4"
                      checked={isShowCreditCardDetail}
                      onChange={() => onChangeCheckbox(false, formik)}
                    />

                    <div className="px-3 border-gray rounded-3">
                      <i className="h3 m-0 bi bi-credit-card-fill"></i>
                    </div>
                    <span className="ms-4 h6 mb-0">Credit Card</span>
                  </div>

                  {isShowCreditCardDetail && (
                    <div className="my-4 px-5">
                      <div className="text-uppercase font-size-14">
                        Card Information
                      </div>

                      <div>
                        <FormikControl
                          classNames="mt-3"
                          type="text"
                          control="input"
                          formik={formik}
                          name="cardNumber"
                          placeholder="Card Number"
                          onKeyPress={(e) => onChangeCardNumber(e, formik)}
                        />

                        <div className="d-flex justify-content-between mt-3">
                          <div className="half-width">
                            <FormikControl
                              type="text"
                              control="input"
                              formik={formik}
                              name="expiration"
                              placeholder="Expiration"
                              onKeyPress={(e) => onChangeExpiration(e, formik)}
                            />
                          </div>

                          <div className="half-width">
                            <FormikControl
                              type="text"
                              control="input"
                              formik={formik}
                              name="csc"
                              placeholder="CSC"
                              onKeyPress={onChangeCSC}
                            />
                          </div>
                        </div>

                        <div className="form-item d-flex justify-content-end mt-3">
                          <Button
                            variant="info"
                            type="submit"
                            className="text-white"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={classNames("mt-3 bg-gray rounded-3 p-3", {
                    "border border-info-custom": isShowPaypalDetail,
                  })}
                >
                  <div
                    className={classNames("d-flex align-items-center", {
                      "cursor-pointer": !isShowPaypalDetail,
                    })}
                    onClick={() => onChangeCheckbox(true, formik)}
                  >
                    <input
                      type="radio"
                      id="paypal"
                      value="paypal"
                      className="radio-lg me-4"
                      checked={isShowPaypalDetail}
                      onChange={() => onChangeCheckbox(true, formik)}
                    />

                    <div className="d-flex align-items-center py-1 px-3 border-gray rounded-3">
                      <Image
                        src="/icons/paypal.png"
                        alt="paypal"
                        width="28"
                        height="28"
                      />
                    </div>
                    <span className="ms-4 h6 mb-0">Paypal</span>
                  </div>

                  {isShowPaypalDetail && (
                    <div className="my-4 px-5">
                      <div className="text-uppercase font-size-14">
                        Paypal Detail
                      </div>
                      <div className="text-light-custom mt-2">
                        You will be directed to PayPal to authorize your payment
                        method, then you will be returned to complete this
                        purchase.
                      </div>
                      <div className="d-flex justify-content-end mt-2">
                        {/* text-uppercase font-size-12 fw-bold */}
                        <Button variant="info" className="text-white">
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default PaymentManagement;
