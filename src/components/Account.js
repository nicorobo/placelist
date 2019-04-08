import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.div``;

const Account = ({ user }) => (
	<Container>
		<h2>Account</h2>
		<a href="http://localhost:4000/auth/logout">
			<button>Logout</button>
		</a>
		<div>
			<Link to="/create">Create List</Link>
			<h4>Your Lists</h4>
			{user &&
				user.lists.map((list) => (
					<Link key={list.id} to={`/edit/${list.id}`}>
						{list.title}
					</Link>
				))}
		</div>
	</Container>
);

export default Account;
