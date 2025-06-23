import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query GetAuthors {
        getAuthors {
            id
            name
            biography
            bornDate
        }
    }
`;


export const GET_BOOKS = gql`
    query GET_BOOKS {
        getBooks {
            id
            title
            description
            published_date
            author_id
        }
    }
`;