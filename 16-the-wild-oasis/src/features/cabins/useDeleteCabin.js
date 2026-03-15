import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

// ideal to build this custom hook if you have 2 hooks that work hand in hand
export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		// reset cache on success
		onSuccess: () => {
			toast.success('Cabin successfully deleted.');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
