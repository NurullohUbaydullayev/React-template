import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as CountProvider } from "./Context/cart";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://restaurants-nurulloh.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    token: JSON.parse(window.localStorage.getItem("auth_token")) || "",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </CountProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
