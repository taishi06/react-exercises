import { useState } from 'react';
import Step from './Step';
import Message from './Message';
import Button from './Button';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑',
];

function App() {
	const [step, setStep] = useState(1);

	function handlePrevious() {
		if (step === 1) {
			alert('Step is already 1.');
			return;
		}
		setStep(step - 1);
	}

	function handleNext() {
		const numMessages = messages.length;
		if (step === numMessages) {
			alert(`Step is already ${numMessages}.`);
			return;
		}
		setStep(step + 1);
	}

	return (
		<div className="steps">
			<div className="numbers">
				<Step step={step} number={1} />
				<Step step={step} number={2} />
				<Step step={step} number={3} />
			</div>

			<Message step={step} messages={messages} />

			<div className="buttons">
				<Button onClick={handlePrevious} btnText="Previous" />
				<Button onClick={handleNext} btnText="Next" />
			</div>
		</div>
	);
}

export default App;
