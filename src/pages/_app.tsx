import "../styles/globals.css"; 
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
// import Navbar from "../component/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
        {/* <Navbar/> */}
        <Component {...pageProps} />
    </ApolloProvider>
  );
}
