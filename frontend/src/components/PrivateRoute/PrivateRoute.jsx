import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginForm } from '../../redux/formSlice.js';

const PrivateRoute = () => {

    const isAuthenticated = !!useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(openLoginForm()); // Open the login form 
            // Save the current location to localStorage or state
            localStorage.setItem('redirectTo', location.pathname);
            navigate("/")
        }
    }, [isAuthenticated, dispatch, navigate]);

    return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
