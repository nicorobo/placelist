import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { primaryColor, primaryText, secondaryText, highlightColor } from '../theme.js';

const PlaceList = ({ places, update, activePlace, setActivePlace, position, setPosition }) => {
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
					position={position}
					setPosition={setPosition}
					deletePlace={update && handleDelete}
				/>
			))}
		</Container>
	);
};

const PlaceItem = ({
	place,
	isActivePlace,
	setActivePlace,
	deletePlace,
	position,
	setPosition,
}) => {
	const { id, name, address, location } = place;
	const handleDelete = () => deletePlace(id);
	const onMouseEnter = () => setActivePlace(place);
	const onMouseLeave = () => setActivePlace(null);
	const onClick = () =>
		setPosition({
			zoom: 17,
			center: { lat: location.lat, lng: location.lng },
		});
	return (
		<Item isActivePlace={isActivePlace}>
			<MainSection
				isActivePlace={isActivePlace}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}>
				<ItemName>{name}</ItemName>
				<ItemAddress>{address}</ItemAddress>
			</MainSection>
			{deletePlace && (
				<DeleteButton onClick={handleDelete}>
					<i className="fas fa-trash" />
				</DeleteButton>
			)}
		</Item>
	);
};

const Item = styled.div`
	display: flex;
	margin-bottom: 0.8rem;
	cursor: pointer;
	color: ${(props) => (props.isActivePlace ? highlightColor : primaryText)};
	padding-left: 0.5rem;
	border-left: 3px solid ${(props) => (props.isActivePlace ? highlightColor : 'white')};
`;
const MainSection = styled.div`
	flex-grow: 1;
`;
const ItemName = styled.div`
	margin-bottom: 0.2rem;
	font-size: 0.9rem;
	font-weight: bold;
`;
const ItemAddress = styled.div`
	font-size: 0.8rem;
`;
const DeleteButton = styled.button`
	border: none;
	outline: none;
	font-size: 0.9rem;
	background: white;
	cursor: pointer;
	color: ${secondaryText};
	&:hover {
		color: ${lighten(0.2, primaryColor)};
	}
`;
const Container = styled.div``;

export default PlaceList;
