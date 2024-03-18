import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/admin",
        element: <App />,
        children: [
            {
                index: true, //! by default if we hit admin route it will take us to dashboard
                element: <AdminDashboard />,
            },
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "create-admin",
                element: <CreateAdmin />,
            },
            {
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                path: "create-student",
                element: <CreateStudent />,
            },
        ],
    },

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
