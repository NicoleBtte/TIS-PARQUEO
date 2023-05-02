import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
	currentUser: null,
	token: null,
	rol: null,
	iduser: null,
	setUser: () => {},
	setToken: () => {},
	setRol: () => {},
	setID: () => {}
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	console.log('Hola desde el constext');
	const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); //localStorage.getItem('ACCESS_TOKEN')
	const [rol, _setRol] = useState(localStorage.getItem('ROL'));
	const [iduser, _setID] = useState(localStorage.getItem('ID_USER'));

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

	const setID = (id) => {
		_setID(id);
		if (id) {
			localStorage.setItem('ID_USER', id);
		} else {
			localStorage.removeItem('ID_USER');
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
				setRol,
				iduser,
				setID
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
