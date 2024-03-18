import './Video.css'
import Info from './Info.jsx'

import InterviewBtn from "./InterviewBtn";
import { useState } from 'react';

function Video() {
	const [selectedBtn, setSelectedBtn] = useState('');

	function clickHandler(selectedButton) {
		setSelectedBtn(selectedButton);
	}
	return (
	<div>
		<div className='temp'>
			
		</div>
		{selectedBtn}
		<section id="menubtn">
			<InterviewBtn onSelect={() => clickHandler('record')}>Record</InterviewBtn>
			<InterviewBtn onSelect={() => clickHandler('stop')}>Stop</InterviewBtn>
			<InterviewBtn onSelect={() => clickHandler('screen share')}>Screen share</InterviewBtn>
			<InterviewBtn onSelect={() => clickHandler('mute')}>Mute</InterviewBtn>
		</section>
	</div>);
}

export default Video;