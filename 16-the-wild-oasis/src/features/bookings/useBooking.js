import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
	const { bookingId } = useParams();

	/**
	 * The function below allows to call and load the API getCabins and have it stored in the React Query cache
	 */
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	return { isLoading, booking, error };
}
