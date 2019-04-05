import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.form``;

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
			<input value={title} placeholder="Title" onChange={handleTitleChange} />
			<input
				value={description}
				placeholder="Description"
				onChange={handleDescriptionChange}
			/>
			<button type="submit">Create</button>
		</Container>
	);
};

export default ListForm;
