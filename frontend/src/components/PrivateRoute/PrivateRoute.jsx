import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginForm } from '../../redux/formSlice.js';
import Spinner from '../Spinner/Spinner.jsx';

const PrivateRoute = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const { user, status } = useSelector((state) => state.user);
    const isAuthenticated = !!user;

    useEffect(() => {
        if (status === "succeeded" && !isAuthenticated) {
            dispatch(openLoginForm());
            localStorage.setItem("redirectTo", location.pathname);
            navigate("/");
        }
    }, [isAuthenticated, status, dispatch, navigate, location.pathname]);

    if (status === "loading") {
        return <div><Spinner /></div>;
    }

    return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
