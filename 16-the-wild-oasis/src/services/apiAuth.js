import supabase from './supabase';

export async function login({ email, password }) {
	const { isLoading, data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return { isLoading, data };
}

export async function getCurrentUser() {
	// get session
	const { data: session } = await supabase.auth.getSession();

	// check if there's existing user session
	if (!session.session) return null;

	// get user based on current session
	const { data, error } = await supabase.auth.getUser();

	// return error if there's none
	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}
