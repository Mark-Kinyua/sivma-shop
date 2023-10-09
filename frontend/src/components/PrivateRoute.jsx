import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    // Get user info
    const { userInfo } = useSelector(state => state.login);


    return userInfo ? <Outlet /> : <Navigate to="/login" replace />

}

export default PrivateRoute