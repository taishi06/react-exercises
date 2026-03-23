import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	// 1. load the authenticated user
	const { isLoading, isAuthenticated } = useUser();
	const navigate = useNavigate();

	// 2. if there is no auth user, redirect to login
	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate('/login');
	}, [isAuthenticated, isLoading, navigate]);

	// 3. while loading, show spinner
	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	// 4. if there is a auth user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
