import React, { useContext } from 'react';
import './LeftComponent.css';
import UserContext from '../config/UserContext';
import InfoBoxes from './InfoBoxes';
import Map from './Map';
const LeftComponent = () => {
	const context = useContext(UserContext);
	const changeCountry = (e) => {
		context.changeCountry(e);
	};
	return (
		<div className="LeftComponent__container">
			<div className="LeftComponent__header">
				<div className="LeftComponent__title">
					<h1>COVID-19 TRACKER</h1>
				</div>
				<div className="LeftComponent__dropdown">
					<select onChange={(e) => changeCountry(e)} name="countries">
						<option value="ALL">WorldWide</option>
						{context.countries.map((country, index) => (
							<option key={index} value={country.value}>
								{country.country}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="LeftComponent__stats">
				<InfoBoxes
					title="CoronaVirus Cases"
					today={context.country.todayCases}
					total={context.country.cases}
					color="#1287A5"
				/>
				<InfoBoxes
					title="Recoverd"
					today={context.country.todayRecovered}
					total={context.country.recovered}
					color="#049033"
				/>
				<InfoBoxes
					title="Deaths "
					today={context.country.todayDeaths}
					total={context.country.deaths}
					color="#e6417e"
				/>
			</div>
			{console.log(context.allLatLong)}
			<Map allLatLong={context.allLatLong} />
		</div>
	);
};

export default LeftComponent;
