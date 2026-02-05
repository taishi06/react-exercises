function Button(props) {
	return (
		<button
			onClick={props.onClick}
			style={{ backgroundColor: '#7950F2', color: '#fff' }}
		>
			{props.btnText}
		</button>
	);
}

export default Button;
