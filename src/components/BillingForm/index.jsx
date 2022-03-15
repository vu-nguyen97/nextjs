import React from "react";
import FormikControl from "src/components/form-control/FormikControl";
import { Country, State } from "country-state-city";
import { useFormikContext } from "formik";

export const BillingForm = () => {
  const { values } = useFormikContext();
  const USCode = "US";

  return (
    <div className="mt-3">
      <div className="h4 text-center text-uppercase">Payment</div>
      <div className="font-size-14 text-uppercase">Billing detail</div>

      <div className="bg-gray mt-2 p-3 rounded-3 ">
        <div className="d-flex flex-wrap justify-content-between">
          <FormikControl
            type="text"
            control="input"
            name="firstName"
            placeholder="First Name"
            classNames="half-width mt-3"
          />
          <FormikControl
            type="text"
            control="input"
            name="lastName"
            placeholder="Last Name"
            classNames="half-width mt-3"
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

        <div className="d-flex flex-wrap justify-content-between">
          <FormikControl
            options={Country.getAllCountries()}
            optionLabel="name"
            optionValue="isoCode"
            control="select"
            name="country"
            placeholder="Country"
            containerClass="half-width mt-3"
            defaultValue={USCode}
          />
          {values?.country === USCode ? (
            <FormikControl
              options={State.getStatesOfCountry(USCode)}
              optionLabel="name"
              optionValue="isoCode"
              control="select"
              name="state"
              containerClass="half-width mt-3"
              defaultOption="Select a state"
            />
          ) : (
            <FormikControl
              type="text"
              control="input"
              name="state"
              placeholder="State"
              classNames="half-width mt-3"
            />
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-between">
          <FormikControl
            type="text"
            control="input"
            name="city"
            placeholder="City"
            classNames="half-width mt-3"
          />
          <FormikControl
            type="text"
            control="input"
            name="postalCode"
            placeholder="Postal code"
            classNames="half-width mt-3"
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
