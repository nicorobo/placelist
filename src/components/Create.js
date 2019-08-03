import React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ListForm from './ListForm';
import { primaryText } from '../theme.js';

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
	margin-top: 1.5rem;
	padding: 1rem 2rem;
`;

const PageTitle = styled.h2`
	font-size: 2rem;
	font-weight: bold;
	color: ${primaryText};
	text-align: center;
`;

export default Create;
