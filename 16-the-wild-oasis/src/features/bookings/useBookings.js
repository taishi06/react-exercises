import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// get status
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };

	// get sort
	const sortBy = searchParams.get('sortBy') || 'startDate-desc';
	const [sortField, sortDir] = sortBy.split('-');
	const sort = { field: sortField, dir: sortDir };

	// get page
	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'));

	/**
	 * The function below allows to call and load the API getBookings and have it stored in the React Query cache
	 */
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		// array of keys here behave like useEffect behaviour
		queryKey: ['bookings', filter, sort, page],
		queryFn: () => getBookings({ filter, sort, page }),
	});

	// pre-fetch
	// next data
	const pageCount = Math.ceil(count / import.meta.env.VITE_PAGE_SIZE);
	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sort, page + 1],
			queryFn: () => getBookings({ filter, sort, page: page + 1 }),
		});
	}

	// previous data
	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sort, page - 1],
			queryFn: () => getBookings({ filter, sort, page: page - 1 }),
		});
	}

	return { isLoading, bookings, count, error };
}
