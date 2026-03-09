import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const LoginRoute = ({ element }) => {

    const { auth } = useContext(AppContext);

    if (auth.token) {
        return <Navigate to="/dashboard" replace />
    }

    return element;
};

export default LoginRoute;