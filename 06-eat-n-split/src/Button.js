function Button({ handleOnClick, children }) {
	return (
		<button
			onClick={() => {
				if (handleOnClick) {
					handleOnClick();
				}
			}}
			className="button"
		>
			{children}
		</button>
	);
}

export default Button;
