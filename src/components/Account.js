import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.div``;

const Account = ({ user }) => (
	<Container>
		<h2>Account</h2>
		<div>
			<h4>Your Lists</h4>
			<Link to="/create">Create List</Link>
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
