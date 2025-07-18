import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://book-author-server.onrender.com",
  cache: new InMemoryCache(),
});

export default client;
