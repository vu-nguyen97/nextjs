import React, { useState } from "react";
import { ProfileLayout } from "@components";
import Image from "next/image";

function PaymentManagement() {
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCreditCardDetail, setIsShowCreditCardDetail] = useState(false);
  const [isShowPaypalDetail, setIsShowPaypalDetail] = useState(false);

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

  const onChangeCheckbox = (isChoosePaypalCB) => {
    setIsShowCreditCardDetail(!isChoosePaypalCB);
    setIsShowPaypalDetail(isChoosePaypalCB);
  };

  const childrenEl = (
    <div>
      <h5 className="text-uppercase">Payment Management</h5>

      <div className="mt-3 text-muted">
        View your payment activity and the current balance of your account. View
        our{" "}
        <span>
          <a href="/">Privacy Policy</a>
        </span>
        .
      </div>

      <br />
      <div className="h6 mt-2">YOUR PAYMENT METHODS</div>
      <hr />

      <div className="text-muted">
        Add or manage payment methods associated with your account.
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

      {isShowPaymentMethod && (
        <div>
          <div className="d-flex align-items-center mt-2 bg-gray rounded-3 p-3 cursor-pointer">
            <input
              type="radio"
              id="credit_card"
              value="credit_card"
              className="radio-lg me-3"
              checked={isShowCreditCardDetail}
              onChange={() => onChangeCheckbox(false)}
            />

            <div className="px-3 border-gray rounded-3">
              <i className="h3 m-0 bi bi-credit-card-fill"></i>
            </div>
            <span className="ms-3">Credit Card</span>
          </div>

          <div className="d-flex align-items-center mt-3 bg-gray rounded-3 p-3 cursor-pointer">
            <input
              type="radio"
              id="paypal"
              value="paypal"
              className="radio-lg me-3"
              checked={isShowPaypalDetail}
              onChange={() => onChangeCheckbox(true)}
            />

            <div className="d-flex align-items-center py-1 px-3 border-gray rounded-3">
              <Image
                src="/icons/paypal.png"
                alt="paypal"
                width="28"
                height="28"
              />
            </div>
            <span className="ms-3">Paypal</span>
          </div>
        </div>
      )}
    </div>
  );

  return <ProfileLayout children={childrenEl} />;
}

export default PaymentManagement;
