import { useState } from 'react';
import ListItem from './ListItem';

function PackingList({ items, setItems }) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description') {
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	}
	if (sortBy === 'packed') {
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));
	}

	const handleResetSort = () => {
		if (window.confirm('Are you sure you want to delete all items?')) {
			setSortBy('input');
			setItems([]);
		}
	};

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<ListItem key={item.id} item={item} setItems={setItems} />
				))}
			</ul>
			{/* sorting shouldn't re-render component, therefore we derive the state
			so we'll not use a component */}
			<div className="actions">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="input" selected>
						Sort by input order
					</option>
					<option value="description">
						Sort by input description
					</option>
					<option value="packed">Sort by input packed status</option>
				</select>
				<button onClick={handleResetSort}>Clear list</button>
			</div>
		</div>
	);
}

export default PackingList;
