import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import nest from 'recompose/nest';

const client = new ApolloClient({
	uri: 'https://ask-them-api.now.sh/graphql',
});

export default Component =>
	nest(
		props => <ApolloProvider client={client}>{props.children}</ApolloProvider>,
		Component,
	);
