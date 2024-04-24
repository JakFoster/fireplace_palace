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
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}/validate`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    if (!state.formData.name.trim()) {
      errors.name = "You must enter a name";
    }
    if (await fetchData(state.formData.postcode)) {
      errors.postcode = "Invalid UK postcode";
    }
    if (!emailRegex.test(state.formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!state.formData.house.trim()) {
      errors.house = "Invalid address";
    }
    if (!state.formData.city.trim()) {
      errors.city = "Invalid city";
    }
    if (!phoneRegex.test(state.formData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
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
    <main className="mainBooking">
      {!state.success && (
        <>
          <h2 className="mainBooking--title">Request A Design Consultation</h2>
          <p className="mainBooking--description">
            Fill in and submit your details below. We&apos;ll be in touch as
            soon as we can to book your in-person consultation with one of our
            fantastic designers!
          </p>
          <form className="mainBooking--form" onSubmit={handleSubmit}>
            <h3 className="mainBooking--personal">Personal information:</h3>
            <fieldset className="mainBooking--fields">
              <label className="mainBooking--type" htmlFor="name">
                *Full Name
              </label>
              {state.errors.name && (
                <p className="mainBooking--error">{state.errors.name}</p>
              )}
              <input
                className="mainBooking--input"
                type="text"
                id="name"
                name="name"
                value={state.formData.name}
                onChange={handleChange}
              />

              <label className="mainBooking--type" htmlFor="postcode">
                *Postcode
              </label>
              {state.errors.postcode && (
                <p className="mainBooking--error">{state.errors.postcode}</p>
              )}
              <input
                className="mainBooking--input"
                type="text"
                id="postcode"
                name="postcode"
                value={state.formData.postcode}
                onChange={handleChange}
              />

              <label className="mainBooking--type" htmlFor="house">
                *Address
              </label>
              {state.errors.house && (
                <p className="mainBooking--error">{state.errors.house}</p>
              )}
              <input
                className="mainBooking--input"
                type="text"
                id="house"
                name="house"
                value={state.formData.house}
                onChange={handleChange}
              />

              <label className="mainBooking--type" htmlFor="city">
                *City
              </label>
              {state.errors.city && (
                <p className="mainBooking--error">{state.errors.city}</p>
              )}
              <input
                className="mainBooking--input"
                type="text"
                id="city"
                name="city"
                value={state.formData.city}
                onChange={handleChange}
              />
            </fieldset>
            <h3 className="mainBooking--contact">Contact information:</h3>
            <fieldset className="mainBooking--fields">
              <label className="mainBooking--type" htmlFor="phoneNumber">
                *Phone number
              </label>
              {state.errors.phoneNumber && (
                <p className="mainBooking--error">{state.errors.phoneNumber}</p>
              )}
              <input
                className="mainBooking--input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={state.formData.phoneNumber}
                onChange={handleChange}
              />

              <label className="mainBooking--type" htmlFor="email">
                *Email Address
              </label>
              {state.errors.email && (
                <p className="mainBooking--error">{state.errors.email}</p>
              )}
              <input
                className="mainBooking--input"
                type="email"
                id="email"
                name="email"
                value={state.formData.email}
                onChange={handleChange}
              />
            </fieldset>
            {!state.loading && (
              <button className="mainBooking--submit">
                Request Design Consultation
              </button>
            )}
            {state.loading && (
              <div className="mainBooking--submit">Requesting...</div>
            )}
          </form>
        </>
      )}
      {state.success && (
        <p className="mainBooking--success">
          Thank you for your interest in our services! We will be in touch within the next 2-3 working days to book a meeting!
        </p>
      )}
    </main>
  );
}
