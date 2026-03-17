import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

// function AddEditCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>
// 				{isOpenModal ? 'Close ' : ''}Add New Cabin
// 			</Button>

// 			{isOpenModal && (
// 				// Compound Component
// 				<Modal onClose={() => setIsOpenModal((show) => !show)}>
// 					<CreateCabinForm
// 						onCloseModal={() => setIsOpenModal((show) => !show)}
// 					/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

function AddEditCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<Button>Add new Cabin</Button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}

export default AddEditCabin;
