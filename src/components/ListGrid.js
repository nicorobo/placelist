import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { primaryColor, primaryText } from '../theme.js';

const query = gql`
	query getLists {
		lists {
			id
			title
			description
			places {
				id
			}
			createdBy {
				id
				name
			}
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
						<ListItem key={l.id} list={l} />
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
			<ItemCreator>
				Created by <span>{list.createdBy.name}</span>
			</ItemCreator>
			<ItemCount>{list.places.length} Places</ItemCount>
		</Item>
	);
};
const Item = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	border: 1px solid #e4e4e4;
	box-shadow: 3px 3px 5px 0px #e4e4e4;
	color: ${primaryText};
`;
const ItemTitle = styled(Link)`
	text-decoration: none;
	color: ${primaryColor};
	font-size: 1rem;
	font-weight: 600;
	opacity: 0.8;
	&:hover {
		opacity: 1;
	}
`;
const ItemDescription = styled.p`
	margin-top: 0.5rem;
	font-size: 0.9rem;
	flex-grow: 1;
`;
const ItemCount = styled.p`
	align-self: flex-end;
	margin-top: 0.2rem;
	font-size: 0.8rem;
	color: ${primaryColor};
	opacity: 0.8;
`;
const ItemCreator = styled.p`
	align-self: flex-end;
	margin-top: 0.5rem;
	font-size: 0.8rem;
	span {
		color: ${primaryColor};
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 1rem;
	@media (max-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
`;

export default ListGrid;
