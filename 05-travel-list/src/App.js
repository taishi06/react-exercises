import { useState } from 'react';
import Form from './Form';
import Logo from './Logo';
import PackingList from './PackingList';
import Stats from './Stats';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: false },
	{ id: 3, description: 'Shirts', quantity: 5, packed: true },
];

function App() {
	const [items, setItems] = useState(initialItems);

	return (
		<div className="app">
			<Logo />
			<Form setItems={setItems} />
			<PackingList items={items} />
			<Stats />
		</div>
	);
}

export default App;
