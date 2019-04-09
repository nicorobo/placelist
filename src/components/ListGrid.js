import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
	query getLists {
		lists {
			id
			title
			description
		}
	}
`;

const ListGrid = ({ near }) => (
	<Query query={query}>
		{({ loading, error, data }) => {
			if (loading) return <div>Loading...</div>;
			return (
				<Container>
					{data.lists.map((l) => (
						<ListItem list={l} />
					))}
				</Container>
			);
		}}
	</Query>
);

const ListItem = ({ list }) => {
	return (
		<Item>
			<ItemTitle to={`/${list.id}`}>{list.title}</ItemTitle>
			<ItemDescription>{list.description}</ItemDescription>
		</Item>
	);
};
const Item = styled.div``;
const ItemTitle = styled(Link)`
	text-decoration: none;
	color: #226089;
	font-size: 1.2rem;
	font-weight: 600;
`;
const ItemDescription = styled.p`
	margin-top: 0.5rem;
	font-size: 0.9rem;
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 1rem;
`;

export default ListGrid;
