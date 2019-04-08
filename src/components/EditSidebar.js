import React, { useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PlacesForm from './PlacesForm';
import PlaceList from './PlaceList';

const Container = styled.div``;

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

// Move mutation logic to PlacesForm component?
const EditSidebar = ({ id, title, description, places }) => (
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
					<PlaceList places={places} update={handleUpdate} />
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
			<form onSubmit={handleUpdate}>
				<input value={content} onChange={handleInput} />
				<input type="submit" value="Submit" />
			</form>
		);
	return (
		<div>
			<h3>{content}</h3>
			<button onClick={handleToggleEdit}>Edit</button>
		</div>
	);
};
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
			<form onSubmit={handleUpdate}>
				<textarea onChange={handleInput}>{content}</textarea>
				<input type="submit" value="Submit" />
			</form>
		);
	return (
		<div>
			<p>{content}</p>
			<button onClick={handleToggleEdit}>Edit</button>
		</div>
	);
};

export default EditSidebar;
