import { useEffect } from 'react';

export function useKeydown(key, action) {
	// global keypress event
	useEffect(() => {
		const keydownCallback = (e) => {
			// escape key pressed
			if (e.code.toLowerCase() === key.toLowerCase()) {
				action();
			}
		};
		document.addEventListener('keydown', keydownCallback);

		return () => document.removeEventListener('keydown', keydownCallback);
	}, [action, key]);
}
