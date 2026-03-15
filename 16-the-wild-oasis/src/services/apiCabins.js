import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded.');
	}

	return data;
}

export async function createEditCabin(cabinData, id) {
	const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
	// prepare image
	const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
		'/',
		'',
	);
	const imagePath = hasImagePath
		? cabinData.image
		: `${supabaseUrl}/${import.meta.env.VITE_SUPABASE_STORAGE_PATH}/${imageName}`;
	const submitData = { ...cabinData, image: imagePath };

	let query = supabase.from('cabins');

	if (typeof id === 'number') {
		query = query.update(submitData).eq('id', id);
	} else {
		query = query.insert([submitData]);
	}
	const { data, error } = await query.select().single();

	// create cabin error
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created.');
	}

	// upload image
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, cabinData.image);

	// delete the cabin if there was an uploadError
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);

		console.error(error);
		throw new Error('Cabin photo failed to upload to server.');
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted.');
	}

	return data;
}
