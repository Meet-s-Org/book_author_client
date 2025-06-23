type Author = {
  id: string;
  name: string;
  biography?: string;
  bornDate?: string;
};

export default function AuthorList({ authors }: { authors: Author[] }) {

  return (
    <div>
      <h1 className="text-1xl font-bold">Authors</h1>
      {/* <table>
        <tr>
          <th>Name</th>
          <th>Bio</th>
          <th>BornDate</th>
        </tr>
        {authors.map((author) => (
          <tr key={author.id}>
            <td> {author.name} </td>
            <td> {author.biography} </td>
            <td> {author.bornDate} </td>
          </tr>
        ))}
      </table> */}

      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Bio</th>
            <th className="border border-gray-300">BornDate</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td className="border border-gray-300"> {author.name} </td>
              <td className="border border-gray-300"> {author.biography} </td>
              <td className="border border-gray-300"> {author.bornDate} </td>
            </tr>
          ))}
        </tbody>
    </table>

      {/* <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <strong>{author.name}</strong>
            <p>{author.biography}</p>
            <p>{author.bornDate}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
