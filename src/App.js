import React, { useState, useEffect } from 'react';
import './App.css';
import LeftComponent from './Components/LeftComponent';
import UserContext from './config/UserContext';
import RightComponent from './Components/RightComponent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [dayRecovered, setDayRecovered] = useState([]);
	const [dayDeaths, setDayDeaths] = useState([]);
	const [dayCases, setDayCases] = useState([]);
	const [date, setDate] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countries, setCountries] = useState([]);
	const [countryInfo, setCountryInfo] = useState([]);
	const [allLatLong, setAllLatLong] = useState([]);
	const [latLong, setLatLong] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const request = await fetch('https://disease.sh/v3/covid-19/countries');
			const response = await request.json();
			response.sort((a, b) => (a.cases > b.cases ? -1 : 1));
			setCountryInfo(response);
		}
		fetchData();
	}, []);
	const fetchDateDays = async (code) => {
		try {
			if (code === 'ALL') {
				const request = await fetch(
					'https://disease.sh/v3/covid-19/historical/all',
				);
				const response = await request.json();
				setDayCases(Object.values(response.cases));
				setDate(Object.keys(response.cases));
				setDayDeaths(Object.values(response.deaths));
				setDayRecovered(Object.values(response.recovered));
				return;
			}
			const request = await fetch(
				'https://disease.sh/v3/covid-19/historical/' + code,
			);
			const response = await request.json();
			setDayCases(Object.values(response.timeline?.cases));
			setDate(Object.keys(response.timeline?.cases));
			setDayDeaths(Object.values(response.timeline?.deaths));
			setDayRecovered(Object.values(response.timeline?.recovered));
		} catch {
			toast('Graph Does not exist...!!', {
				backgroundColor: 'warning',
				type: 'error',
			});
		}
	};

	const changeCountry = async (e) => {
		if (e.target.value === 'ALL') {
			const request = await fetch('https://disease.sh/v3/covid-19/all');
			const response = await request.json();
			setCountry(response);
			fetchDateDays('ALL');
		} else {
			const code = e.target.value;
			const request = await fetch(
				'https://disease.sh/v3/covid-19/countries/' + code,
			);
			const response = await request.json();
			setCountry(response);
			console.log(country);
			if (code != null) fetchDateDays(code);
			setLatLong([response.countryInfo?.lat, response.countryInfo?.long]);
		}
	};
	useEffect(() => {
		async function fetchData() {
			const request = await fetch('https://disease.sh/v3/covid-19/all');
			const response = await request.json();
			setCountry(response);
		}
		fetchData();
		fetchDateDays('ALL');
	}, []);

	useEffect(() => {
		async function fetchData() {
			const request = await fetch('https://disease.sh/v3/covid-19/countries');
			const response = await request.json();
			const temp = response.map((country) => {
				return {
					country: country.country,
					value: country.countryInfo?.iso2,
					cases: country.cases,
					active: country.active,
					population: country.population,
					recovered: country.recovered,
					deaths: country.deaths,
					lat: country.countryInfo?.lat,
					long: country.countryInfo?.long,
				};
			});
			setCountries(temp);
		}
		fetchData();
	}, []);
	useEffect(() => {
		checkLatLong();
	}, [country]);
	const checkLatLong = () => {
		const temp = countryInfo.map((country) => {
			return {
				lat: Number(country.countryInfo?.lat),
				long: Number(country.countryInfo?.long),
				size: Number(country.cases),
			};
		});
		setAllLatLong(temp);
	};
	return (
		<div className="App">
			<UserContext.Provider
				value={{
					country,
					countries,
					changeCountry,
					countryInfo,
					dayCases,
					dayDeaths,
					dayRecovered,
					date,
					allLatLong,
				}}
			>
				<ToastContainer />
				<LeftComponent />
				<RightComponent />
			</UserContext.Provider>
		</div>
	);
}

export default App;
