import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === 'submitting';

	return (
		// fetcher.Form does not navigate away on the page
		<fetcher.Form method="PATCH" className="text-right">
			<Button type="primary" disabled={isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Make priority'}
			</Button>
		</fetcher.Form>
	);
}

export async function action({ request, params }) {
	await updateOrder(params.orderId, { priority: true });
	return null;
}

export default UpdateOrder;
