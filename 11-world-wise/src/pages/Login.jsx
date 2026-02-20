import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Message from '../components/Message';

export default function Login() {
	const { login, isAuthenticated, authError } = useAuth();

	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');
	const navigate = useNavigate();

	// if user is already authenticated, navigate to /app
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/app', { replace: true });
		}
	}, [isAuthenticated, navigate]);

	function handleLogin(e) {
		e.preventDefault();
		if (email && password) login(email, password);
	}

	return (
		<main className={styles.login}>
			<PageNav />

			{authError && <Message message={authError} />}

			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}
