import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
	const {
		isLoading,
		data: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	const { getValues, formState } = useForm({
		defaultValues: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		},
	});
	const { errors } = formState;

	const { isUpdating, updateSetting } = useUpdateSettings();

	function handleUpdate(e, settingField) {
		const { value } = e.target;

		if (!value || value === getValues(settingField)) return;

		updateSetting({ [settingField]: value });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow
				label="Minimum nights/booking"
				error={errors?.minBookingLength?.message}
			>
				<Input
					disabled={isUpdating}
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					disabled={isUpdating}
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					disabled={isUpdating}
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					disabled={isUpdating}
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
