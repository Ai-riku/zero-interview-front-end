import logoImg from "../assets/logo.png";
import "./Header.css";
import Nav from "./common/Nav";
import Header from "./common/Header";

function AppHeader() {
  return (
    <Header className="header">
      <div className="page-logo">
        <img src={logoImg} alt="logo" />
        <a href="/index.html">ZERO</a>
      </div>
      <Nav>
        <ul className="nav">
          <li>
            <a href="">Auto-apply</a>
          </li>
          <li>
            <a href="">Interview</a>
          </li>
          <li>
            <a href="">My</a>
          </li>
        </ul>
      </Nav>
    </Header>
  );
}

export default AppHeader;
