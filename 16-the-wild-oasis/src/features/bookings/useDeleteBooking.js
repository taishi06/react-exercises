import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

// ideal to build this custom hook if you have 2 hooks that work hand in hand
export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingApi,
		// reset cache on success
		onSuccess: () => {
			toast.success('Booking successfully deleted.');
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}
