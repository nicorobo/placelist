import React from 'react';
import styled from 'styled-components';
import PlaceList from './PlaceList';
import FavoriteButton from './FavoriteButton';

const Sidebar = ({
	id,
	user,
	title,
	description,
	places,
	createdBy,
	activePlace,
	setActivePlace,
	position,
	setPosition,
}) => (
	<Container>
		{user && user.id !== createdBy && <FavoriteButton id={id} user={user} />}
		<Title>{title}</Title>
		<Description>{description}</Description>
		<PlaceList
			places={places}
			activePlace={activePlace}
			setActivePlace={setActivePlace}
			position={position}
			setPosition={setPosition}
		/>
	</Container>
);
const Title = styled.h3`
	font-size: 1.5rem;
	flex-grow: 1;
	color: #333;
	margin-bottom: 0.8rem;
`;
const Description = styled.p`
	font-size: 0.9rem;
	flex-grow: 1;
	color: #333;
	margin-bottom: 1.5rem;
`;
const Container = styled.div`
	padding: 0.5rem 1rem 0.5rem 1rem;
	width: 300px;
`;

export default Sidebar;
