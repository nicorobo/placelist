import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleMap from 'google-map-react';
import { multiPoint } from '@turf/helpers';
import bbox from '@turf/bbox';
import { fitBounds } from 'google-map-react/utils';
import { getMarkupFromTree } from 'react-apollo';

const getBounds = (places, container) => {
	if (places.length <= 0) return { center: [0, 0], zoom: 11 };
	if (places.length === 1)
		return { center: [places[0].location.lat, places[0].location.lng], zoom: 11 };
	const mp = multiPoint(places.map((p) => [p.location.lat, p.location.lng]));
	const box = bbox(mp);
	const bounds = {
		nw: {
			lat: box[0],
			lng: box[1],
		},
		se: {
			lat: box[2],
			lng: box[3],
		},
	};
	const size = {
		width: container.clientWidth,
		height: container.clientHeight,
	};
	return fitBounds(bounds, size);
};
const Map = ({ places, activePlace, setActivePlace, position, setPosition }) => {
	const [cont, setCont] = useState(null);
	return (
		<div ref={setCont} id="map-container" style={{ height: '100%', width: '100%' }}>
			{!cont ? (
				<div>Loading...</div>
			) : (
				<GoogleMap
					bootstrapURLKeys={{ key: 'AIzaSyCWXiqy631Eh5-S-00m8YCAVS9GenIgdUU' }}
					zoom={position.zoom}
					center={position.center}
					defaultZoom={getBounds(places, cont).zoom - 1}
					defaultCenter={getBounds(places, cont).center}>
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
								place={p}>
								<i className="fas fa-map-marker-alt" />
							</PlaceMarker>
						);
					})}
				</GoogleMap>
			)}
		</div>
	);
};

const PlaceMarker = styled.div`
	font-size: ${(props) => (props.isActive ? '2rem' : '1.5rem')};
	position: absolute;
	top: ${(props) => (props.isActive ? '-2rem' : '-1.5rem')};
	left: ${(props) => (props.isActive ? '-0.7rem' : '-0.5rem')};
	transition: 0.2s ease all;
	cursor: pointer;
`;

export default Map;
