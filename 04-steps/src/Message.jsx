function Message({ step, messages }) {
	return (
		<p className="message">
			Step {step}: {messages[step - 1]}
		</p>
	);
}

export default Message;
