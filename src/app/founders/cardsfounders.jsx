import Image from "next/image";
export default function CardsFounders({ url, header, text }) {
  return (
    <article className="card">
      <h3>{header}</h3>
      <p className="card-info">{text}</p>
      <Image
        className="card-image"
        src={url}
        alt="founders"
        width="300"
        height="250"
      />
    </article>
  );
}
