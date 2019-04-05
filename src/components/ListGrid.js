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
						<List list={l} />
					))}
				</Container>
			);
		}}
	</Query>
);

const List = ({ list }) => {
	return (
		<div style={{ margin: '1rem' }}>
			<Link to={`/${list.id}`}>{list.title}</Link>
			<p>{list.description}</p>
		</div>
	);
};

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default ListGrid;
