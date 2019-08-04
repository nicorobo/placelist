import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { primaryColor, textOnPrimaryColor } from '../theme.js';

const Header = ({ user }) => (
	<Container>
		<Logo to="/">
			Place<span>list</span>
		</Logo>
		<Spacer />
		{user ? <Badge user={user} /> : <Login />}
	</Container>
);

const Login = () => (
	<a href="https://placelist-server.herokuapp.com/auth/facebook">
		<LoginButton>Login</LoginButton>
	</a>
);

const Badge = ({ user }) => (
	<AccountLink to="/account">
		<Name>{user.name}</Name>
		<Avatar>
			<img src={user.photo} alt="User Avatar" />
		</Avatar>
	</AccountLink>
);

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 2rem;
	background: ${primaryColor};
`;
const Logo = styled(Link)`
	font-size: 1.5rem;
	text-decoration: none;
	color: ${textOnPrimaryColor};
	font-weight: 600;
	span {
		font-weight: 300;
	}
`;
const Spacer = styled.div`
	flex-grow: 1;
`;
const LoginButton = styled.button`
	padding: 0.5rem 1rem;
	outline: none;
	color: ${textOnPrimaryColor};
	border-radius: 5px;
	border: 1px solid ${textOnPrimaryColor};
	cursor: pointer;
	font-size: 0.8rem;
	background: ${primaryColor};
	&:hover {
		background: ${textOnPrimaryColor}
		color: ${primaryColor};
	}
`;

const AccountLink = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	opacity: 0.9;
	&:hover {
		opacity: 1;
	}
`;

const Name = styled.div`
	margin-right: 1rem;
	color: ${textOnPrimaryColor};
	font-size: 0.9rem;
`;

const Avatar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
	overflow: hidden;
	border-radius: 50%;
	img {
		width: 100%;
	}
`;

export default Header;
