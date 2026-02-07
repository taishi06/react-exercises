function Stats({ items }) {
	if (!items.length) {
		return (
			<p className="stats">
				<em>Start adding items to your packing list. 🚀</em>
			</p>
		);
	}

	const packedtems = items.reduce(
		(acc, cur) => acc + (cur.packed ? 1 : 0),
		0,
	);

	const packedRatio = Math.round((packedtems / items.length) * 100);

	return (
		<footer className="stats">
			<em>
				{packedRatio === 100
					? 'You got everything! Ready to go!'
					: `💼 You have ${items.length} items on your list, and you already packed ${packedtems} (${packedRatio}%)`}
			</em>
		</footer>
	);
}

export default Stats;
