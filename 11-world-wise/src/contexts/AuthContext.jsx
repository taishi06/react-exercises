import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
	authError: '',
};

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case 'logout':
			return initialState;
		case 'error':
			return {
				...state,
				authError: action.payload,
			};
		default:
			throw new Error('Unknown Auth Action Type.');
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated, authError }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'login', payload: FAKE_USER });
		} else {
			dispatch({ type: 'error', payload: 'Credentials are not valid.' });
		}
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, authError, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('AuthContext was used outside of the AuthProvider.');
	}

	return context;
}

export { AuthProvider, useAuth };
