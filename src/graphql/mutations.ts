import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation AddAuthor($input: AuthorInput!) {
    addAuthor(author: $input) {
      id
      name
      biography
      bornDate
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $input: AuthorInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      name
      biography
      bornDate
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($input: BookInput!) {
    addBook(book: $input) {
      id
      title
      description
      published_date
      author_id
      author {
          id
          name
          biography
          bornDate
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: BookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      description
      published_date
      author_id
      author {
          id
          name
          biography
          bornDate
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;
