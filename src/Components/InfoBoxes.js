import React from 'react';

const InfoBoxes = ({ title, today, total, color }) => {
	const kFormatter = (num) => {
		return Math.abs(num) > 999
			? (Math.abs(num) / 1000).toFixed(1) + 'k'
			: Math.sign(num) * Math.abs(num);
	};
	return (
		<div
			className="InfoBoxes__container"
			style={{
				borderBottom: '5px solid ' + color,
			}}
		>
			<div className="InfoBoxes__wrapper">
				<div className="InfoBoxes__title">{title}</div>
				<div
					className="InfoBoxes__today"
					style={{
						color: color,
					}}
				>
					+{kFormatter(today)}
				</div>
				<div className="InfoBoxes__total">Total:{kFormatter(total)}</div>
			</div>
		</div>
	);
};

export default InfoBoxes;
