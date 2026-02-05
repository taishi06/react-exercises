import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import './index.css';

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

// React v18 onwards
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

/*
// React before v18
ReactDOM.render(<App />, document.getElementById('root'));
*/
