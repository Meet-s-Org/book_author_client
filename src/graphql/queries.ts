import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query GET_AUTHORS($limit: Int, $offset: Int, $searchByName: String) {
        getAuthors(limit: $limit, offset: $offset, searchByName: $searchByName) {
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
    query GET_BOOKS($limit: Int, $offset: Int, $searchByTitle: String) {
        getBooks(limit: $limit, offset: $offset, searchByTitle: $searchByTitle) {
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