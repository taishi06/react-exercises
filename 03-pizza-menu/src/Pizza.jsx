export default function Pizza({ pizzaObj }) {
	const { name, ingredients, price, photoName, soldOut } = pizzaObj;

	return (
		<li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
			<img src={photoName} alt={name} />
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{soldOut ? 'SOLD OUT' : price}</span>
			</div>
		</li>
	);
}
