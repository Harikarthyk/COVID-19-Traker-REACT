import React from 'react';
import { LoadScript, Circle, GoogleMap } from '@react-google-maps/api';

const Map = ({ allLatLong }) => {
	const mapStyles = {
		height: '60vh',
	};
	const defaultCenter = {
		lat: 28.033886,
		lng: 1.659626,
	};
	return (
		<div className="Map__container">
			<LoadScript googleMapsApiKey="AIzaSyCvm0IKBiRk3bFQaNjkVJ9oc241DgEf3rU">
				<GoogleMap
					mapContainerStyle={mapStyles}
					zoom={2}
					center={defaultCenter}
				>
					{allLatLong.map((curr, index) => {
						return (
							<Circle
								key={index}
								center={{
									lat: Number(curr.lat),
									lng: Number(curr.long),
								}}
								radius={Number(curr.size)}
								options={{ strokeColor: 'red' }}
							></Circle>
						);
					})}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};
export default Map;
