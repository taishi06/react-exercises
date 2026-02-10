import Logo from './Logo';

function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			{/* Logo and Search are okay since they are static components */}
			<Logo />
			{children}
		</nav>
	);
}

export default NavBar;
