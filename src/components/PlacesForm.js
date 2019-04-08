import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled.div``;

const query = gql`
	query PlaceSuggestions($input: String!) {
		placeSuggestions(input: $input) {
			id
			description
		}
	}
`;

const PlacesForm = ({ places, update }) => {
	const [input, setInput] = useState('');
	const handleInputChange = (e, { newValue }) => {
		setInput(e.target.value || newValue);
	};
	const onSuggestionSelected = (e, { suggestion }) => {
		setInput('');
		update({ places: [...places, suggestion.id] });
	};
	return (
		<Container>
			<Query query={query} variables={{ input }} skip={input.length < 3}>
				{({ loading, error, data }) => {
					const suggestions = data && data.placeSuggestions;
					return (
						<Autosuggest
							suggestions={suggestions || []}
							renderSuggestion={(suggestion) => <div>{suggestion.description}</div>}
							getSuggestionValue={(suggestion) => suggestion.description}
							onSuggestionsFetchRequested={() => null}
							onSuggestionSelected={onSuggestionSelected}
							alwaysRenderSuggestions={true}
							inputProps={{
								value: input,
								onChange: handleInputChange,
								placeholder: 'Enter a place name',
							}}
						/>
					);
				}}
			</Query>
		</Container>
	);
};

export default PlacesForm;
