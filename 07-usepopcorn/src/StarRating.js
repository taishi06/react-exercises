import { useState } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const starContainerStyle = {
	display: 'flex',
};

// Better use TypeScript, this is just to show PropTypes
StarRating.propTypes = {
	maxRating: PropTypes.number,
	defaultRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	messages: PropTypes.array,
	onSetRating: PropTypes.func,
};

function StarRating({
	maxRating = 5,
	defaultRating = 0,
	color = '#fcc419',
	size = 48,
	className = '',
	messages = [],
	onSetRating,
}) {
	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(0);

	const handleRating = (rate) => {
		setRating(rate);
		if (typeof onSetRating === 'function') {
			onSetRating(rate);
		}
	};

	const textStyle = {
		lineHeight: '1',
		margin: '0',
		color,
		fontSize: `${size / 1.5}px`,
	};

	return (
		<div style={containerStyle} className={className}>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						onRate={() => handleRating(i + 1)}
						key={i}
						isFull={
							tempRating ? i + 1 <= tempRating : i + 1 <= rating
						}
						onHoverIn={() => setTempRating(i + 1)}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={textStyle}>
				{messages.length === maxRating
					? messages[tempRating ? tempRating - 1 : rating - 1]
					: tempRating
						? tempRating
						: rating
							? rating
							: ''}
			</p>
		</div>
	);
}

export default StarRating;
