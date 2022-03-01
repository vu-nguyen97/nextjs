import React from "react";
import FormikControl from "src/components/form-control/FormikControl";
import { getData } from "country-list";

export const BillingForm = () => {
  return (
    <div className="mt-3">
      <div className="h4 text-center text-uppercase">Payment</div>
      <div className="font-size-14 text-uppercase">Billing detail</div>

      <div className="bg-gray p-3 mt-3 rounded-3 ">
        <div className="d-flex justify-content-between">
          <FormikControl
            type="text"
            control="input"
            name="firstName"
            placeholder="First Name"
            classNames="half-width"
          />
          <FormikControl
            type="text"
            control="input"
            name="lastName"
            placeholder="Last Name"
            classNames="half-width"
          />
        </div>

        <div className="mt-3">
          <FormikControl
            type="text"
            control="input"
            name="streetAddress"
            placeholder="Street Address"
            classNames="half-width"
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <FormikControl
            type="text"
            control="input"
            name="city"
            placeholder="City"
            classNames="half-width"
          />
          <FormikControl
            type="text"
            control="input"
            name="state"
            placeholder="State"
            classNames="half-width"
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <FormikControl
            type="text"
            control="input"
            name="postalCode"
            placeholder="Postal code"
            classNames="half-width"
          />
          <FormikControl
            options={getData()}
            optionKey="name"
            optionValue="code"
            control="select"
            name="country"
            placeholder="Country"
            containerClass="half-width"
            // defaultOption="Select a country"
            defaultValue="US"
          />
        </div>

        <div className="my-3">
          <FormikControl
            type="text"
            control="input"
            name="phoneNumber"
            placeholder="Phone number"
            classNames="half-width"
          />
        </div>
      </div>
    </div>
  );
};
