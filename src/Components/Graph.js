import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import UserContext from '../config/UserContext';
const Graph = () => {
	const context = useContext(UserContext);
	let last1 = 0;
	let last2 = 0;
	let last3 = 0;

	const data = {
		labels: context.date.map((date, index) => date),
		datasets: [
			{
				label: 'Deaths',
				data: context.dayDeaths.map((day) => {
					if (last3 === 0) last3 = day;
					let result = day - last3;
					last3 = day;
					return result;
				}),
				borderColor: '#e91e63',
				backgroundColor: '#ecaac1',
			},
			{
				label: 'Recovered',
				data: context.dayRecovered.map((day) => {
					if (last2 === 0) last2 = day;
					let result = day - last2;
					last2 = day;
					return result;
				}),
				borderColor: '#019031',
				backgroundColor: '#75DA8B',
			},
			{
				label: 'CoronaVirus-Cases',
				data: context.dayCases.map((day) => {
					if (last1 === 0) last1 = day;
					let result = day - last1;
					last1 = day;
					return result;
				}),
				backgroundColor: '#8395A7',
				borderColor: '#535C68',
			},
		],
	};
	const option = {
		title: {
			display: true,
			text: context.country.country ? context.country.country : 'WorldWide',
			fontSize: 26,
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						stepSize: 20000,
					},
				},
			],
		},
		legend: {},
	};
	return (
		<div className="Graph__container">
			<Line height={300} data={data} options={option} />
		</div>
	);
};
export default Graph;
