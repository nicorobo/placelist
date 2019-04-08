import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

// const Container = styled.div``;

const FavoriteButton = ({ id, user }) => (
	<Mutation mutation={updateUserMutation}>
		{(updateUser) => {
			if (!user) return false;
			const favoriteIds = user.favorites.map((f) => f.id);
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
			return <button onClick={handleClick}>{isFavorite ? 'unfavorite' : 'favorite'}</button>;
		}}
	</Mutation>
);

export default FavoriteButton;
