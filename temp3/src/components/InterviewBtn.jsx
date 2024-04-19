import React from 'react';
function InterviewBtn({ children, onSelect }) {
	return (
		<button onClick={onSelect}>{children}</button>
	);
}

export default InterviewBtn;