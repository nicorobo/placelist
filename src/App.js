import React, { useState } from 'react';
import styled from 'styled-components';
import { Router, Link } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled.div``;
const NavContainer = styled.nav``;
const App = ({ loading, user }) => (
	<Container>
		<Nav user={user} />
		<Router>
			<Home path="/" />
			<Account path="/account" user={user} />
			<CreateList path="/create" user={user} />
		</Router>
	</Container>
);
const Nav = ({ user }) => (
	<NavContainer>
		{user ? (
			<Link to="/account">{user.name}</Link>
		) : (
			<a href="http://localhost:4000/auth/facebook">
				<button>Login</button>
			</a>
		)}
	</NavContainer>
);

const Home = () => <div>Home</div>;
const Account = ({ user }) => (
	<div>
		<h2>Account</h2>
		<div>
			<h4>Your Lists</h4>
			<Link to="/create">Create List</Link>
			{user.lists.map((list) => (
				<div>{list.title}</div>
			))}
		</div>
	</div>
);
const CreateList = ({ user }) => (
	<div>
		<h2>Create List</h2>
		<NewListForm />
	</div>
);

const createListMutation = gql`
	mutation CreateList($input: ListInput) {
		createList(input: $input) {
			id
			title
			places {
				name
			}
		}
	}
`;
const NewListForm = () => {
	const [title, changeTitle] = useState('');
	const [description, changeDescription] = useState('');
	const handleTitleChange = (e) => {
		changeTitle(e.target.value);
	};
	const handleDescriptionChange = (e) => {
		changeDescription(e.target.value);
	};
	return (
		<Mutation mutation={createListMutation}>
			{(createList, { data }) => {
				console.log('data from mutation: ', data);
				const submit = (e) => {
					e.preventDefault();
					createList({
						variables: { input: { title, description } },
					});
				};
				return (
					<form onSubmit={submit}>
						<input
							value={title}
							placeholder="Title"
							onChange={handleTitleChange}
						/>
						<input
							value={description}
							placeholder="Description"
							onChange={handleDescriptionChange}
						/>
						<button type="submit">Submit</button>
					</form>
				);
			}}
		</Mutation>
	);
};
export default App;
