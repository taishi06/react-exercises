function ListItem({ item, setItems }) {
	const handleUpdateItem = (itemId) => {
		setItems((items) =>
			items.map((item) =>
				item.id === itemId ? { ...item, packed: !item.packed } : item,
			),
		);
	};

	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => handleUpdateItem(item.id)}
				checked={`${item.packed ? ' checked' : ''}`}
			/>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {item.description}
			</span>
			<button
				onClick={() =>
					setItems((items) => items.filter((i) => i.id !== item.id))
				}
			>
				❌
			</button>
		</li>
	);
}

export default ListItem;
