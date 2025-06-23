/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthorList from "@/component/AuthorList";
import { GET_AUTHORS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function AuthorPage() {
    const { data, loading, error } = useQuery(GET_AUTHORS);

    if (loading) return <p>Loading..</p>
    if (error) return <p>Error loading authors, Please try again..</p>

    return (
        <AuthorList authors={data.getAuthors} />
    )
}