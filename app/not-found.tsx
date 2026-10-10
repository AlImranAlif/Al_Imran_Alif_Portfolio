import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="section-label">404 / NOT FOUND</p>
      <h1>This page isn’t in the notebook.</h1>
      <p>
        The link may have changed. You can return to the portfolio or browse the
        project case studies.
      </p>
      <Link className="button button-primary" href="/">
        Back to portfolio
      </Link>
    </section>
  );
}