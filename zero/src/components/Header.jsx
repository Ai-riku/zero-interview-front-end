import logoImg from '../assets/logo.png'
import './Header.css'



function Header() {
	return (
		<header id="header">
			<div id="page-logo">
				<img src={logoImg} alt="logo"/>
				<a href="/index.html">ZERO</a>
			</div>
			<nav>
				<ul id="nav">
					<li><a href="">Auto-apply</a></li>
					<li><a href="">Interview</a></li>
					<li><a href="">Login</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header