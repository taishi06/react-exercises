import { useEffect, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import ErrorMessage from './ErrorMessage';
import { getMovie } from './helper';

function MovieDetails({ watched, selectedId, onCloseMovie, onWatched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isWatched, setIsWatched] = useState(
		!!watched.filter((wm) => wm.imdbID === selectedId).length,
	);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId,
	)?.userRating;

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

	// global keypress event
	useEffect(() => {
		const keydownCallback = (e) => {
			// escape key pressed
			if (e.code === 'Escape') {
				onCloseMovie();
			}
		};
		document.addEventListener('keydown', keydownCallback);

		return () => document.removeEventListener('keydown', keydownCallback);
	}, [onCloseMovie]);

	useEffect(() => {
		if (!title && !imdbRating) {
			return;
		}
		document.title = `MOVIE: ${title} with IMDB rating of ${imdbRating}`;

		return () => (document.title = 'usePopcorn');
	}, [title, imdbRating]);

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

	const handleSetRating = (rating) => {
		const watched = {
			userRating: rating,
			imdbID,
			Title: title,
			Year: year,
			Poster: poster,
			runtime: runtime.includes('min') ? runtime.split(' ')[0] : runtime,
			imdbRating: Number(imdbRating),
		};
		onWatched(watched);
		setIsWatched(true);
	};

	const handleAdd = () => {
		// since we're just adding initially
		handleSetRating(0);
		onCloseMovie();
	};

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
							</section>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default MovieDetails;
