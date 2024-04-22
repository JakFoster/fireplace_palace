import Image from "next/image";
export default function CardsFounders({ url, header, text }) {
  return (
    <article className="about--card">
      <h3 className="about--header">{header}</h3>
      <p className="about--text">{text}</p>
      <Image
        className="about--image"
        src={url}
        alt="founders"
        width="260"
        height="180"
      />
    </article>
  );
}
