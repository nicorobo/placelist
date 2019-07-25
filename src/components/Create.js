import React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ListForm from './ListForm';

const createListMutation = gql`
	mutation CreateList($input: ListInput) {
		createList(input: $input) {
			id
			title
			places {
				name
			}
		}
	}
`;

const Create = () => (
	<Container>
		<PageTitle>Create List</PageTitle>
		<Mutation mutation={createListMutation}>
			{(createList, { data }) => {
				if (data) navigate(`/edit/${data.createList.id}`);
				return <ListForm createList={createList} />;
			}}
		</Mutation>
	</Container>
);

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 800px;
	padding: 1rem 2rem;
`;

const PageTitle = styled.h2`
	font-size: 2rem;
	font-weight: bold;
	color: #333;
	text-align: center;
`;

export default Create;
