import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import UserContext from '../config/UserContext';
const Chart = () => {
	const context = useContext(UserContext);
	const data = {
		labels: ['TotalCases', 'Active', 'Recoverd', 'Deaths'],
		datasets: [
			{
				data: [
					context.country.cases,
					context.country.active,
					context.country.recovered,
					context.country.deaths,
				],
				backgroundColor: ['#E74292', '#F3CC79', '#6AB04A', '#EC4849'],
			},
		],
	};
	const option = {
		title: {
			text: context.country.country ? context.country.country : 'World-Wide',
			display: true,
			fontSize: 20,
		},
		legend: {
			titleFontFamily: 'Helvetica',
			borderColor: 'black',
		},
	};
	return (
		<div className="Chart__container">
			<Pie height={330} data={data} options={option} />
		</div>
	);
};

export default Chart;
