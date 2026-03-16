import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success('Settings has been successfully updated!');
			queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}
