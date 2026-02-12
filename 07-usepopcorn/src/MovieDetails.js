import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import ErrorMessage from './ErrorMessage';
import { getMovie } from './helper';
import { useKeydown } from './hooks/useKey';

function MovieDetails({ watched, selectedId, onCloseMovie, onWatched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [avgRating, setAvgRating] = useState(0);
	const [error, setError] = useState(null);

	const rateCounterRef = useRef(0);

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId,
	)?.userRating;

	// destructuring using a different variable name should be like this - sourceKey: variableName
	const {
		imdbID,
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Year: year,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	// Escape key press event
	useKeydown('Escape', onCloseMovie);

	// set page title
	useEffect(() => {
		if (!title && !imdbRating) {
			return;
		}
		document.title = `MOVIE: ${title} with IMDB rating of ${imdbRating}`;

		return () => (document.title = 'usePopcorn');
	}, [title, imdbRating]);

	// fetch movie details
	useEffect(() => {
		setError(null);
		setIsLoading(true);
		const fetchMovieDetails = async () => {
			try {
				const data = await getMovie(selectedId);

				if ('Error' in data) {
					setError(data.Error);
					setMovie({});
				}

				setMovie(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovieDetails();

		return () => {
			setMovie({});
		};
	}, [selectedId]);

	// set average rating
	useEffect(() => {
		if (imdbRating && watchedUserRating) {
			setAvgRating(Number(imdbRating));
			setAvgRating((avgRating) => (avgRating + watchedUserRating) / 2);
		}

		return () => {
			setAvgRating(0);
		};
	}, [imdbRating, watchedUserRating]);

	// set count rating
	useEffect(() => {
		const currentWatched = watched.find((w) => w.imdbID === selectedId);

		// check if watched has user rating already
		if (currentWatched?.countRating) {
			rateCounterRef.current = currentWatched.countRating;
		}
	}, [watched, selectedId]);

	function handleSetRating(rating) {
		setAvgRating(Number(imdbRating));
		setAvgRating((avgRating) => (avgRating + rating) / 2);

		let rateCountRef = rateCounterRef.current + 1;
		// if user has rated before
		if (watched.find((w) => w.imdbID === selectedId)?.userRating) {
			rateCountRef = rateCountRef + 1;
		}

		const watchedMovie = {
			userRating: rating,
			imdbID,
			Title: title,
			Year: year,
			Poster: poster,
			runtime: runtime.includes('min') ? runtime.split(' ')[0] : runtime,
			imdbRating: Number(imdbRating),
			countRating: rateCountRef,
		};
		onWatched(watchedMovie);
	}

	function handleAdd() {
		// since we're just adding initially
		handleSetRating(0);
		onCloseMovie();
	}

	return (
		<>
			{error && !isLoading && <ErrorMessage message={error} />}
			{isLoading ? (
				<Loader />
			) : (
				<>
					{error !== null || (
						<div className="details">
							<header>
								<button
									className="btn-back"
									onClick={onCloseMovie}
								>
									&larr;
								</button>
								<img
									src={poster}
									alt={`Poster of ${title} movie`}
								/>
								<div className="details-overview">
									<h2>{title}</h2>
									<p>
										{released} &bull; {runtime}
									</p>
									<p>{genre}</p>
									<p>
										<span>⭐️</span> {imdbRating} IMDB rating
									</p>
								</div>
							</header>

							<section>
								<div className="rating">
									<StarRating
										maxRating={10}
										size={24}
										defaultRating={watchedUserRating}
										onSetRating={handleSetRating}
									/>

									{!isWatched && (
										<button
											className="btn-add"
											onClick={handleAdd}
										>
											+Add to list
										</button>
									)}
								</div>
								<p>
									<em>{plot}</em>
								</p>
								<p>Starring {actors}</p>
								<p>Directed by {director}</p>
								{watchedUserRating > 0 && (
									<p>
										Average Rating: {avgRating.toFixed(2)}
									</p>
								)}
							</section>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default MovieDetails;
