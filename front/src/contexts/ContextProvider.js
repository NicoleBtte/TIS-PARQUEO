import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
	currentUser: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
	rol: null,
	setRol: () => {}
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	console.log('Hola desde el constext');
	const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); //localStorage.getItem('ACCESS_TOKEN')
	const [rol, _setRol] = useState(localStorage.getItem('ROL'));
	console.log(rol);


	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem('ACCESS_TOKEN', token);
		} else {
			localStorage.removeItem('ACCESS_TOKEN');
		}
	};

	const setRol = (rol) => {
		_setRol(rol);
		if (rol) {
			localStorage.setItem('ROL', rol);
		} else {
			localStorage.removeItem('ROL');
		}
	};

	return (
		<StateContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				rol,
				setRol
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
