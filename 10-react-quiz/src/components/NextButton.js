function NextButton({ index, numQuestions, answer, dispatch }) {
	if (answer === null) return;

	const isNext = index < numQuestions - 1;
	const dispatchType = isNext ? 'nextQuestion' : 'finish';
	const buttonText = isNext ? 'Next' : 'Finish';
	return (
		<button
			className="btn btn-ui"
			onClick={() => dispatch({ type: dispatchType })}
		>
			{buttonText}
		</button>
	);
}

export default NextButton;
