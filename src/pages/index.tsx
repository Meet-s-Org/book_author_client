// import Link from "next/link";
import AuthorPage from "./authors";
import BookPage from "./books";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome to the Book App
      </h1>
      <hr/>
      <div> <AuthorPage/> </div>
      <hr/>
      <div> <BookPage/> </div>
      {/* <nav>
        <ul>
          <li>
            <Link href="/authors">Go to Authors</Link>
          </li>
          <li>
            <Link href="/books">Go to Books</Link>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
