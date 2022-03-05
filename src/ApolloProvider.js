import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from 'apollo-link-context';
import App from './App';

const httpLink = createUploadLink({
  uri: 'http://localhost:5000',
  headers: {
    "keep-alive": "true"
  }
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    lazy: true,
    reconnect: true,
  },
});
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);
// kind of a middleware to add authorization headers to API calls
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
