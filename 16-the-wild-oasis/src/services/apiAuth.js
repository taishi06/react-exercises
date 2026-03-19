import supabase from './supabase';

export async function login({ email, password }) {
	const { isLoading, data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return { isLoading, data };
}
