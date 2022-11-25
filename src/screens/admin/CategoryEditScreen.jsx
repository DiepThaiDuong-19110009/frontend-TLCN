import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row,Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../../actions/productActions'
import { CATEGORY_UPDATE_RESET } from '../../constants/productConstants'

const CategoryEditScreen = () => {
    const [name, setName] = useState('')

    const categoryId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { error, category } = useSelector(state => state.categoryDetails)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.categoryUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            navigate('/admin/categorylist')
            window.location.reload()
        } else {
            if (!category?.name || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
            }
        }
    }, [dispatch, navigate, categoryId, category, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory({ _id: categoryId, name }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/categorylist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay lại</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin danh mục sản phẩm</h5>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID danh mục</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{category._id}</p>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='productname'>
                                            <Form.Label>Tên danh mục sản phẩm</Form.Label>
                                            <Form.Control className='mb-3' type='name' placeholder='Nhập tên danh mục sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group className='d-flex justify-content-center py-3'>
                                            <Button type='submit' variant='primary'>Cập nhật</Button>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default CategoryEditScreen
