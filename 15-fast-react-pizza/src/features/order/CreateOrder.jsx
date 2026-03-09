import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);

function CreateOrder() {
	const {
		username,
		status: addressStatus,
		position,
		address,
		error: addressError,
	} = useSelector((store) => store.user);
	const isLoadingAddress = addressStatus === 'loading';
	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const [withPriority, setWithPriority] = useState(false);

	// catches the returned response of the action function when the redirection don't happen
	// basically catches all response from action unless its a redirect
	const formErrors = useActionData();
	const dispatch = useDispatch();

	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="text-xl font-semibold mb-8">
				Ready to order? Let's go!
			</h2>

			{/* <Form method="POST" action="/order/new"> */}
			{/* Form navigates away from the page */}
			<Form method="POST">
				<div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">First Name</label>
					<input
						type="text"
						name="customer"
						defaultValue={username}
						required
						// the class name "input" has been applied on index.css
						className="input grow"
					/>
				</div>

				<div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">Phone number</label>
					<div className="grow">
						<input
							type="tel"
							name="phone"
							required
							className="input w-full"
						/>
						{formErrors?.phone && (
							<p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">Address</label>
					<div className="grow">
						<input
							type="text"
							name="address"
							disabled={isLoadingAddress}
							className="input w-full"
							defaultValue={address}
							required
						/>
						{addressStatus === 'error' && (
							<p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
								{addressError}
							</p>
						)}
					</div>

					{!position.latitude && !position.longitude && (
						<span className="absolute right-[4px] top-[5px] z-50">
							<Button
								disabled={isLoadingAddress}
								type="small"
								onClick={(e) => {
									e.preventDefault();
									dispatch(fetchAddress());
								}}
							>
								Get Position
							</Button>
						</span>
					)}
				</div>

				<div className="mb-12 flex gap-5 items-center">
					<input
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label htmlFor="priority" className="font-medium">
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input
						type="hidden"
						name="cart"
						value={JSON.stringify(cart)}
					/>
					<input
						type="hidden"
						name="position"
						value={
							position.latitude && position.longitude
								? `${position.latitude},${position.longitude}`
								: ''
						}
					/>
					<Button
						type="primary"
						disabled={isSubmitting || isLoadingAddress}
					>
						{isSubmitting
							? 'Placing order...'
							: `Order now from ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export async function action({ request }) {
	// this is attached when the form is submitted and that the action is on the same page
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'true',
	};

	const errors = {};
	if (!isValidPhone(order.phone))
		errors.phone = 'Please give us a valid phone number.';

	if (Object.keys(errors).length > 0) return errors;

	// if we have no error, create and redirect
	const newOrder = await createOrder(order);

	// hack approach to clear cart after creating order - Do NOT overuse
	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
