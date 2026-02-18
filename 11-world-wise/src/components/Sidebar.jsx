import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{/* when Outlet of RRD(react-router-dom) is used under a sub-url - e.g. app/cities, the Outlet will render the "element" of the Route declaration */}
			<Outlet />

			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise
					Inc.
				</p>
			</footer>
		</div>
	);
}

export default Sidebar;
