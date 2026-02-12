import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import NumResults from './NumResults';
import Main from './Main';
import MovieList from './MovieList';
import Search from './Search';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedMovieList';
import Box from './Box';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MovieDetails from './MovieDetails';
import { getMovies } from './helper';

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	const [error, setError] = useState('');

	// useEffect - runs after the App component is rendered on browser
	useEffect(() => {
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

		handleCloseMovie();
		fetchMovies();

		return () => {
			abortCtlr.abort();
		};
	}, [query]);

	const handleSelectedId = (movieId) => {
		setSelectedId((selectedId) =>
			movieId === selectedId ? null : movieId,
		);
	};

	const handleCloseMovie = () => {
		setSelectedId(null);
	};

	const handleSetWatched = (watchedMovie) => {
		// perform an upsert
		setWatched((movies, obj, key = 'imdbID') =>
			movies.some((movie) => movie[key] === watchedMovie[key])
				? movies.map((m) =>
						m[key] === watchedMovie[key]
							? { ...m, userRating: watchedMovie.userRating }
							: m,
					)
				: [...movies, watchedMovie],
		);
	};

	const handleDeleteWatched = (imdbID) => {
		setWatched((watched) =>
			watched.filter((movie) => movie.imdbID !== imdbID),
		);
	};

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSelectedId}
						/>
					)}
					{error && <ErrorMessage message={error} />}
					{!query && !error && (
						<p className="loader">
							🔎 Please enter the movie you want to search above.
						</p>
					)}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							watched={watched}
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onWatched={handleSetWatched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
