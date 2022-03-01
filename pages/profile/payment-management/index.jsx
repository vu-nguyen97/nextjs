import React, { useState } from "react";
import { ProfileLayout, PaymentMethod } from "@components";
import Image from "next/image";
import AuthRoute from "../../../src/services/auth.config";

function PaymentManagement() {
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);

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

  return (
    <ProfileLayout>
      <div>
        <h5 className="text-uppercase">Payment Management</h5>

        <div className="mt-3 text-muted-custom">
          View your payment activity and the current balance of your account.
          View our{" "}
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

        <PaymentMethod
          isOpen={isShowPaymentMethod}
          isShowBillingForm={false}
          borderColor="info"
        />
      </div>
    </ProfileLayout>
  );
}

export default AuthRoute(PaymentManagement);
