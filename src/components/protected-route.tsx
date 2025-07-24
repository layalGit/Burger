import { getIsAuthChecked, getUser } from '../services/slices/user-slice.tsx';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@utils/hooks.tsx';
import React from 'react';

type Component = React.JSX.Element;

type ProtectedProps = {
	onlyUnAuth: boolean;
	component: Component;
};

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
	const isAuthChecked = useAppSelector(getIsAuthChecked);
	const user = useAppSelector(getUser);
	const location = useLocation();
	if (!isAuthChecked) {
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from.pathname} />;
	}

	return component;
};

export const OnlyAuth = ({ component }: Pick<ProtectedProps, 'component'>) => (
	<Protected onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({
	component,
}: Pick<ProtectedProps, 'component'>) => (
	<Protected onlyUnAuth={true} component={component} />
);
