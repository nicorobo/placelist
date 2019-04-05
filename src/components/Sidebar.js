import React from 'react';
import styled from 'styled-components';
import PlaceList from './PlaceList';

const Container = styled.div``;

// Move mutation logic to PlacesForm component?
const Sidebar = ({ id, title, description, places }) => (
	<Container>
		<h3>{title}</h3>
		<p>{description}</p>
		<PlaceList places={places} />
	</Container>
);

export default Sidebar;
