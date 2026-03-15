import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	/**
	 * The function below allows to call and load the API getCabins and have it stored in the React Query cache
	 */
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
}
