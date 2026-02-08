import { useState } from 'react';
import Button from './Button';

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState('');
	const [userExpense, setUserExpense] = useState('');
	const [payor, setPayor] = useState('user');

	const paidByFriend = bill ? bill - userExpense : '';

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!bill || !userExpense) {
			return;
		}

		onSplitBill(payor === 'user' ? paidByFriend : -paidByFriend);
	};

	const handleUserExpense = (value) => {
		setUserExpense(value > bill ? userExpense : value);
	};

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💲 Bill value</label>
			<input
				type="text"
				placeholder="0.00"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>🧑‍🦱 Your expense</label>
			<input
				type="text"
				placeholder="0.00"
				value={userExpense}
				onChange={(e) => handleUserExpense(Number(e.target.value))}
			/>

			<label>👯 {selectedFriend.name}'s expense</label>
			<input type="text" value={paidByFriend} disabled />

			<label>🤑 Who is paying the bill</label>
			<select value={payor} onChange={(e) => setPayor(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">Friend</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}

export default FormSplitBill;
