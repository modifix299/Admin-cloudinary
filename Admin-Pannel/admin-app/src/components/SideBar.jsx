import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../img/modifix.png';
import { useSelector } from 'react-redux';

const SideBar = () => {    
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [toggle, setToggle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const isAdmin = (user.role === "Admin" ? true : false);

    const onToggle = () => {        
        if(toggle === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"){
            setToggle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        } else {
            setToggle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    }

    const userPaths = ['/admin/users','/admin/users/new','/admin/users/update'];
    const productPaths = ['/admin/products','/admin/products/new','/admin/products/update'];
    const orderPaths = ['/admin/orders','/admin/orders/new','/admin/orders/update'];

    return (
        <>
        <ul className={toggle} id="accordionSidebar">


            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
                <div className="sidebar-brand-icon">
                    <img className='logo-navbar' src={logo} alt="Logo" />
                </div>
                <div className="sidebar-brand-text mx-3">MODIFIX</div>
            </Link>

            <hr className="sidebar-divider my-0"/>

            <li className={`nav-item ${location.pathname === '/admin'? 'active': ''}`}>
                <Link className="nav-link" to="/admin">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            {isAdmin && <>
            <div className="sidebar-heading">
                User Management
            </div>

            <li className={`nav-item ${userPaths.includes(location.pathname) ? 'active': ''}`}>
                <Link className="nav-link" to="users">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Users</span></Link>
            </li>

            <hr className="sidebar-divider"/>
            </>}

            <div className="sidebar-heading">
                Product Management
            </div>

            <li className={`nav-item ${productPaths.includes(location.pathname) ? 'active': ''}`}>
                <Link className="nav-link" to="/admin/products">
                    <i className="fas fa-fw fa-boxes"></i>
                    <span>Products</span></Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block"/>

            <div className="sidebar-heading">
                Order Management
            </div>

            <li className={`nav-item ${orderPaths.includes(location.pathname) ? 'active': ''}`}>
                <Link className="nav-link" to="/admin/orders">
                    <i className="fas fa-fw fa-box"></i>
                    <span>Order</span></Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block"/>

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={onToggle}></button>
            </div>
            
        </ul>
        </>
    )
}

export default SideBar