import React, { useContext } from 'react';
import './RightComponent.css';
import UserContext from '../config/UserContext';
import Chart from './Chart';
import Graph from './Graph';
const RightComponent = () => {
	const context = useContext(UserContext);

	return (
		<div className="RightComponent__wrapper">
			<div className="RightComponent__title">Live Case by Country</div>
			<div className="RightComponent__container">
				{context.countryInfo.map((country, index) => {
					return (
						<div className="RightComponent__tabel" key={index}>
							<span className="RightComponent__tabel__row">
								<div id="RightComponent--country">{country.country}</div>
							</span>
							<span className="RightComponent__tabel__row">
								<div id="RightComponent--cases">{country.cases}</div>
							</span>
						</div>
					);
				})}
			</div>
			{/* <Chart /> */}
			<Graph />
		</div>
	);
};

export default RightComponent;
