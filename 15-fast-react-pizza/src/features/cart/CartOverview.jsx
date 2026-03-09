import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
	const totalQuantity = useSelector(getTotalCartQuantity);
	const totalAmount = useSelector(getTotalCartPrice);

	if (!totalQuantity) return null;

	return (
		<div className="fixed bottom-0 left-0 w-full bg-stone-800 text-stone-200 uppercase px-4 py-4 text-sm flex items-center justify-between sm:px-6 md:text-base">
			<p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
				<span>
					{totalQuantity} pizza{totalQuantity > 1 && 's'}
				</span>
				<span>{formatCurrency(totalAmount)}</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}

export default CartOverview;
