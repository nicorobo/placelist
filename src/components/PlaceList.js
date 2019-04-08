import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const PlaceList = ({ places, update }) => {
	const handleDelete = (id) => {
		update({ places: places.map((p) => p.id).filter((i) => i !== id) });
	};
	return (
		<Container>
			{places.map((p) => (
				<PlaceItem key={p.id} place={p} deletePlace={update && handleDelete} />
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
			{deletePlace && <button onClick={handleDelete}>Delete</button>}
		</div>
	);
};

export default PlaceList;
