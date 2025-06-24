import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query GET_AUTHORS($limit: Int, $offset: Int) {
        getAuthors(limit: $limit, offset: $offset) {
            totalCount
            data {
                id
                name
                biography
                bornDate
            }
        }
    }
`;


export const GET_BOOKS = gql`
    query GET_BOOKS($limit: Int, $offset: Int) {
        getBooks(limit: $limit, offset: $offset) {
            totalCount
            data {
                id
                title
                description
                published_date
                author_id
                author {
                    name
                }
            }
        }
    }
`;