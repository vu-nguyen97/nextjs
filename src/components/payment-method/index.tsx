import React, { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "src/components/form-control/FormikControl";
import { REQUIRED_CONTENT } from "src/components/constants";
import { BillingForm } from "@components/BillingForm";
import { Form as RForm } from "react-bootstrap";
import Link from "next/link";

interface PaymentMethodProps {
  isOpen?: boolean;
  submitCardBtn?: string;
  isShowSaveCheckbox?: boolean;
  borderColor?: string;
  onSubmitCreditCard?: any;
  isSbmitOutside?: boolean;
  isShowBillingForm?: boolean;
  accountId?: string;
}

export const PaymentMethod = ({
  isOpen = false,
  onSubmitCreditCard,
  submitCardBtn = "Buy",
  isShowSaveCheckbox = false,
  borderColor = "primary",
  isSbmitOutside = true,
  isShowBillingForm = true,
  accountId = "",
}: PaymentMethodProps) => {
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
    isAcceptAcc: false,
  };

  const schema = Yup.object().shape({
    cardNumber: Yup.string().required(`card number ${REQUIRED_CONTENT}`),
    expiration: Yup.string().required(),
    csc: Yup.string().required(),
    firstName: Yup.string().required(`First number ${REQUIRED_CONTENT}`),
    lastName: Yup.string().required(`Last number ${REQUIRED_CONTENT}`),
    streetAddress: Yup.string().required(`street address ${REQUIRED_CONTENT}`),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    postalCode: Yup.number()
      .typeError("Must be a number")
      .required(`postal number ${REQUIRED_CONTENT}`),
    phoneNumber: Yup.number()
      .typeError("Must be a number")
      .test(
        "len",
        "Must be less than 15 characters",
        (val) => String(val).length < 15
      )
      .required(`phone number ${REQUIRED_CONTENT}`),
    isAcceptAcc: Yup.boolean().oneOf([true]),
  });

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
              {isShowBillingForm && <BillingForm />}

              <div className="mt-3">
                <div className="font-size-14">PAYMENT METHOD</div>
              </div>

              <div>
                <div className="mt-3 bg-gray rounded-3 p-3">
                  <div className="d-flex align-items-center">
                    <div className="px-3 border-gray rounded-3">
                      <i className="h3 m-0 bi bi-credit-card-fill"></i>
                    </div>
                    <span className="ms-3 h6 mb-0">Credit Card</span>
                  </div>

                  <div className="mt-2 mb-sm-2 px-lg-5 px-sm-3">
                    <div className="text-muted-custom">
                      Your credit card details are securely SSL connected for
                      payment processing. We DO NOT store your credit card
                      information in our servers.
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

                      <div className="d-flex flex-wrap justify-content-between">
                        <div className="half-width mt-3">
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

                        <div className="half-width mt-3">
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
                </div>

                {accountId && (
                  <div className="mt-2">
                    <div className="font-size-14 d-flex">
                      <RForm.Group controlId="isAcceptAcc">
                        <RForm.Check
                          id="acceptAccCheckbox"
                          type="checkbox"
                          checked={formik.values.isAcceptAcc}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "isAcceptAcc",
                              e.target.checked
                            );
                          }}
                          isInvalid={
                            formik.touched.isAcceptAcc &&
                            !!formik.errors.isAcceptAcc
                          }
                        />
                      </RForm.Group>
                      <label
                        htmlFor="acceptAccCheckbox"
                        className={classNames("ms-2", {
                          error:
                            formik.touched.isAcceptAcc &&
                            !!formik.errors.isAcceptAcc,
                        })}
                      >
                        I accept payment for account id{" "}
                        <Link href="/profile/linked-accounts">
                          <span className="text-primary cursor-pointer">
                            {accountId}
                          </span>
                        </Link>
                      </label>
                    </div>
                  </div>
                )}

                {isSbmitOutside && (
                  <div className="row mt-2">
                    <div className="col-lg-5"></div>

                    <Button
                      variant={borderColor}
                      type="submit"
                      className="col-lg-2 col-12 text-white mt-3"
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
