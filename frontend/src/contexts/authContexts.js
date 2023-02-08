import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
    token: '',
    setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || '');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
        }
    }, [token]);

    useEffect(() => {
        if (user) 
            localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const value = useMemo(() => ({ token, setToken, setUser }), [token, setToken, setUser]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;