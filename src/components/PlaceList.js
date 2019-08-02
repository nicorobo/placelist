import React from 'react';
import styled from 'styled-components';

const PlaceList = ({ places, update, activePlace, setActivePlace }) => {
	const handleDelete = (id) => {
		update({ places: places.map((p) => p.id).filter((i) => i !== id) });
	};
	return (
		<Container>
			{places.map((p) => (
				<PlaceItem
					key={p.id}
					place={p}
					isActivePlace={activePlace && activePlace.id === p.id}
					setActivePlace={setActivePlace}
					deletePlace={update && handleDelete}
				/>
			))}
		</Container>
	);
};

const PlaceItem = ({ place, isActivePlace, setActivePlace, deletePlace }) => {
	const { id, name, address } = place;
	const handleDelete = () => deletePlace(id);
	const onMouseEnter = () => setActivePlace(place);
	const onMouseLeave = () => setActivePlace(null);
	return (
		<Item>
			<MainSection onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<ItemName isActivePlace={isActivePlace}>{name}</ItemName>
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
	cursor: default;
`;
const MainSection = styled.div`
	flex-grow: 1;
`;
const ItemName = styled.div`
	margin-bottom: 0.2rem;
	font-size: 0.9rem;
	font-weight: bold;
	color: ${(props) => (props.isActivePlace ? '#f88' : '#333')};
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
