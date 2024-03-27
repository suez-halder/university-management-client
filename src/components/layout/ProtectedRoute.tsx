import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute = ({
    children,
}: {
    children: ReactNode | null | undefined;
}) => {
    const token = useAppSelector(selectCurrentToken);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
