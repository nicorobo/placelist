import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

const Account = ({ user }) => {
	if (!user) return <div>Please log in to view account page.</div>;
	return (
		<Container>
			<PageTitle>Account</PageTitle>
			<Section>
				<SectionTitle>
					Your Lists <CreateLink to="/create">Create List</CreateLink>
				</SectionTitle>
				<Lists>
					{user.lists.length > 0 ? (
						user.lists.map((list) => (
							<ListLink key={list.id} to={`/edit/${list.id}`}>
								{list.title}
							</ListLink>
						))
					) : (
						<EmptyText>You haven't made any lists yet!</EmptyText>
					)}
				</Lists>
			</Section>
			<Section>
				<SectionTitle>Your Favorites</SectionTitle>
				<EmptyText>You haven't favorited any lists yet!</EmptyText>
			</Section>

			<a href="http://localhost:4000/auth/logout">
				<button>Logout</button>
			</a>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 800px;
	padding: 1rem 2rem;
`;
const PageTitle = styled.h2`
	font-size: 2rem;
	font-weight: bold;
	color: #333;
	text-align: center;
`;
const Section = styled.div`
	margin: 1rem 0;
`;
const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.2rem;
	font-weight: lighter;
	margin-bottom: 0.5rem;
`;
const CreateLink = styled(Link)`
	font-size: 0.9rem;
	text-decoration: none;
	margin-left: auto;
	color: green;
	&:hover {
		color: ${darken(0.1, 'green')};
	}
`;
const ListLink = styled(Link)`
	text-decoration: none;
	margin-bottom: 0.5rem;
	color: #226089;
	&:hover {
		color: ${lighten(0.2, '#226089')};
	}
`;
const Lists = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
`;
const EmptyText = styled.div`
	text-align: center;
	font-size: 0.9rem;
	padding: 1rem;
	color: #888;
`;

export default Account;
