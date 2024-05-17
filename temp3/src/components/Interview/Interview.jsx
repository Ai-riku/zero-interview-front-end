
import React, { useState, useEffect } from 'react';
import './Interview.css'
import Interview2 from './Interview2.jsx'
import Countdown from '../Countdown/Countdown.jsx';

function Interview(props) {
	const [time, setTime] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTime(3);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div id="interview">
			{time < 3 ? <Countdown /> : <Interview2 />}			
		</div>
	);
}

export default Interview;