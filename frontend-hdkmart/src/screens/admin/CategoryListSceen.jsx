import { React, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { createCategory, deleteCategory, listCategory } from '../../actions/productActions'

const CategoryListScreen = () => {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList
    // console.log('==', categories)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate();

    useEffect(() => {
        //dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.user.isAdmin) {
            navigate('/login')
        }
        // if (successCreate) {
        //     navigate(`/admin/productlist`)
        // } 
        else {
            dispatch(listCategory())
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, userInfo])

    const createCategoryHandler = () => {
        dispatch(createCategory())
        window.location.reload()
    }

    //Delete user
    const deleteHandler = (categoryId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục sản phẩm này không?')) {
            dispatch(deleteCategory(categoryId))
            window.location.reload()
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h1>Danh sách danh mục sản phẩm</h1>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {categories.length} danh mục</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button style={{background: 'green', border: 'none'}} className='my-3' onClick={createCategoryHandler}>
                        <i className='fas fa-plus'></i> Thêm danh mục
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Tên danh mục sản phẩm</th>
                                <th className='text-center'>Ngày tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.reverse().map((category, index) => (
                                <tr key={category._id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td className='text-center'>{category.createdAt.slice(0, 10)}</td>
                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default CategoryListScreen