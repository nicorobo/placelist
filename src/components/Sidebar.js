import React from 'react';
import styled from 'styled-components';
import PlaceList from './PlaceList';
import FavoriteButton from './FavoriteButton';
import { primaryColor, primaryText } from '../theme.js';

const Sidebar = ({
	id,
	user,
	title,
	description,
	places,
	createdBy,
	activePlace,
	setActivePlace,
	position,
	setPosition,
}) => (
	<Container>
		<Title>{title}</Title>
		<Description>{description}</Description>
		<CreatedBy>
			<Avatar>
				<img src={createdBy.photo} alt="Creator's Avatar" />
			</Avatar>
			<Name>
				Created by <span>{createdBy.name}</span>
			</Name>
			{user && <FavoriteButton id={id} user={user} />}
		</CreatedBy>

		<PlaceList
			places={places}
			activePlace={activePlace}
			setActivePlace={setActivePlace}
			position={position}
			setPosition={setPosition}
		/>
	</Container>
);
const Avatar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 30px;
	margin-right: 0.5rem;
	overflow: hidden;
	border-radius: 50%;
	img {
		width: 100%;
	}
`;
const Title = styled.h3`
	font-size: 1.5rem;
	flex-grow: 1;
	margin-bottom: 0.8rem;
`;
const Description = styled.p`
	font-size: 0.9rem;
	flex-grow: 1;
	margin-bottom: 0.8rem;
`;
const CreatedBy = styled.div`
	display: flex;
	align-items: center;
	font-size: 0.8rem;
	margin-bottom: 1.5rem;
`;
const Name = styled.div`
	flex-grow: 1;
	span {
		color: ${primaryColor};
	}
`;
const Container = styled.div`
	margin-top: 1.5rem;
	padding: 0.5rem 1rem 0.5rem 2rem;
	width: 300px;
	color: ${primaryText};
`;

export default Sidebar;
