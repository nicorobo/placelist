import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PlacesForm from './PlacesForm';
import PlaceList from './PlaceList';

const Container = styled.div``;

const updateListPlacesMutation = gql`
	mutation UpdateListPlaces($id: ID!, $input: ListInput) {
		updateList(id: $id, input: $input) {
			id
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

// Move mutation logic to PlacesForm component?
const EditSidebar = ({ id, title, description, places }) => (
	<Container>
		<h3>{title}</h3>
		<p>{description}</p>
		<Mutation mutation={updateListPlacesMutation}>
			{(updatePlaces) => {
				const handleUpdate = (places) => {
					updatePlaces({
						variables: {
							id,
							input: { places },
						},
					});
				};
				return (
					<>
						<PlacesForm
							updatePlaces={handleUpdate}
							places={places.map((place) => {
								return place ? place.id : null;
							})}
						/>

						<PlaceList places={places} updatePlaces={handleUpdate} />
					</>
				);
			}}
		</Mutation>
	</Container>
);

export default EditSidebar;
