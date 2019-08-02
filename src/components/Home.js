import React from 'react';
import styled from 'styled-components';
import ListGrid from './ListGrid';
const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 800px;
	padding: 1rem 2rem;
`;

const Home = () => (
	<Container>
		<ListGrid />
	</Container>
);

export default Home;
