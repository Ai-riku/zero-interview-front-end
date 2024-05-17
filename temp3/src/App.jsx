import React from 'react';
// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Interview from './components/Interview/Interview.jsx'
import Message from './components/Message/Message.jsx'

function App() {
	return (
		<div id="app-div">
			<Header />
			<main id="mainid">
				<Interview id="interview" description="empty"/>
				{/* <Message id="message"/> */}
			</main>
		</div>
	)
}

export default App
