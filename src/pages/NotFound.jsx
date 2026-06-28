import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <span className="not-found__star">✻</span>
      <h1>Page not found</h1>
      <p>Please check the URL or go back to the home page.</p>
      <Link to="/" className="btn btn--dark">
        Back to Home
      </Link>
    </section>
  );
}
