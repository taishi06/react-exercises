import { useState } from 'react';

function Form({ setItems }) {
	// array from 1 to 20
	const qtyOpts = Array.from({ length: 20 }, (_, i) => i + 1);

	// controlled elements
	const initialQuantity = 1;
	const initialDescription = '';
	const [quantity, setQuantity] = useState(initialQuantity);
	const [description, setDescription] = useState(initialDescription);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!description) return;

		const newItem = {
			id: Date.now(),
			description,
			quantity,
			packed: false,
		};

		setItems((items) => [...items, newItem]);

		setQuantity(initialQuantity);
		setDescription(initialDescription);
	};

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>

			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{qtyOpts.map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				id="item-input"
				type="text"
				placeholder="Item... "
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

export default Form;
