import React from 'react';
import styled from 'styled-components';
import { Router, Link } from '@reach/router';

const Container = styled.div``;
const NavContainer = styled.nav``;
const App = ({ loading, user }) => (
	<Container>
		<Nav user={user} />
		<Router>
			<Home path="/" />
			<Account path="/account" />
		</Router>
	</Container>
);
const Nav = ({ user }) => (
	<NavContainer>
		{user ? (
			<Link to="/account">{user.name}</Link>
		) : (
			<a href="http://localhost:4000/auth/facebook">
				<button>Login</button>
			</a>
		)}
	</NavContainer>
);

const Home = () => <div>Home</div>;
const Account = () => <div>Account</div>;
export default App;
