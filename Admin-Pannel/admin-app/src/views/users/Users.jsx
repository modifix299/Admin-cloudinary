import { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../features/user/userSlice'

const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { users, isLoading, isError, message } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
    
        dispatch(getUsers());   
       
    }, [navigate, dispatch, isError, message])   

    
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Users</h1>
                <Link to="new" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i className="fas fa-plus fa-sm "></i> Create New User</Link>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Users Table</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>                                    
                            {!isLoading && users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link to={`/admin/users/edit/${user._id}`} className='btn btn-md btn-warning'>Edit</Link>
                                        <Link to={`/admin/users/delete/${user._id}`} className='btn btn-md btn-warning'>Delete</Link>
                                    </td>
                                </tr>
                            ))}                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default Users