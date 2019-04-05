import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Create from './components/Create';
import Edit from './components/Edit';

const Container = styled.div``;

const App = ({ loading, user }) => (
	<Container>
		<Header user={user} />
		<Router>
			<Home path="/" />
			<Account path="/account" user={user} />
			<Create path="/create" user={user} />
			<Edit path="/edit/:id" user={user} />
		</Router>
	</Container>
);

export default App;
