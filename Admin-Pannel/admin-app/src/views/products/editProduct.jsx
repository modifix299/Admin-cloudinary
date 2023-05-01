import { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, updateProduct, reset } from '../../features/product/productSlice'
import { toast } from 'react-toastify';

const EditProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
  

    const {product, isUpdated , isError, message } = useSelector(
        (state) => state.product
    )


    function onFormChange(key, value) {
        setFormData({ ...formData, [key]: value })
    }

    function onFormSumbit(e) {
        e.preventDefault();

        let submitFormData = { ...formData, 'id': id}
        console.log(submitFormData);
        
        dispatch(updateProduct(submitFormData));
    }  
 
    useEffect(() => {
        if(id){
            dispatch(getProduct(id));
        }

        if (isError) {
            toast.error(message)
        }
    
        if (isUpdated) {
            toast.success('Updated Successfully.')
            dispatch(reset());
            navigate('/admin/products')
        }

        dispatch(reset());
    }, [navigate, dispatch,id, isUpdated, isError, message])

    useEffect(() => {
        if(product){
            setFormData(product);
        }
    }, [product])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit Product</h1>
                <Link to="/admin/products" relative='pa' className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm">
                    <i className="fas fa-arrow-left fa-sm "></i> Back 
                </Link>
            </div>

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                                <form className="product" onSubmit={onFormSumbit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="number" className="form-control" id="exampleQuantity"
                                                placeholder="Quantity" onChange={(e) => onFormChange("quantity", e.target.value)} value={formData['quantity'] || ''}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="number" step="100" className="form-control" id="examplePrice"
                                                placeholder="Price" onChange={(e) => onFormChange("price", e.target.value)} value={formData['price'] || ''}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleProductName"
                                            placeholder="Product Name" onChange={(e) => onFormChange("productname", e.target.value)} value={formData['productname'] || ''}/>
                                    </div>
                                    {/* <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input type="password" className="form-control"
                                                id="exampleInputPassword" placeholder="Password" onChange={(e) => onFormChange("password", e.target.value)}/>
                                        </div>
                                    </div> */}
                                    {/* <div className="form-group">
                                        <select className="form-control" aria-label="Default select example" defaultValue={"Employee"}  onChange={(e) => onFormChange("role", e.target.value)}>
                                            <option value="Admin">Pending</option>
                                            <option value="Employee">Confirmed</option>
                                        </select>
                                    </div> */}
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

export default EditProduct