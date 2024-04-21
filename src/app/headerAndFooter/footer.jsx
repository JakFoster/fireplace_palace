// Code: Footer component
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer--left">
        <p className="footer--text">Find us on:</p>
        <p className="footer--text">Facebook</p>
        <p className="footer--text">Instagram</p>
        <p className="footer--text">Tiktok</p>
      </div>
      <small className="footer--right">
        <p className="footer--text">Fireplace Palace</p>
        <a>
          <p className="footer--text">info@fireplace.co.uk</p>
        </a>
      </small>
    </footer>
  );
}
