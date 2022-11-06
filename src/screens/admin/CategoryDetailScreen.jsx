import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../../actions/productActions'
import { CATEGORY_UPDATE_RESET } from '../../constants/productConstants'

const CategoryEditAdminScreen = () => {
    const [name, setName] = useState('')

    const categoryId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { loading, error, category } = useSelector(state => state.categoryDetails)
    console.log('==', category)


    useEffect(() => {
        dispatch(listCategoryDetails(categoryId))
    }, [dispatch, categoryId])

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Link to='/admin/categorylist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h3 className='d-flex justify-content-center py-3'>Chi tiết thông tin danh mục sản phẩm</h3>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <h1>{category.name}</h1>
                    )}
            </FormContainer>
        </div>
    )
}

export default CategoryEditAdminScreen