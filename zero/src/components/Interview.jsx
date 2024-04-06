import Button from "./common/Button";
import { useState } from "react";
import "./Interview.css";
import Section from "./common/Section";

function Interview(props) {
  const [selectedBtn, setSelectedBtn] = useState("");

  function clickHandler(selectedButton) {
    setSelectedBtn(selectedButton);
  }

  return (
    <div className="interview">
      <h1>Interview Screen</h1>
      <h1>{props.description}</h1>
      {selectedBtn}
      <Section className={"menu-btn"}>
        <Button onSelect={() => clickHandler("record")}>Record</Button>
        <Button onSelect={() => clickHandler("stop")}>Stop</Button>
        <Button onSelect={() => clickHandler("screen share")}>
          Screen share
        </Button>
        <Button onSelect={() => clickHandler("mute")}>Mute</Button>
      </Section>
    </div>
  );
}

export default Interview;
