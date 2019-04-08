import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
`;
const Logo = styled(Link)`
	font-size: 1.5rem;
	text-decoration: none;
	color: coral;
`;
const AccountLink = styled(Link)`
	text-decoration: none;
`;
const Spacer = styled.div`
	flex-grow: 1;
`;

const Header = ({ user }) => (
	<Container>
		<Logo to="/">Placelist</Logo>
		<Spacer />
		{user ? (
			<AccountLink to="/account">{user.name}</AccountLink>
		) : (
			<a href="http://localhost:4000/auth/facebook">
				<button>Login</button>
			</a>
		)}
	</Container>
);

export default Header;
