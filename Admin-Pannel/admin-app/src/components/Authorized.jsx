import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux';

const Authorized = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    let content
    if(user.role === 'Admin'){
        content = (
            <Outlet/>
        )
    } else {
        content = (
            <Navigate to='/admin/not-authorized' state={{from: location}} replace />
        )
    }

  return content;


}

export default Authorized
