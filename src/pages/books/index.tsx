/* eslint-disable @typescript-eslint/no-explicit-any */
import BookList from "@/component/BookList";
import { GET_BOOKS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function BookPage() {
    const { data, loading, error } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading..</p>
    if (error) return <p>Error loading books, Please try again..</p>

    return (
        <BookList books={data.getBooks} />
    )
}