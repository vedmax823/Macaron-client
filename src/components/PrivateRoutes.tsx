
import { Outlet } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import apiPublic from '../http/apiPublic';
import { jwtDecode } from 'jwt-decode';

const PrivateRoutes = () => {
    const [attempt, setAttempt] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    useEffect(() => {
        if (!user && attempt === 1){
           const refreshUser = async () => {
                try {
                    setIsLoading(true);
                    const response = await apiPublic.post('/api/auth/refresh-token');
                    const {accessToken} = response.data;
                    const newUser : UserJwt = jwtDecode(accessToken);
                    setToken(accessToken);
                    setUser(newUser);
                    setAttempt(() => 2);
                }
                catch(err) {
                    console.log(err)
                }
                finally{
                    setIsLoading(false);
                }
           }
           refreshUser();
        }
        else{
            setIsLoading(false);
        }
    }, [user, setToken, setUser, attempt])

    return (isLoading || user)
        ? <Outlet />
        : <LoginPage />
    
};

export default PrivateRoutes;