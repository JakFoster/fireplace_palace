"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./header.css";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <header className="header">
      {!toggle && (
        <>
          <a className="header--link" href="">
            <p>🔥 Fireplace Palace</p>
          </a>
          <button className="header--button" onClick={handleClick}>
            ≡
          </button>
        </>
      )}
      {toggle && (
        <>
          <div className="header--menu">
            <Link href="/" className="header--menu--link">
              Home
            </Link>
            <Link href="/founders" className="header--menu--link">
              Founders
            </Link>
            <Link href="/booking" className="header--menu--link">
              Booking
            </Link>
          </div>
          <button className="header--button" onClick={handleClick}>
            X
          </button>
        </>
      )}
    </header>
  );
}
