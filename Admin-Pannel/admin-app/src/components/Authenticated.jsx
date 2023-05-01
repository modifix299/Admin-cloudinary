import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { toast } from 'react-toastify';


const Authenticated = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if(!user){
    //         toast.error('Please Login!!!');
    //     }
    // }, [location, user])

    let content
    if(user){
        content = (
            <Outlet/>
        )
    } else {
        content = (
            <Navigate to='/' state={{from: location}} replace />
        )
    }

  return content;

  
}

export default Authenticated