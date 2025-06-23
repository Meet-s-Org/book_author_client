import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link href="/authors" style={{ marginRight: "1rem" }}>Authors</Link>
      <Link href="/books">Books</Link>
    </nav>
  );
}
