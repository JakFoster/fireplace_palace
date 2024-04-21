import CardsFounders from "./cardsfounders";
import Image from "next/image";
import "./founders.css";
const array = [
  {
    key: 1,
    url: "/founders-1.png",
    header: "Our craftmanship",
    text: "Mike and Mandy studied and honed their craft under the fireplace sensei Vik Von Blaze. Nothing gets delivered to a customer without their sign off.",
  },
  {
    key: 2,
    url: "/founders-2.png",
    header: "Our experience",
    text: "Numbers don't lie - we've been around for 20+ years and have a long list of happy customers who gladly recommend us.",
  },
  {
    key: 3,
    url: "/founders-3.png",
    header: "Our guarantee",
    text: "If you're not 100% satisfied we will fully refund your purchase. Also, we offer free repairs for the first 20 years of ownership. Find that somewhere else!",
  },
];

export default function Founders() {
  return (
    <main className="main">
      <section className="hero">
        <section className="consultation">
          <h1>Meet the artisans behind our masterpieces!</h1>
          <h1>Mike and Mandy</h1>
          <Image
            className="foundersImage"
            src="/founder-mike-and-mandy.png"
            alt="founders"
            width={280}
            height={280}
          />
        </section>
      </section>

      <section className="how-it-works">
        {array.map((object) => {
          return (
            <CardsFounders
              key={object.key}
              header={object.header}
              text={object.text}
              url={object.url}
            />
          );
        })}
      </section>
    </main>
  );
}
