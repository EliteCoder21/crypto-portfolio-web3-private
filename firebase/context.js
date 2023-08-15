import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
    signOut,
} from 'firebase/auth';
import firebase_app from './config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // setUser(null);  // No need to set user to null since the onAuthStateChanged will handle it
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleSignOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
