import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import ManageCategory from './Pages/ManageCategory/ManageCategory.jsx'
import ManageUsers from './Pages/ManageUsers/ManageUsers.jsx'
import ManageItems from './Pages/ManageItems/ManageItems.jsx'
import Explore from "./Pages/Explore/Explore.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login.jsx";
import OrderHistory from "./Pages/OrderHistory/OrderHistory.jsx";
import { AppContext } from "./Context/AppContext.jsx";
import ProtectedRoute from "./Route/ProtectedRoute.jsx";
import LoginRoute from "./Route/LoginRoute.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

const App = () => {

    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/login" && <Menubar />}
            <Toaster />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                {/* Admin only routes */}
                <Route path="/category" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ROLE_ADMIN']} />} />
                {/* User only routes */}

                <Route path="/login" element={<LoginRoute element={<Login />} />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;