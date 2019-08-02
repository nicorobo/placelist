import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { darken, lighten } from 'polished';

const deleteListMutation = gql`
	mutation DeleteList($id: ID!) {
		deleteList(id: $id) {
			id
		}
	}
`;

const Account = ({ user }) => {
	if (!user) return <div>Please log in to view account page.</div>;
	return (
		<Container>
			<PageTitle>Account</PageTitle>
			<Section>
				<SectionTitle>
					Your Lists <CreateLink to="/create">Create List</CreateLink>
				</SectionTitle>
				<Mutation mutation={deleteListMutation}>
					{(deleteList, res) => {
						const onDelete = (id) => deleteList({ variables: { id } });
						return (
							<Lists>
								{user.lists.length > 0 ? (
									user.lists.map((list) => {
										if (
											res.data &&
											res.data.deleteList &&
											res.data.deleteList.id === list.id
										)
											return null;
										return (
											<ListContainer key={list.id}>
												<ListLink to={`/${list.id}`}>{list.title}</ListLink>
												<Spacer />
												<EditButton to={`/edit/${list.id}`}>
													<i className="fas fa-edit" />
												</EditButton>
												<DeleteButton onClick={() => onDelete(list.id)}>
													<i className="fas fa-trash" />
												</DeleteButton>
											</ListContainer>
										);
									})
								) : (
									<EmptyText>You haven't made any lists yet!</EmptyText>
								)}
							</Lists>
						);
					}}
				</Mutation>
			</Section>
			<Section>
				<SectionTitle>Your Favorites</SectionTitle>
				<Lists>
					{user.favorites.length > 0 ? (
						user.favorites.map((list) => (
							<ListContainer key={list.id}>
								<ListLink to={`/${list.id}`}>{list.title}</ListLink>
							</ListContainer>
						))
					) : (
						<EmptyText>You haven't favorited any lists yet!</EmptyText>
					)}
				</Lists>
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
const Spacer = styled.div`
	flex-grow: 1;
`;
const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.2rem;
	font-weight: lighter;
	margin-bottom: 1rem;
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
	color: #226089;
	&:hover {
		color: ${lighten(0.2, '#226089')};
	}
`;
const EditButton = styled(Link)`
	text-decoration: none;
	color: #226089;
	margin-right: 0.5rem;
	&:hover {
		color: ${lighten(0.2, '#226089')};
	}
`;
const DeleteButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	color: #226089;
	&:hover {
		color: ${lighten(0.2, '#226089')};
	}
`;
const ListContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
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
