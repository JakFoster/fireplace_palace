"use client";
import React from "react";
import { useReducer } from "react";
import "./booking.css";
import { formReducer, initialState } from "./reducer";
import Image from "next/image";

export default function Booking() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "ON_USER_INPUT", payload: { [name]: value } });
  };

  const fetchData = async (postcode) => {
    console.log("🚀 ~ fetchData ~ postcode:", postcode);
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}/validate`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("🚀 ~ fetchData ~ data:", data);

      if (data.result) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const validateForm = async () => {
    const errors = {};
    const pcRegex =
      /^(GIR ?0AA)|((([A-Z]{1,2}[0-9]{1,2}|[A-Z]{1,2}[0-9][A-Z]) ?[0-9][A-Z]{2})|([A-Z]{1,2}[0-9]{1,3} ?[0-9][A-Z]{2})|([A-Z]{1,2}[0-9]{2} ?[0-9][A-Z]{2}))$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    if (!state.formData.name.trim()) {
      errors.name = "*Fill the form properly...*";
    }
    if (await fetchData(state.formData.postcode)) {
      errors.postcode = "Move to the UK mate";
    }
    if (!emailRegex.test(state.formData.email)) {
      errors.email = "*Need a valid email*";
    }
    if (!state.formData.house.trim()) {
      errors.house = "*You need a house if you want a Fireplace*";
    }
    if (!state.formData.city.trim()) {
      errors.city = "*You need a city if you have a house*";
    }
    if (!phoneRegex.test(state.formData.phoneNumber)) {
      errors.phoneNumber = "*Enter a valid phone number*";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOADING" });

    const data = await validateForm();

    if (Object.keys(data).length === 0) {
      dispatch({ type: "SUCCESS", payload: state.formData });
    } else {
      dispatch({ type: "FAIL", payload: data });
    }
  };

  return (
    <div className="booking-page">
      <div className="design-booking">
        <h2>Design Booking</h2>
      </div>
      {!state.success && (
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="personal-title">Personal information:</h3>
          <fieldset className="personal">
            <label className="data-type" htmlFor="name">
              Full Name
            </label>
            <input
              className="data-input"
              type="text"
              id="name"
              name="name"
              value={state.formData.name}
              onChange={handleChange}
            />
            {state.errors.name && (
              <p className="error-message">{state.errors.name}</p>
            )}

            <label className="data-type" htmlFor="postcode">
              Postcode
            </label>
            <input
              className="data-input"
              type="text"
              id="postcode"
              name="postcode"
              value={state.formData.postcode}
              onChange={handleChange}
            />
            {state.errors.postcode && (
              <p className="error-message">{state.errors.postcode}</p>
            )}

            <label className="data-type" htmlFor="house">
              House/Flat Number and Street Name
            </label>
            <input
              className="data-input"
              type="text"
              id="house"
              name="house"
              value={state.formData.house}
              onChange={handleChange}
            />
            {state.errors.house && (
              <p className="error-message">{state.errors.house}</p>
            )}

            <label className="data-type" htmlFor="city">
              City
            </label>
            <input
              className="data-input"
              type="text"
              id="city"
              name="city"
              value={state.formData.city}
              onChange={handleChange}
            />
            {state.errors.city && (
              <p className="error-message">{state.errors.city}</p>
            )}
          </fieldset>
          <h3 className="contact-title">Contact information:</h3>
          <fieldset className="contact">
            <label className="data-type" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="data-input"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={state.formData.phoneNumber}
              onChange={handleChange}
            />
            {state.errors.phoneNumber && (
              <p className="error-message">{state.errors.phoneNumber}</p>
            )}

            <label className="data-type" htmlFor="email">
              Email Address
            </label>
            <input
              className="data-input"
              type="email"
              id="email"
              name="email"
              value={state.formData.email}
              onChange={handleChange}
            />
            {state.errors.email && (
              <p className="error-message">{state.errors.email}</p>
            )}
          </fieldset>
          {!state.loading && (
            <button className="submit">Request Design Consultation</button>
          )}
          {state.loading && <div className="submit">Requesting...</div>}
        </form>
      )}
      {state.success && (
        <div className="success loading">
          <p className="submitted-text">
            Your data has been succesfully sold to third parties.{" "}
          </p>

          <Image src="/elmoMeme.jpeg" alt="elmo" width={300} height={300} />
        </div>
      )}
    </div>
  );
}
