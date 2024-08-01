import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const LocalAuthToken = getCookie('authTokenMovieApp');

const initialState = {
    isloading: false,
    userData: null,
    authTokenMovieApp: LocalAuthToken ? LocalAuthToken : null
};

// Only access localStorage if the window object is defined
if (typeof window !== 'undefined') {
    const storedUserData = localStorage.getItem('userDataMovieApp');
    if (storedUserData) {
        initialState.userData = JSON.parse(storedUserData);
    }
}

const authentication = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        signInRequest: (state) => {
            state.isloading = true;
        },
        signInSuccess: (state, action) => {  
                const authToken = action.payload.meta.token;
                const userData = JSON.stringify(action.payload);
                setCookie('userData', userData);
                setCookie('tokenData', authToken);
                localStorage.setItem('tokenData', userData);
                localStorage.setItem('isLogin', 'true');
        
            state.isloading = false;
            state.userData = action.payload;
        },
        signInFailure: (state) => {
            state.isloading = false;
        },
        forgotpassRequest: (state) => {
            state.isloading = true;
        },
        forgotpassSuccess: (state) => {
            state.isloading = false;
        },
        forgotpassFailure: (state) => {
            state.isloading = false;
        },
        resetPassRequest: (state) => {
            state.isloading = true;
        },
        resetPassSuccess: (state) => {
            state.isloading = false;
        },
        resetPassFailure: (state) => {
            state.isloading = false;
        },
        logOutUserRequest: (state) => {
            state.isloading = true;
        },
        logOutUserSuccess: (state) => {
            deleteCookie('tokenData', { path: '/' });
            localStorage.removeItem('tokenData');
            localStorage.removeItem('isLogin');

            state.isloading = false;
            state.userData = null;
        },
        logOutUserFailure: (state) => {
            state.isloading = false;
        }
    }
});

export const {
    signInRequest,
    signInSuccess,
    signInFailure,
    forgotpassRequest,
    forgotpassSuccess,
    forgotpassFailure,
    resetPassRequest,
    resetPassSuccess,
    resetPassFailure,
    logOutUserRequest,
    logOutUserSuccess,
    logOutUserFailure
} = authentication.actions;

export default authentication.reducer;
