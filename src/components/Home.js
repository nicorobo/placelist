import React from 'react';
import styled from 'styled-components';
import ListGrid from './ListGrid';
const Container = styled.div`
	margin-top: 1rem;
	flex-grow: 1;
`;

const Home = () => (
	<Container>
		<ListGrid />
	</Container>
);

export default Home;
