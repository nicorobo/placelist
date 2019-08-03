import React, { useState } from 'react';
import styled from 'styled-components';
import { primaryColor, textOnPrimaryColor } from '../theme';

const ListForm = ({ createList }) => {
	const [title, changeTitle] = useState('');
	const [description, changeDescription] = useState('');
	const handleTitleChange = (e) => {
		changeTitle(e.target.value);
	};
	const handleDescriptionChange = (e) => {
		changeDescription(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		createList({
			variables: { input: { title, description } },
		});
	};
	return (
		<Container onSubmit={handleSubmit}>
			<TitleInput id="title" value={title} placeholder="Title" onChange={handleTitleChange} />
			<DescriptionInput
				value={description}
				placeholder="Description"
				onChange={handleDescriptionChange}
			/>
			<SubmitButton type="submit">Create</SubmitButton>
		</Container>
	);
};

const Container = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	max-width: 400px;
	margin-top: 1rem;
`;
const TitleInput = styled.input`
	padding: 0.5rem 0.5rem;
	margin-bottom: 1rem;
	height: 1rem;
`;
const DescriptionInput = styled.input`
	padding: 0.5rem 0.5rem;
	margin-bottom: 1rem;
	height: 1rem;
`;

const SubmitButton = styled.button`
	padding: 0.5rem 1rem;
	color: ${primaryColor};
	border-radius: 5px;
	border: 1px solid ${primaryColor};
	cursor: pointer;
	outline: none;
	font-size: 0.8rem;
	background: ${textOnPrimaryColor};
	&:hover {
		background: ${primaryColor}
		color: ${textOnPrimaryColor};
	}
`;

export default ListForm;
