import React from 'react';
import { Routes, Route  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './components/AdminLayout';
import Dashboard from './views/Dashboard';
import Users from './views/users/Users';
import CreateUser from './views/users/createUser';
import Login from './views/auth/Login';
import NotAuthorized from './views/other/401';
import NotFound from './views/other/404';
import Products from './views/products/Products';
import CreateProduct from './views/products/createProduct';
import EditProduct from './views/products/editProduct';
import EditUser from './views/users/editUser';
import DeleteUser from './views/Dashboard';


import Authorized from './components/Authorized';
import Authenticated from './components/Authenticated';


function App() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Login />}/>
            
            <Route element={<Authenticated/>}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />

                    <Route element={<Authorized/>}>
                        <Route path="users">
                            <Route index element={<Users />} />
                            <Route path='new' element={<CreateUser />} />
                            <Route path='edit/:id' element={<EditUser />} />
                            <Route path='delete/:id' element={<DeleteUser />} />
                        </Route>

                        <Route path="products">
                            <Route index element={<Products/>} />
                            <Route path='new' element={<CreateProduct />} />
                            <Route path='edit/:id' element={<EditProduct/>} />
                        </Route>

                        {/* <Route path="orders">
                            <Route index element={<Orders/>} />
                            <Route path='new' element={<CreateProduct />} />
                            <Route path='edit/:id' element={<EditProduct/>} />
                        </Route> */}

                       

                    
                    </Route>

                </Route>
            </Route>
            
            <Route path="*" element={<NotFound/>} />
        </Routes>   
        <ToastContainer/>
        </>
    );
}

export default App;
