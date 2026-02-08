import Button from './Button';

function Friend({ friend, selectedFriend, onSelectFriend }) {
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li className={`${isSelected ? 'selected' : ''}`}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance === 0 && <p>You and your friend are even.</p>}
			<Button handleOnClick={() => onSelectFriend(friend)}>
				{isSelected ? 'Close' : 'Select'}
			</Button>
		</li>
	);
}

export default Friend;
