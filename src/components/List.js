import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Sidebar from './Sidebar';
import EditSidebar from './EditSidebar';
import Map from './Map';

const query = gql`
	query getList($id: ID!) {
		list(id: $id) {
			id
			title
			description
			createdBy {
				id
			}
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

const List = ({ id, user, isOwner }) => {
	const [activePlace, setActivePlace] = useState(null);
	const [position, setPosition] = useState({ zoom: null, center: null });
	return (
		<Query query={query} variables={{ id }}>
			{({ loading, error, data }) => {
				if (loading) return <div>Loading...</div>;
				return (
					<Container>
						{isOwner ? (
							<EditSidebar
								id={id}
								title={data.list.title}
								description={data.list.description}
								places={data.list.places}
								activePlace={activePlace}
								setActivePlace={setActivePlace}
							/>
						) : (
							<Sidebar
								user={user}
								id={id}
								title={data.list.title}
								createdBy={data.list.createdBy.id}
								description={data.list.description}
								places={data.list.places}
								activePlace={activePlace}
								setActivePlace={setActivePlace}
							/>
						)}
						<MapContainer>
							<Map
								places={data.list.places}
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWXiqy631Eh5-S-00m8YCAVS9GenIgdUU&v=3.exp&libraries=geometry,drawing,places"
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `400px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								activePlace={activePlace}
								setActivePlace={setActivePlace}
								position={position}
								setPosition={setPosition}
							/>
						</MapContainer>
					</Container>
				);
			}}
		</Query>
	);
};

const Container = styled.div`
	display: flex;
	flex-grow: 1;
`;
const MapContainer = styled.div`
	flex-grow: 1;
`;

export default List;
