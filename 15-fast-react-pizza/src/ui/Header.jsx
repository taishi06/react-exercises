import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
	return (
		<header className="bg-yellow-500 p-4 flex items-center justify-between uppercase border-b border-stone-200 px-6 py-3 sm:px-6">
			<Link to="/" className="tracking-widest">
				Fast React Pizza Co.
			</Link>

			<SearchOrder />

			<Username />
		</header>
	);
}

export default Header;
