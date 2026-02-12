import { useEffect, useState } from 'react';

export function useLocalStorage(initialState, key) {
	// always use callback if there's expected initial value to load
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	useEffect(() => {
		// save on local storage
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
