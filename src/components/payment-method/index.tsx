import React, { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "src/components/form-control/FormikControl";
import { REQUIRED_CONTENT } from "src/components/constants";
import { BillingForm } from "@components/BillingForm";

interface PaymentMethodProps {
  isOpen?: boolean;
  submitCardBtn?: string;
  isShowSaveCheckbox?: boolean;
  borderColor?: string;
  onSubmitCreditCard?: any;
  isSbmitOutside?: boolean;
}

export const PaymentMethod = ({
  isOpen = false,
  onSubmitCreditCard,
  submitCardBtn = "Save",
  isShowSaveCheckbox = false,
  borderColor = "primary",
  isSbmitOutside = false,
}: PaymentMethodProps) => {
  const [isShowCreditCardDetail, setIsShowCreditCardDetail] = useState(false);
  const [isShowPaypalDetail, setIsShowPaypalDetail] = useState(false);

  const formRef = useRef<any>(null);

  const cardNumberLimit = 16;
  const expirationCharLimit = 4;
  const cscCharLimit = 3;
  const initialValues = {
    cardNumber: "",
    expiration: "",
    csc: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  };

  const schema = Yup.object().shape({
    cardNumber: Yup.string().required(`card number ${REQUIRED_CONTENT}`),
    expiration: Yup.string().required(`card number ${REQUIRED_CONTENT}`),
    csc: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    streetAddress: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    postalCode: Yup.string().required(),
    phoneNumber: Yup.string().required(),
  });

  const onChangeCheckbox = (isChoosePaypalCB: boolean, formik: any) => {
    setIsShowCreditCardDetail(!isChoosePaypalCB);
    setIsShowPaypalDetail(isChoosePaypalCB);
  };

  const onChangeCardNumber = (e: any, formik: any) => {
    const currentValue = formRef.current.values.cardNumber;
    const cleanedData = currentValue.split("-").join("");
    const currentLength = cleanedData.length;

    if (e.which < 48 || e.which > 57 || currentLength >= cardNumberLimit) {
      e.preventDefault();
    } else if (currentLength % 4 === 0 && currentLength > 0) {
      formik?.setFieldValue("cardNumber", currentValue + "-");
    }
  };

  const onChangeExpiration = (e: any, formik: any) => {
    const currentValue = formRef.current.values.expiration;
    const cleanedData = currentValue.split("/").join("");
    const currentLength = cleanedData.length;

    if (e.which < 48 || e.which > 57 || currentLength >= expirationCharLimit) {
      e.preventDefault();
    } else if (currentLength % 2 === 0 && currentLength > 0) {
      formik?.setFieldValue("expiration", currentValue + "/");
    }
  };

  const onChangeCSC = (e: any) => {
    const currentLength = formRef.current.values.csc.length;

    if (e.which < 48 || e.which > 57 || currentLength >= cscCharLimit) {
      e.preventDefault();
    }
  };

  const onSubmit = (values: any) => {
    onSubmitCreditCard(values);
  };

  return (
    <>
      {isOpen && (
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => onSubmit(values)}
        >
          {(formik) => (
            <Form>
              <BillingForm />

              <div className="mt-4">
                <div className="font-size-14">CHOOSE A PAYMENT METHOD</div>
              </div>

              <div>
                <div
                  className={classNames("mt-2 bg-gray rounded-3 p-3", {
                    "border border-info-custom":
                      isShowCreditCardDetail && borderColor === "info",
                    [`border border-${borderColor}`]:
                      isShowCreditCardDetail && borderColor !== "info",
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
                        Card detail
                      </div>

                      <div>
                        <FormikControl
                          classNames="mt-3"
                          type="text"
                          control="input"
                          name="cardNumber"
                          placeholder="Card Number"
                          onKeyPress={(e: any) => onChangeCardNumber(e, formik)}
                        />

                        <div className="d-flex justify-content-between mt-3">
                          <div className="half-width">
                            <FormikControl
                              type="text"
                              control="input"
                              name="expiration"
                              placeholder="Expiration"
                              onKeyPress={(e: any) =>
                                onChangeExpiration(e, formik)
                              }
                            />
                          </div>

                          <div className="half-width">
                            <FormikControl
                              type="text"
                              control="input"
                              name="csc"
                              placeholder="CSC"
                              onKeyPress={onChangeCSC}
                            />
                          </div>
                        </div>

                        {isShowSaveCheckbox && (
                          <div className="d-flex flex-column mt-3 font-size-14">
                            Saved credit cards are authorized for future
                            purchases.
                            <div className="d-flex align-items-center mt-2">
                              <input
                                className="form-check-input size-md me-2"
                                type="checkbox"
                                id="saveCard"
                              />
                              <label htmlFor="saveCard">
                                Do not save my credit card.
                              </label>
                            </div>
                          </div>
                        )}

                        {!isSbmitOutside && (
                          <div className="form-item d-flex justify-content-end mt-3">
                            <Button
                              variant={borderColor}
                              type="submit"
                              className="text-white"
                            >
                              {submitCardBtn}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={classNames("mt-3 bg-gray rounded-3 p-3", {
                    "border border-info-custom":
                      isShowPaypalDetail && borderColor === "info",
                    [`border border-${borderColor}`]:
                      isShowPaypalDetail && borderColor !== "info",
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
                        <Button variant={borderColor} className="text-white">
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {isSbmitOutside && (
                  <div className="row">
                    <div className="col-lg-4"></div>

                    <Button
                      variant={borderColor}
                      type="submit"
                      className="col-lg-4 col-12 text-white mt-3"
                    >
                      {submitCardBtn}
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
