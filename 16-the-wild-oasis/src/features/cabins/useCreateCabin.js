import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin as createEditCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin(isEditing) {
	const queryClient = useQueryClient();
	const { isLoading: isProcessing, mutate: createEditCabin } = useMutation({
		mutationFn: isEditing
			? ({ cabinData, id }) =>
					createEditCabinApi(cabinData, isEditing ? id : 0)
			: createEditCabinApi,
		onSuccess: () => {
			toast.success(
				`Cabin has been successfully ${isEditing ? 'updated' : 'created'}.`,
			);
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isProcessing, createEditCabin };
}
