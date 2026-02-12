import { useEffect, useState } from 'react';
import { getMovies } from '../helper';

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// useEffect - runs after the App component is rendered on browser
	useEffect(() => {
		// callback?.();

		const abortCtlr = new AbortController();

		// TODO: use pagination
		const fetchMovies = async () => {
			try {
				setError('');
				setIsLoading(true);

				// get movies
				const data = await getMovies(query, {
					signal: abortCtlr.signal,
				});

				// check data.Search
				if ('Response' in data && data.Response === 'False') {
					throw new Error('No movie found on search.');
				}

				// in real-world, we should do checks on the response before setting the data
				setMovies(data.Search);
				setIsLoading(false);
				setError('');
			} catch (error) {
				if (error.name !== 'AbortError') setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		fetchMovies();

		return () => {
			abortCtlr.abort();
		};
	}, [query]);

	return { movies, isLoading, error };
}
