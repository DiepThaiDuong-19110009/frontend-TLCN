import { React, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listCategory } from '../../actions/productActions'

const CategoryListScreen = () => {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList
    // console.log('==', categories)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete

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

    const createCategoryHandler =()=>{
        
    }

    //Delete user
    const deleteHandler = (categoryId) => {
        // if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
        //     dispatch(deleteUser(userId))
        // }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Danh sách danh mục sản phẩm</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button className='my-3' onClick={createCategoryHandler}>
                        <i className='fas fa-plus'></i> Thêm danh mục
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>ID</th>
                                <th className='text-center'>Tên danh mục sản phẩm</th>
                                <th className='text-center'>Ngày tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.reverse().map(categories => (
                                <tr key={categories._id}>
                                    <td className='text-center'>{categories._id}</td>
                                    <td>{categories.name}</td>
                                    <td className='text-center'>{categories.createdAt}</td>
                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/user/${categories._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(categories._id)}>
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