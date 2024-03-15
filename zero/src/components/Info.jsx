const companyNames = ['AWS', 'Meta', 'Apple'];
const positions = ['Frontend Developer', 'Designer', 'Recruiter', ' Backend Developer']
const interviewType = ['Behavioral', 'Coding','Technical']

function genRandomInt(max) {
	return Math.floor(Math.random() * (max + 1));
}

function Info() {
	const company = companyNames[genRandomInt(2)];
	const position = positions[genRandomInt(3)];
	const type = interviewType[genRandomInt(3)];
	return (
		<div>
			<h1>{company} - {position} - {type}</h1>
		</div>
	);
}

export default Info;