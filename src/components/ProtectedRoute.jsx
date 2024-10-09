import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({isAuth}) {
 const auth = isAuth;
 if (!auth) {
   return <Navigate to="/" />;
 }
 return <Outlet/>;
}
