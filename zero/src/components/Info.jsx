import { genRandomInt } from "../utils/mathUtil";

const companyNames = ["AWS", "Meta", "Apple"];
const applicantNames = ["Kay", "Jin", "Raul", " Eric"];

function Info() {
  const company = companyNames[genRandomInt(2)];
  const applicant = applicantNames[genRandomInt(3)];
  return (
    <div>
      <h1>
        {company} - {applicant}
      </h1>
    </div>
  );
}

export default Info;
