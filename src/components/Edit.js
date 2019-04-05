import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import EditSidebar from './EditSidebar';

const Container = styled.div``;

const query = gql`
	query getList($id: ID!) {
		list(id: $id) {
			id
			title
			description
			places {
				id
				name
				address
				location {
					lat
					lng
				}
			}
		}
	}
`;

const Edit = ({ id }) => (
	<Query query={query} variables={{ id }}>
		{({ loading, error, data }) => {
			if (loading) return <div>Loading...</div>;
			return (
				<Container>
					<EditSidebar
						id={id}
						title={data.list.title}
						description={data.list.description}
						places={data.list.places}
					/>
				</Container>
			);
		}}
	</Query>
);

export default Edit;
