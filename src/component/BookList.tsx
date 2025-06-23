type Book = {
  id: string;
  title: string;
  description?: string;
  published_date?: string;
};

export default function BookList({ books: books }: { books: Book[] }) {

  return (
    <div>
      <h1 className="text-1xl font-bold">Books</h1>
      
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">Title</th>
            <th className="border border-gray-300">Description</th>
            <th className="border border-gray-300">Published Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border border-gray-300"> {book.title} </td>
              <td className="border border-gray-300"> {book.description} </td>
              <td className="border border-gray-300"> {book.published_date} </td>
            </tr>
          ))}
        </tbody>
    </table>

      {/* <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong>
            <p>{book.description}</p>
            <p>{book.published_date}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
