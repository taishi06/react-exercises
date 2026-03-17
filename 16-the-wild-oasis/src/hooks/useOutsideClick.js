import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		}

		// take note of the 3rd parameter for outside click of an element like modal
		document.addEventListener('click', handleClick, listenCapturing);

		return () =>
			document.removeEventListener('click', handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
}
