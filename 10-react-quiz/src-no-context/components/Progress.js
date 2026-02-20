function Progress({
	index,
	numQuestions,
	points,
	totalPoints,
	answer,
	highscore,
}) {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			/>
			<p>
				Question{' '}
				<strong>
					{index + 1} / {numQuestions}
				</strong>
			</p>
			<p>
				{points} / {totalPoints} points
			</p>
			{highscore > 0 && (
				<p>
					Highscore: <strong>{highscore}</strong>
				</p>
			)}
		</header>
	);
}

export default Progress;
