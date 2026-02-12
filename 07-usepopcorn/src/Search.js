import { useRef } from 'react';
import { useKeydown } from './hooks/useKey';

function Search({ query, setQuery }) {
	const searchInput = useRef(null);

	// initially focus on search
	useKeydown('Enter', () => {
		if (document.activeElement === searchInput.current) return;
		searchInput.current.focus();
		setQuery('');
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={searchInput}
		/>
	);
}

export default Search;
