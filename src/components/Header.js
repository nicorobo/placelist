import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.div``;

const Header = ({ user }) => (
	<Container>
		{user ? (
			<Link to="/account">{user.name}</Link>
		) : (
			<a href="http://localhost:4000/auth/facebook">
				<button>Login</button>
			</a>
		)}
	</Container>
);

export default Header;
