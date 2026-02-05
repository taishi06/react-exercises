import Pizza from './Pizza';
import pizzaData from './data';

export default function Menu() {
	return (
		<main className="menu">
			<h2>Our menu</h2>

			{pizzaData.length > 0 ? (
				<>
					<p>
						Authentic Italian cuisine. {pizzaData.length} creative
						dishes to choose from. All from our stove oven, all
						organic, all delicious
					</p>
					<ul className="pizzas">
						{pizzaData.map((pizza) => (
							<Pizza key={pizza.name} pizzaObj={pizza} />
						))}
					</ul>
				</>
			) : (
				<p>
					Sorry, we're currently working on our menu. Please come back
					later.
				</p>
			)}
		</main>
	);
}
