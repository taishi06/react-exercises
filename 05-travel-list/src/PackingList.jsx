import ListItem from './ListItem';

function PackingList(props) {
	return (
		<div className="list">
			<ul>
				{props.items.map((item) => (
					<ListItem item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

export default PackingList;
