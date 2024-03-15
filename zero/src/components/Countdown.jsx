import React, { useState, useEffect } from 'react';
import './Countdown.css'

const Countdown = () => {
	const [count, setCount] = useState(3);

	useEffect(() => {
		const timer = setInterval(() => {
			if (count > 0) {
				setCount(count - 1);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [count]);

	return (
		<div className="countdown">
			{count > 0 ? count : '시작!'}
		</div>
	);
};

export default Countdown;