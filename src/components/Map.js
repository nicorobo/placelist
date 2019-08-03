import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GoogleMap from 'google-map-react';
import { multiPoint } from '@turf/helpers';
import bbox from '@turf/bbox';
import { fitBounds } from 'google-map-react/utils';
import { primaryColor, highlightColor } from '../theme.js';
const defaultPosition = { center: [39.8097343, -98.5556199], zoom: 3 };
const getBounds = (places, container) => {
	if (places.length <= 0) return defaultPosition;
	if (places.length === 1)
		return { center: [places[0].location.lat, places[0].location.lng], zoom: 13 };
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
	useEffect(() => {
		if (cont) {
			const bounds = getBounds(places, cont);
			bounds.zoom -= 1;
			setPosition(bounds);
		}
	}, [places.length]);
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
						const onClick = () => {
							setPosition({
								zoom: 17,
								center: { lat: p.location.lat, lng: p.location.lng },
							});
						};
						return (
							<PlaceMarker
								key={p.id}
								isActive={activePlace && activePlace.id === p.id}
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								lat={p.location.lat}
								lng={p.location.lng}
								onClick={onClick}
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
	color: ${(props) => (props.isActive ? highlightColor : '#333')};
	opacity: ${(props) => (props.isActive ? 1 : 0.8)};
	z-index: ${(props) => (props.isActive ? 100 : '')};
	top: ${(props) => (props.isActive ? '-2rem' : '-1.5rem')};
	left: ${(props) => (props.isActive ? '-0.7rem' : '-0.5rem')};
	transition: 0.2s ease all;
	cursor: pointer;
`;

export default Map;
