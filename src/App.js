import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Create from './components/Create';
import List from './components/List';

const Container = styled.div`
	font-family: Avenir;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #fdfdfd;
`;

const StyledRouter = styled(Router)`
	display: flex;
	justify-content: center;
	flex-grow: 1;
`;

const App = ({ loading, user }) => (
	<Container>
		<Header user={user} />
		<StyledRouter primary="false">
			<Home path="/" />
			<Account path="/account" user={user} />
			<Create path="/create" user={user} />
			<List path="/edit/:id" user={user} isOwner={true} />
			<List path="/:id" user={user} isOwner={false} />
		</StyledRouter>
	</Container>
);

export default App;
