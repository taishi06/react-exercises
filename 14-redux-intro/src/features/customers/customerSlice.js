import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		createCustomer: {
			prepare(fullName, nationalID) {
				return {
					payload: {
						fullName,
						nationalID,
						createdAt: new Date().toISOString(),
					},
				};
			},
			reducer(state, action) {
				state.fullName = action.payload.fullName;
				state.nationalID = action.payload.nationalID;
				state.createdAt = action.payload.createdAt;
			},
		},
		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// // customer actions
// const CUSTOMER_CREATE = 'customer/createCustomer';
// const CUSTOMER_UPDATE_NAME = 'customer/updateName';

// export default function customerReducer(state = initialStateCustomer, action) {
// 	switch (action.type) {
// 		case CUSTOMER_CREATE:
// 			return {
// 				...state,
// 				fullName: action.payload.fullName,
// 				nationalID: action.payload.nationalID,
// 				createdAt: action.payload.createdAt,
// 			};
// 		case CUSTOMER_UPDATE_NAME:
// 			return {
// 				...state,
// 				fullName: action.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }

// export function createCustomer(fullName, nationalID) {
// 	return {
// 		type: CUSTOMER_CREATE,
// 		payload: { fullName, nationalID, createdAt: new Date().toISOString() },
// 	};
// }

// export function updateName(fullName) {
// 	return {
// 		type: CUSTOMER_UPDATE_NAME,
// 		payload: fullName,
// 	};
// }
