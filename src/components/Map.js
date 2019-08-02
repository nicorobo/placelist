import React from 'react';
import styled from 'styled-components';
import GoogleMap from 'google-map-react';

const Map = ({ places, activePlace, setActivePlace }) => (
	<div style={{ height: '100%', width: '100%' }}>
		<GoogleMap
			bootstrapURLKeys={{ key: 'AIzaSyCWXiqy631Eh5-S-00m8YCAVS9GenIgdUU' }}
			defaultZoom={11}
			defaultCenter={{
				lat: 30.2672,
				lng: -97.7431,
			}}>
			{places.map((p) => {
				const onMouseEnter = () => setActivePlace(p);
				const onMouseLeave = () => setActivePlace(null);
				return (
					<PlaceMarker
						key={p.id}
						isActive={activePlace && activePlace.id === p.id}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						lat={p.location.lat}
						lng={p.location.lng}
						place={p}
					/>
				);
			})}
		</GoogleMap>
	</div>
);

const PlaceMarker = styled.div`
	height: 10px;
	width: 10px;
	border-radius: 50%;
	cursor: default;
	background: ${(props) => (props.isActive ? 'blue' : 'red')};
`;

export default Map;
