"use client";
import Link from "next/link";
import Image from "next/image";
import Cards from "./cards";
import { useState } from "react";
import useSWR from "swr";
import "./homePage.css";

const array = [
  {
    key: 1,
    url: "/how-it-works-1.png",
    header: "Give us a call...",
    text: "Call us and book in a 'Design Consultation' on a date and time to suit you.",
  },
  {
    key: 2,
    url: "/how-it-works-2.png",
    header: "We come to you...",
    text: "We come to your home to do an assessment of the space and your style preference.",
  },
  {
    key: 3,
    url: "/how-it-works-3 (1).png",
    header: "We recommend...",
    text: "We design and provide you with a bespoke set of fireplace recommendations.",
  },
];

export default function Home() {
  const [location, setLocation] = useState(null);

  const { data: review, error } = useSWR(
    location
      ? `https://seal-app-336e8.ondigitalocean.app/reviews?country=${location}`
      : null,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    }
  );

  const handleClick = (event) => {
    setLocation(event.target.innerText);
  };

  return (
    <main className="main">
      <section className="main--hero">
        <Image
          className="main--fireplace"
          src="/hero-mobile.png"
          alt="fire"
          width="280"
          height="240"
        />
        <div className="main--discover">
          <h1 className="main--discover--text">
            Discover the perfect fireplace
          </h1>
          <Link href="/booking">
            <button className="main--discover--button">
              Book consultation
            </button>
          </Link>
        </div>
      </section>
      <div className="main--review">
        <h2 className="main--trusted">Trusted.</h2>
        <p className="main--review--text">
          We&apos;ve got thousands of happy customers all over the UK. Choose
          your country to see the latest review:
        </p>
        <div className="main--buttons">
          <button className="main--location" onClick={handleClick}>
            England
          </button>
          <button className="main--location" onClick={handleClick}>
            Wales
          </button>
          <button className="main--location" onClick={handleClick}>
            Scotland
          </button>
        </div>
      </div>

      {location && review ? (
        <>
          <blockquote className="main--quote">{review.text && review.text}</blockquote>
          <p className="main--author">
            {review.author ? review.author : "Scrooge McDuck"} -{" "}
            {review.location ? review.location : "Duckburg"}
          </p>
        </>
      ) : null}
      {location && error ? (
        <>
          <p className="main--quote">Error: failed to load quotes. Please try again later.</p>
          <p className="main--author">Scrooge McDuck - Duckburg</p>
        </>
      ) : null}

      <h2 className="main--cardsHeading">How it works.</h2>
      <section className="main--cardHolder">
        {array.map((object) => {
          return (
            <Cards
              key={object.key}
              url={object.url}
              header={object.header}
              text={object.text}
            />
          );
        })}
      </section>
    </main>
  );
}
