'use server';

/**
 * All functions here are server actions and can be used on client or server components.
 */

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

export async function signInAction() {
	return await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
	return await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
	const session = await auth();

	if (!session?.user?.guestId) {
		throw new Error('User is not authenticated');
	}

	// prepare values
	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	// validate national ID number (for demo purposes, we just check if it's alphanumeric and between 6 and 12 characters)
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
		throw new Error('Please provide a valid National ID');
	}

	// we convert the formData to an object and pass it to our data service function
	const updatedFields = {
		nationalID,
		nationality,
		countryFlag,
	};

	// perform supabase update
	const { data, error } = await supabase
		.from('guests')
		.update(updatedFields)
		.eq('id', session.user.guestId);

	if (error) {
		throw new Error('Guest could not be updated');
	}

	// revalidate cache for the guest profile page to reflect the updated data immediately
	revalidatePath('/account/profile');
}
