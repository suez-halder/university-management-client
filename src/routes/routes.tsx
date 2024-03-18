import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },

    {
        path: "/admin",
        element: <App />,
        children: adminRoutes,
    },
    // {
    //     path: "/faculty",
    //     element: <App />,
    //     children: adminRoutes,
    // },
    // {
    //     path: "/student",
    //     element: <App />,
    //     children: adminRoutes,
    // },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
