import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const PlaceList = ({ places, updatePlaces }) => {
	const handleDelete = (id) => {
		console.log('deleting place: ', id);
		updatePlaces(places.map((p) => p.id).filter((i) => i !== id));
	};
	return (
		<Container>
			{places.map((p) => (
				<PlaceItem key={p.id} place={p} deletePlace={handleDelete} />
			))}
		</Container>
	);
};

const PlaceItem = ({ place, deletePlace }) => {
	const { id, name, address } = place;
	const handleDelete = () => deletePlace(id);
	return (
		<div>
			<div>{name}</div>
			<div>{address}</div>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default PlaceList;
