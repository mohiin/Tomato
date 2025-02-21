import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginForm } from '../../redux/formSlice.js';

const PrivateRoute = () => {
    const isAuthenticated = window.localStorage.getItem("user"); // Check if the user is authenticated
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location


    // Get the login form visibility state
    const showLoginForm = useSelector((state) => state.showForm.showLoginForm);

    // Show login form when unauthenticated
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(openLoginForm()); // Open the login form 
            // Save the current location to localStorage or state
            localStorage.setItem('redirectTo', location.pathname);
            navigate("/")
        }
    }, [isAuthenticated, dispatch, navigate]);

    // If authenticated, render the nested routes via Outlet
    if (isAuthenticated) {
        return <Outlet />;
    }
    showLoginForm ? openLoginForm : null;
};

export default PrivateRoute;
