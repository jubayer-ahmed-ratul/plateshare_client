import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const authInfo={}
    return (
        <div>
            <AuthContext value={{authInfo}}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;