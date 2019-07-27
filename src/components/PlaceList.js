import React from 'react';
import styled from 'styled-components';

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
		<Item>
			<MainSection>
				<ItemName>{name}</ItemName>
				<ItemAddress>{address}</ItemAddress>
			</MainSection>
			{deletePlace && (
				<DeleteButton onClick={handleDelete}>
					<i class="fas fa-trash" />
				</DeleteButton>
			)}
		</Item>
	);
};

const Item = styled.div`
	display: flex;
	margin-bottom: 0.8rem;
`;
const MainSection = styled.div`
	flex-grow: 1;
`;
const ItemName = styled.div`
	margin-bottom: 0.2rem;
	font-size: 0.9rem;
	font-weight: bold;
	color: #333;
`;
const ItemAddress = styled.div`
	font-size: 0.8rem;
	color: ;
`;
const DeleteButton = styled.button`
	border: none;
	outline: none;
	font-size: 0.9rem;
	background: white;
	cursor: pointer;
	color: #bbb;
	&:hover {
		color: #f88;
	}
`;
const Container = styled.div``;

export default PlaceList;
