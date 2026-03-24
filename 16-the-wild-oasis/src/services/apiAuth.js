import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

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

export async function updateCurrentUser({ password, fullName, avatar }) {
	// 1. update password or fullName
	let updateData;

	if (password) {
		updateData = { password };
	}
	if (fullName) {
		updateData = {
			data: { fullName },
		};
	}

	const { data, error } = await supabase.auth.updateUser(updateData);
	// return error if there's none
	if (error) throw new Error(error.message);

	// 2. upload the avatar image
	if (!avatar) {
		return data;
	}

	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// 3. update the avatar in the user
	const { error: avatarUpdateError } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/${import.meta.env.VITE_SUPABASE_STORAGE_PATH}/avatars/${fileName}`,
		},
	});
	// return error if there's none
	if (avatarUpdateError) throw new Error(error.message);

	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}
