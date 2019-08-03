import React, { useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { lighten } from 'polished';
import PlacesForm from './PlacesForm';
import PlaceList from './PlaceList';
import { primaryColor, primaryText, secondaryText } from '../theme.js';

// Move mutation logic to PlacesForm component?
const EditSidebar = ({
	id,
	title,
	description,
	places,
	activePlace,
	setActivePlace,
	position,
	setPosition,
}) => (
	<Mutation mutation={updateListMutation}>
		{(updateList) => {
			const handleUpdate = (input) => {
				updateList({
					variables: {
						id,
						input,
					},
				});
			};
			return (
				<Container>
					<EditableTitle value={title} update={handleUpdate} />
					<EditableDescription value={description} update={handleUpdate} />
					<PlacesForm
						update={handleUpdate}
						places={places.map((place) => {
							return place ? place.id : null;
						})}
					/>
					<PlaceList
						places={places}
						update={handleUpdate}
						activePlace={activePlace}
						setActivePlace={setActivePlace}
						position={position}
						setPosition={setPosition}
					/>
				</Container>
			);
		}}
	</Mutation>
);

const EditableTitle = ({ value, update }) => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(value);
	const handleUpdate = (e) => {
		e.preventDefault();
		update({ title: content });
		setEditing(false);
	};
	const handleToggleEdit = () => setEditing(!editing);
	const handleInput = (e) => setContent(e.target.value);
	if (editing)
		return (
			<TitleForm onSubmit={handleUpdate}>
				<TitleInput value={content} onChange={handleInput} />
				<SubmitButton />
			</TitleForm>
		);
	return (
		<TitleSection>
			<Title>{content}</Title>
			<EditButton onClick={handleToggleEdit} />
		</TitleSection>
	);
};

const TitleSection = styled.div`
	display: flex;
	margin-bottom: 0.8rem;
	align-items: center;
`;
const TitleForm = styled.form`
	display: flex;
	margin-bottom: 0.8rem;
	align-items: center;
`;
const Title = styled.h3`
	font-size: 1.5rem;
	flex-grow: 1;
`;
const TitleInput = styled.input`
	font-size: 1rem;
	flex-grow: 1;
`;

const EditableDescription = ({ value, update }) => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(value);
	const handleUpdate = (e) => {
		e.preventDefault();
		update({ description: content });
		setEditing(false);
	};
	const handleToggleEdit = () => setEditing(!editing);
	const handleInput = (e) => setContent(e.target.value);
	if (editing)
		return (
			<DescriptionForm onSubmit={handleUpdate}>
				<DescriptionInput onChange={handleInput} value={content} />
				<SubmitButton />
			</DescriptionForm>
		);
	return (
		<DescriptionSection>
			<Description>{content}</Description>
			<EditButton onClick={handleToggleEdit} />
		</DescriptionSection>
	);
};

const SubmitButton = () => (
	<StyledButton type="submit">
		<i className="fas fa-check" />
	</StyledButton>
);
const EditButton = ({ onClick }) => (
	<StyledButton onClick={onClick}>
		<i className="fas fa-edit" />
	</StyledButton>
);

const DescriptionSection = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.8rem;
`;
const DescriptionForm = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.8rem;
`;
const Description = styled.p`
	font-size: 0.9rem;
	flex-grow: 1;
	color: ${primaryText};
`;
const DescriptionInput = styled.textarea`
	font-size: 0.9rem;
	height: 50px;
	flex-grow: 1;
`;

const StyledButton = styled.button`
	border: none;
	outline: none;
	font-size: 0.9rem;
	background: white;
	cursor: pointer;
	color: ${secondaryText};
	&:hover {
		color: ${lighten(0.2, primaryColor)};
	}
	align-self: flex-end;
`;

const Container = styled.div`
	padding: 0.5rem 1rem 0.5rem 1rem;
	width: 300px;
	margin-top: 1.5rem;
	color: ${primaryText};
`;

const updateListMutation = gql`
	mutation UpdateList($id: ID!, $input: ListInput) {
		updateList(id: $id, input: $input) {
			id
			title
			description
			places {
				id
				name
				address
				location {
					lat
					lng
				}
			}
		}
	}
`;

export default EditSidebar;
