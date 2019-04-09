import React from 'react';
import styled from 'styled-components';
import PlaceList from './PlaceList';
import FavoriteButton from './FavoriteButton';

const Container = styled.div``;

const Sidebar = ({ id, user, title, description, places, createdBy }) => (
	<Container>
		{user && user.id !== createdBy && <FavoriteButton id={id} user={user} />}
		<h3>{title}</h3>
		<p>{description}</p>
		<PlaceList places={places} />
	</Container>
);

export default Sidebar;
