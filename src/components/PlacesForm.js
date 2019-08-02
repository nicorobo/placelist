import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
					let suggestions = data && data.placeSuggestions;
					return (
						<Autosuggest
							suggestions={suggestions || []}
							renderSuggestion={(suggestion, { query, isHighlighted }) => (
								<Suggestion suggestion={suggestion} isHighlighted={isHighlighted} />
							)}
							getSuggestionValue={(suggestion) => suggestion.description}
							onSuggestionsFetchRequested={() => null}
							onSuggestionsClearRequested={() => (suggestions = null)}
							onSuggestionSelected={onSuggestionSelected}
							highlightFirstSuggestion={true}
							inputProps={{
								value: input,
								onChange: handleInputChange,
								placeholder: 'Enter a place name',
								className: 'places-form',
							}}
						/>
					);
				}}
			</Query>
		</Container>
	);
};

const Suggestion = ({ suggestion, isHighlighted }) => {
	const split = suggestion.description.split(',');
	const primary = split[0];
	const secondary = split.slice(1).join(', ');
	return (
		<StyledSuggestion isHighlighted={isHighlighted}>
			<PrimaryLine>{primary}</PrimaryLine>
			<SecondaryLine>{secondary}</SecondaryLine>
		</StyledSuggestion>
	);
};
const StyledSuggestion = styled.div`
	padding: 0.5rem 0.5rem;
	font-size: 0.9rem;
	cursor: pointer;
	${(props) => (props.isHighlighted ? `background: #226089; color: white;` : '')};
`;
const PrimaryLine = styled.div``;
const SecondaryLine = styled.div`
	font-weight: lighter;
	font-size: 0.8rem;
`;
const Container = styled.div`
	margin-bottom: 1rem;
	.places-form {
		width: 85%;
		padding: 0.5rem 0.5rem;
	}
	.react-autosuggest__suggestions-container {
		position: absolute;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid #ccc;
	}
`;

export default PlacesForm;
