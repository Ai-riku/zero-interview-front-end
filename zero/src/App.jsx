import "./App.css";
import AppHeader from "./components/AppHeader.jsx";
import Interview from "./components/Interview.jsx";
import Message from "./components/Message.jsx";
import Info from "./components/Info.jsx";

function App() {
  return (
    <div className="app-div">
      <AppHeader />
      <Info />
      <main className="main-id">
        <Interview className="interview" description="empty" />
        <Message className="message" />
      </main>
      <footer>
        <h5>footer</h5>
      </footer>
    </div>
  );
}

export default App;
