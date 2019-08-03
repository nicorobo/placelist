import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { lighten } from 'polished';
import { favoriteColor, nonfavoriteColor } from '../theme.js';

const updateUserMutation = gql`
	mutation UpdateUser($id: ID!, $input: UserInput) {
		updateUser(id: $id, input: $input) {
			id
			favorites {
				id
			}
		}
	}
`;

const FavoriteButton = ({ id, user }) => (
	<Mutation mutation={updateUserMutation}>
		{(updateUser) => {
			const favoriteIds = user.favorites.filter((f) => f !== null).map((f) => f.id);
			const isFavorite = favoriteIds.includes(id);
			const handleClick = () => {
				// If list is already favorited, remove. Otherwise, add
				const favorites = isFavorite
					? favoriteIds.filter((l) => l !== id)
					: [...favoriteIds, id];
				updateUser({
					variables: { id: user.id, input: { favorites } },
				});
			};
			return (
				<Button onClick={handleClick}>
					<Heart className="fas fa-heart" isFavorite={isFavorite} />
				</Button>
			);
		}}
	</Mutation>
);

const Button = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	&:hover {
		i {
			color: ${lighten(0.2, favoriteColor)};
		}
	}
`;
const Heart = styled.i`
	font-size: 1rem;
	color: ${(props) => (props.isFavorite ? favoriteColor : nonfavoriteColor)};
`;

export default FavoriteButton;
