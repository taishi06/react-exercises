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
	const [isOpen, setIsOpen] = useState(true);

	function handlePrevious() {
		if (step === 1) {
			alert('Step is already 1.');
			return;
		}
		/*
		NOTE: callback function setting of state is okay if you have initial value.
		But you may also set state's value immediately if initial state value is somewhat empty(null, empty string)
		*/
		setStep((s) => s - 1);
	}

	function handleNext() {
		const numMessages = messages.length;
		if (step === numMessages) {
			alert(`Step is already ${numMessages}.`);
			return;
		}
		setStep((s) => s + 1);
	}

	const btnStyles = { backgroundColor: '#7950F2', color: '#fff' };

	return (
		<>
			<Button class="close" onClick={() => setIsOpen((io) => !io)}>
				&times;
			</Button>
			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<Step step={step} number={1} />
						<Step step={step} number={2} />
						<Step step={step} number={3} />
					</div>

					<Message step={step} messages={messages} />

					<div className="buttons">
						<Button onClick={handlePrevious} btnStyles={btnStyles}>
							Previous
						</Button>
						<Button onClick={handleNext} btnStyles={btnStyles}>
							Next
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
