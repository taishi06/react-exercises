function Button(props) {
	return (
		<button
			onClick={props.onClick}
			className={props.class ? props.class : ''}
			style={'btnStyles' in props ? props.btnStyles : {}}
		>
			{props.children}
		</button>
	);
}

export default Button;
