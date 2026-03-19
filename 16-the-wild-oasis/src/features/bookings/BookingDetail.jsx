import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import toast from 'react-hot-toast';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { isLoading, booking } = useBooking();
	const { isCheckingOut, checkout } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	const navigate = useNavigate();
	const moveBack = useMoveBack();

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (!booking) {
		toast.error('The booking you are trying to view do not exist.');
		navigate('/bookings');
	}

	const { id: bookingId, status } = booking;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace('-', ' ')}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Modal>
				<ButtonGroup>
					{status === 'unconfirmed' && (
						<Button
							onClick={() => navigate(`/checkin/${bookingId}`)}
						>
							Check in
						</Button>
					)}
					{status === 'checked-in' && (
						<Button
							onClick={() => checkout(bookingId)}
							disabled={isCheckingOut}
						>
							Check out
						</Button>
					)}

					<Modal.Open opens="delete">
						<Button variation="danger">Delete</Button>
					</Modal.Open>

					<Button variation="secondary" onClick={moveBack}>
						Back
					</Button>
				</ButtonGroup>

				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName="Booking"
						onConfirm={() =>
							deleteBooking(bookingId, {
								onSettled: () => navigate(-1),
							})
						}
						disabled={isDeleting}
					/>
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
