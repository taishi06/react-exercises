import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		mutate: login,
		isLoading,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			// set query cache for better performance
			queryClient.setQueryData(['user'], user.user);
			navigate('/dashboard', { replace: true });
		},
		onError: (error) => toast.error(error.message),
	});

	return { login, isLoading, error };
}
