import React, { useState } from 'react';
import styled from 'styled-components';

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
	margin-bottom: 1rem;
	height: 1rem;
`;
const DescriptionInput = styled.input`
	margin-bottom: 1rem;
	height: 1rem;
`;
const SubmitButton = styled.button`
	cursor: pointer;
`;

export default ListForm;
