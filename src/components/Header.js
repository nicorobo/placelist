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
	color: #226089;
	font-weight: 600;
	span {
		font-weight: 300;
	}
`;
const Spacer = styled.div`
	flex-grow: 1;
`;

const Header = ({ user }) => (
	<Container>
		<Logo to="/">
			Place<span>list</span>
		</Logo>
		<Spacer />
		{user ? (
			<Badge user={user} />
		) : (
			<a href="http://localhost:4000/auth/facebook">
				<button>Login</button>
			</a>
		)}
	</Container>
);

const UserBadge = styled.div`
	display: flex;
	align-items: center;
`;

const AccountLink = styled(Link)`
	text-decoration: none;
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

const Badge = ({ user }) => (
	<UserBadge>
		<AccountLink to="/account">{user.name}</AccountLink>
		<Avatar>
			<img src={user.photo} />
		</Avatar>
	</UserBadge>
);

export default Header;
