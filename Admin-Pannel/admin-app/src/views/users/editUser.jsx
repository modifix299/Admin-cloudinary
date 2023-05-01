import { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUser, updateUser, reset } from '../../features/user/userSlice'
import { toast } from 'react-toastify';

const EditUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
  

    const {user, isUpdated , isError, message } = useSelector(
        (state) => state.user
    )


    function onFormChange(key, value) {
        setFormData({ ...formData, [key]: value })
    }

    function onFormSumbit(e) {
        e.preventDefault();

        let submitFormData = { ...formData, 'id': id}
        console.log(submitFormData);
        
        dispatch(updateUser(submitFormData));
    }  
 
    useEffect(() => {
        if(id){
            dispatch(getUser(id));
        }

        if (isError) {
            toast.error(message)
        }
    
        if (isUpdated) {
            toast.success('New User Updated Successfully.')
            dispatch(reset());
            navigate('/admin/users')
        }

        dispatch(reset());
    }, [navigate, dispatch,id, isUpdated, isError, message])

    useEffect(() => {
        if(user){
            setFormData(user);
        }
    }, [user])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
                <Link to="/admin/users" relative='pa' className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm">
                    <i className="fas fa-arrow-left fa-sm "></i> Back 
                </Link>
            </div>

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                                <form className="user" onSubmit={onFormSumbit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control" id="exampleFirstName"
                                                placeholder="First Name" onChange={(e) => onFormChange("firstname", e.target.value)} value={formData['firstname'] || ''}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="exampleLastName"
                                                placeholder="Last Name" onChange={(e) => onFormChange("lastname", e.target.value)} value={formData['lastname'] || ''}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail"
                                            placeholder="Email Address" onChange={(e) => onFormChange("email", e.target.value)} value={formData['email'] || ''}/>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input type="password" className="form-control"
                                                id="exampleInputPassword" placeholder="Password" onChange={(e) => onFormChange("password", e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" aria-label="Default select example" defaultValue={"Employee"}  onChange={(e) => onFormChange("role", e.target.value)}>
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                        </select>
                                    </div>
                                    <button type='submit' className="btn btn-primary btn-block">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser