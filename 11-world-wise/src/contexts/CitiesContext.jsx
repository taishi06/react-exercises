import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true,
			};
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case 'city/loaded':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case 'city/added':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload,
				),
				currentCity: {},
			};
		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error('Unknown Dispatch Type');
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading data.',
				});
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(cityId) {
			if (String(cityId) === String(currentCity.id)) return;

			try {
				dispatch({ type: 'loading' });
				const res = await fetch(`${BASE_URL}/cities/${cityId}`);
				const data = await res.json();

				dispatch({ type: 'city/loaded', payload: data });
			} catch {
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading data...',
				});
			}
		},
		[currentCity.id],
	);

	async function createCity(city) {
		try {
			dispatch({ type: 'loading' });
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(city),
			});

			if (!res.ok) {
				throw new Error('There was a problem processing your data...');
			}

			const data = await res.json();
			dispatch({
				type: 'city/added',
				payload: { ...city, id: data.id },
			});
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was a problem saving your data...',
			});
		}
	}

	async function deleteCity(cityId) {
		try {
			dispatch({ type: 'loading' });
			const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
				method: 'DELETE',
			});

			if (!res.ok) {
				throw new Error(
					'There was a problem processing your request...',
				);
			}

			dispatch({ type: 'city/deleted', payload: cityId });
		} catch (err) {
			dispatch({
				type: 'rejected',
				payload: 'There was a problem deleting your data...',
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined) {
		throw new Error(
			'CitiesContext was not properly used or possibly outside the CitiesProvider.',
		);
	}

	return context;
}

export { CitiesProvider, useCities };
