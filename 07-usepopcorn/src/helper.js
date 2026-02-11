export const getMovies = async (query, options) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
		options,
	);

	if (!res.ok) {
		throw new Error('Something went wrong with fetching movies.');
	}

	const data = await res.json();

	// check data.Search
	if ('Response' in data && data.Response === 'False') {
		throw new Error('No movie found on search.');
	}

	return data;
};

export const getMovie = async (id) => {
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`,
	);

	if (!res.ok) {
		throw new Error('Something went wrong with fetching movies.');
	}

	return await res.json();
};
