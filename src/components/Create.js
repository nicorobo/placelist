import React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ListForm from './ListForm';

const Container = styled.div``;

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
		<Mutation mutation={createListMutation}>
			{(createList, { data }) => {
				if (data) navigate(`/edit/${data.createList.id}`);
				return <ListForm createList={createList} />;
			}}
		</Mutation>
	</Container>
);

export default Create;
