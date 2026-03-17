import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function CreateCabinForm({ cabin = {}, onCloseModal }) {
	const { id: cabinId, ...editValues } = cabin;
	const isEditing = Boolean(cabinId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditing ? editValues : {},
	});
	const { errors } = formState;

	const { isProcessing, createEditCabin } = useCreateCabin(isEditing);

	function onSubmit(data) {
		const image =
			typeof data?.image === 'string'
				? data.image
				: data.image instanceof FileList
					? data.image[0]
					: '';
		createEditCabin(
			isEditing
				? { cabinData: { ...data, image }, id: cabinId }
				: { ...data, image },
			{
				onSuccess: (data) => {
					// console.log(data); - may return the response
					reset();
					onCloseModal?.();
				},
			},
		);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label="Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isProcessing}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum Capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isProcessing}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capcity should be atleast 1.',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular Price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isProcessing}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capcity should be atleast 1.',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isProcessing}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							Number(value) <=
								Number(getValues('regularPrice')) ||
							'Discount should be lower than Regular Price',
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for Website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isProcessing}
					defaultValue=""
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin Photo" error={false}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isProcessing}
					{...register('image', {
						required: isEditing ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<StyledFormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					disabled={isProcessing}
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isProcessing}>
					{isEditing
						? 'Update Cabin'
						: isProcessing
							? 'Adding Cabin...'
							: 'Add Cabin'}
				</Button>
			</StyledFormRow>
		</Form>
	);
}

export default CreateCabinForm;
