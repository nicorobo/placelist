import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

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
	<a href="http://localhost:4000/auth/facebook">
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
	padding: 1rem 2rem 0.5rem 2rem;
`;
const Logo = styled(Link)`
	font-size: 1.5rem;
	text-decoration: none;
	color: #226089;
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
	color: #226089;
	border-radius: 5px;
	border: 1px solid #226089;
	cursor: pointer;
	font-size: 0.8rem;
	background: white;
	&:hover {
		background: #226089
		color: white;
	}
`;

const AccountLink = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
`;

const Name = styled.div`
	margin-right: 1rem;
	color: #333;
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
