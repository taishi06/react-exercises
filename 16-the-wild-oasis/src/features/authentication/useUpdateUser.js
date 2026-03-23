import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser(isEditing) {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success(`Account has been successfully updated.`);
			queryClient.invalidateQueries({ queryKey: ['user'] });
			queryClient.setQueryData(['user'], user);
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateUser };
}
