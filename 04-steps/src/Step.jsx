function Step({ step, number }) {
	return <div className={`${step >= number ? 'active' : ''}`}>{number}</div>;
}

export default Step;
