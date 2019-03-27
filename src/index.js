import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import App from './App';

const client = new ApolloClient({
	link: new HttpLink({
		uri: 'http://localhost:4000/graphql',
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
});

const query = gql`
	{
		me {
			name
			photo
			lists {
				title
				description
			}
		}
	}
`;

ReactDOM.render(
	<ApolloProvider client={client}>
		<Query query={query}>
			{({ loading, error, data }) => (
				<App loading={loading} user={data && data.me} />
			)}
		</Query>
	</ApolloProvider>,
	document.getElementById('root')
);
