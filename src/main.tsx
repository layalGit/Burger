import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './/services/store.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/app/app.tsx';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
