import React from 'react';
import './Video.css'
import Info from '../Info.jsx'

import InterviewBtn from "../InterviewBtn.jsx";
import { useState } from 'react';
import Video2 from "./Video2.jsx"

function Video() {
	const [selectedBtn, setSelectedBtn] = useState('');

	function clickHandler(selectedButton) {
		setSelectedBtn(selectedButton);
	}
	return (
	<div>
		<div className='temp'>
			<Video2 />
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