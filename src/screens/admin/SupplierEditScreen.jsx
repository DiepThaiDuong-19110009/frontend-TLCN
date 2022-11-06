import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listSuppllierDetails, updateSupplier } from '../../actions/supplierActions'
import { SUPPLIER_UPDATE_RESET } from '../../constants/supplierConstants'

const SupplierEditScreen = () => {
    const [name, setName] = useState('')

    const supplierId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { loading, error, supplier } = useSelector(state => state.supllierDetail)
    console.log('==', supplierId)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.supplierUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SUPPLIER_UPDATE_RESET })
            navigate('/admin/supplierlist')
            window.location.reload()
        } else {
            if (!supplier.name || supplier._id !== supplierId) {
                dispatch(listSuppllierDetails(supplierId))
            } else {
                setName(supplier.name)
            }
        }
    }, [dispatch, navigate, supplierId, supplier, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSupplier({_id: supplierId, name}))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Link to='/admin/supplierlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h3 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin nhà cung cấp</h3>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='productname'>
                                <Form.Label>Tên nhà cung cấp</Form.Label>
                                <Form.Control className='mb-3' type='name' placeholder='Nhập tên nhà cung cấp' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-center py-3'>
                                <Button type='submit' variant='primary'>Cập nhật</Button>
                            </Form.Group>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default SupplierEditScreen