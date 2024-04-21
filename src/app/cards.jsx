import Image from "next/image";
export default function Cards({ url, header, text }) {
  return (
    <article className="main--card">
      <Image className="main--card--image" src={url} alt="" width="280" height="240" />
      <h3 className="main--card--header">{header}</h3>
      <p className="main--card--info">{text}</p>
    </article>
  );
}
