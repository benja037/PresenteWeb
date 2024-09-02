import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
// Importar SecureStore solo si no estamos en una plataforma web
import * as SecureStore from 'expo-secure-store';

interface Profile {
    id: string;
    firstname: string;
    lastname: string;
    // Agrega otros campos del perfil aquí
} 

interface AuthProps {
    profiles?: Profile[];
    selectedProfile?: Profile | null;
    authState?: { token:string | null; authenticated: boolean | null; firstname: string | null; user_type: string | null};
    onRegister?: (password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string,gender:string,phone_number:string,document_type:string,document_number:string) => Promise<any>;
    onLogin?: (email:string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
    fetchProfiles?: () => Promise<any>;
    selectProfile?: (profile: Profile | null) => void;
};

const TOKEN_KEY = 'tikin';
const REFRESH_TOKEN_KEY = 'tikin_refresh';
const USER_TYPE_KEY = 'user_type';
const FIRSTNAME_KEY = 'f_name';
const SELECTED_PROFILE_KEY = 'selected_profile';
export const API_URL = 'https://catolica-backend.vercel.app/';
const AuthContext = createContext<AuthProps>({});
export const useAuth = () => { 
    return useContext(AuthContext);
};

const isWeb = typeof window !== 'undefined'; // Verifica si estás en una plataforma web

export const AuthProvider = ({children}: any) =>{
    const [authState,setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        firstname: string | null;
        user_type: string | null;
    }>({
        token: null,
        authenticated: null,
        firstname: null,
        user_type: null
    });
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    
    useEffect(() => {
        const loadToken = async () => {
            const token = isWeb ? sessionStorage.getItem(TOKEN_KEY) : await SecureStore.getItemAsync(TOKEN_KEY);
            const firstname = isWeb ? sessionStorage.getItem(FIRSTNAME_KEY) : await SecureStore.getItemAsync(FIRSTNAME_KEY);
            const user_type = isWeb ? sessionStorage.getItem(USER_TYPE_KEY) : await SecureStore.getItemAsync(USER_TYPE_KEY);
            const storedProfile = isWeb ? sessionStorage.getItem(SELECTED_PROFILE_KEY) : await SecureStore.getItemAsync(SELECTED_PROFILE_KEY);
            
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                    firstname: firstname,
                    user_type: user_type
                });
                if (storedProfile) {
                    setSelectedProfile(JSON.parse(storedProfile));
                }
            }
        }
        loadToken();
    }, []);

    useEffect(() => {
        let isRefreshing = false;
        let refreshQueue: (() => void)[] = [];
    
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
    
                if (error.response && error.response.status === 403 && !originalRequest._retry && error.response.data.detail === "Given token not valid for any token type") {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            const refreshToken = isWeb ? sessionStorage.getItem(REFRESH_TOKEN_KEY) : await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
                            const response = await axios.post('https://catolica-backend.vercel.app/auth/jwt/refresh/', { refresh: refreshToken });
                            const newAccessToken = response.data.access;
                            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                            if (isWeb) {
                                sessionStorage.setItem(TOKEN_KEY, newAccessToken);
                            } else {
                                await SecureStore.setItemAsync(TOKEN_KEY, newAccessToken);
                            }
                            setAuthState(prevState => ({
                                ...prevState,
                                token: newAccessToken
                            }));
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return axios(originalRequest);
                        } catch (refreshError) {
                            logout();
                            return Promise.reject(refreshError);
                        } finally {
                            isRefreshing = false;
                        }
                    } else {
                        return new Promise((resolve) => {
                            refreshQueue.push(() => {
                                resolve(axios(originalRequest));
                            });
                        });
                    }
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const fetchProfiles = async () => {
        try {
            const result = await axios.get(`https://catolica-backend.vercel.app/apiv1/students/get-user-students/`);
            setProfiles(result.data);
            return result;
        } catch (e) {
            return { error: true, msg: (e as any).response.data };
        }
      };
    
    const selectProfile = async (profile: Profile | null) => {
        setSelectedProfile(profile);
        if(profile){
            if (isWeb) {
                sessionStorage.setItem(SELECTED_PROFILE_KEY, JSON.stringify(profile));
            } else {
                await SecureStore.setItemAsync(SELECTED_PROFILE_KEY, JSON.stringify(profile));
            }
        } else {
            if (isWeb) {
                sessionStorage.removeItem(SELECTED_PROFILE_KEY);
            } else {
                await SecureStore.deleteItemAsync(SELECTED_PROFILE_KEY);
            }
        }
      };

    const register = async(password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string,gender:string,phone_number:string,document_type:string,document_number:string) => {
        try{
            const result = await axios.post('https://catolica-backend.vercel.app/auth/signup/', { password:password,email:email,date_of_birth:date_of_birth,user_type:user_type,firstname:firstname,lastname:lastname,gender:gender,phone_number:phone_number,document_type:document_type,document_number:document_number}); 
            return result;     
        }   catch (e) {
            return { error: true, msg: (e as any).response.data};
        }
    };

    const login = async(email:string,password:string) => {
        try{
            const result = await axios.post('https://catolica-backend.vercel.app/auth/login/', {email:email, password:password});            

            setAuthState({
                token: result.data.tokens.access,
                authenticated: true,
                firstname: result.data.firstname,
                user_type: result.data.user_type
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.tokens.access}`;
            
            if (isWeb) {
                sessionStorage.setItem(TOKEN_KEY, result.data.tokens.access);
                sessionStorage.setItem(REFRESH_TOKEN_KEY, result.data.tokens.refresh);
                sessionStorage.setItem(FIRSTNAME_KEY, result.data.firstname);
                sessionStorage.setItem(USER_TYPE_KEY, result.data.user_type);
            } else {
                await SecureStore.setItemAsync(TOKEN_KEY, result.data.tokens.access);
                await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, result.data.tokens.refresh);
                await SecureStore.setItemAsync(FIRSTNAME_KEY, result.data.firstname);
                await SecureStore.setItemAsync(USER_TYPE_KEY, result.data.user_type);
            }
        
            return result;

        }   catch (e) {
            return { error: true, msg: (e as any).response.data.msg};
        }
    };

    const logout = async () => {
        if (isWeb) {
            sessionStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(USER_TYPE_KEY);
            sessionStorage.removeItem(FIRSTNAME_KEY);
            sessionStorage.removeItem(SELECTED_PROFILE_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_TYPE_KEY);
            await SecureStore.deleteItemAsync(FIRSTNAME_KEY);
            await SecureStore.deleteItemAsync(SELECTED_PROFILE_KEY);
        }

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
            firstname: null,
            user_type: null,
        });
        setSelectedProfile(null);
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        profiles,
        selectedProfile,
        fetchProfiles,
        selectProfile,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
