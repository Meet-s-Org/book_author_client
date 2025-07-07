import { gql } from "@apollo/client";

const all_fragments = gql`
    fragment authorFields on Author {
        id
        name
        biography
        bornDate
    }

    fragment bookFields on Book {
        id
        title
        description
        published_date
        author_id
    }
`;

export const GET_AUTHORS = gql`
    query GET_AUTHORS($limit: Int, $offset: Int, $searchByName: String) {
        getAuthors(limit: $limit, offset: $offset, searchByName: $searchByName) {
            totalCount
            data {
                ...authorFields
                books {
                    ...bookFields
                }
            }
        }
    }
    ${all_fragments}
`;

export const GET_BOOKS = gql`
    query GET_BOOKS($limit: Int, $offset: Int, $searchByTitle: String) {
        getBooks(limit: $limit, offset: $offset, searchByTitle: $searchByTitle) {
            totalCount
            data {
                ...bookFields
                author {
                    ...authorFields
                }
            }
        }
    }
    ${all_fragments}
`;