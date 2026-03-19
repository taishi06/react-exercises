import { useBookings } from './useBookings';
import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function BookingTable() {
	const { isLoading, bookings, count } = useBookings();

	// const filterByStatus = searchParams.get('status') || 'all';

	// let filteredBookings = isLoading ? [] : bookings;
	// if (filterByStatus !== 'all')
	// 	filteredBookings = filteredBookings.filter(
	// 		(booking) => booking.status === filterByStatus,
	// 	);

	// const sortBy = searchParams.get('sortBy') || '';
	// const [sortField, sortDir] = sortBy.split('-');
	// const modifier = sortDir === 'asc' ? 1 : -1;
	// // sort field asc
	// const sortedBookings = filteredBookings.sort(
	// 	(a, b) => (a[sortField] - b[sortField]) * modifier,
	// );

	if (isLoading) {
		return <Spinner />;
	}

	if (!bookings) {
		return <Empty resource="bookings" />;
	}

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking} />
					)}
				/>

				<Table.Footer>
					<Pagination count={count} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;
