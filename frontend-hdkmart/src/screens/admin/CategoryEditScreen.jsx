import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
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

    const { loading, error, category } = useSelector(state => state.categoryDetails)
    // console.log('==', product)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.categoryUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            navigate('/admin/categorylist')
            window.location.reload()
        } else {
            if (!category.name || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
            }
        }
    }, [dispatch, navigate, categoryId, category, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory({_id: categoryId, name}))
    }

    return (
        <>
            <Link to='/admin/categorylist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h1 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin danh mục sản phẩm</h1>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='productname'>
                                <Form.Label>Tên danh mục sản phẩm</Form.Label>
                                <Form.Control className='mb-3' type='name' placeholder='Nhập tên danh mục sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-center py-3'>
                                <Button type='submit' variant='primary'>Cập nhật</Button>
                            </Form.Group>
                        </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default CategoryEditScreen