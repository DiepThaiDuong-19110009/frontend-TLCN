import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct, listCategory } from '../../actions/productActions'
import { listSupplier } from '../../actions/supplierActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'

const ProductEditScreen = () => {
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [nameSupplier, setNameSupllier] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [nameCategory, setNameCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [sold, setSold] = useState(0)

    const productId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categoryList)
    // console.log('==', categories)

    const { suppliers } = useSelector(state => state.supplierList)
    // console.log('==', suppliers)

    const { error, product } = useSelector(state => state.productDetails)
    // console.log('==', product)

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    // Get ID Category
    let arrGetCateId = []
    const getCategoryId = () => {
        categories.forEach(cate => {
            if (nameCategory === cate.name) {
                arrGetCateId.push(cate._id)
            }
        })
    }

    getCategoryId()
    let category = arrGetCateId[0]
    // console.log('==', category);

    // Get ID Supplier
    let arrGetSupplierId = []
    const getSupplierId = () => {
        suppliers.forEach(supplier => {
            if (nameSupplier === supplier.name) {
                arrGetSupplierId.push(supplier._id)
            }
        })
    }

    getSupplierId()
    let supplier = arrGetSupplierId[0]
    console.log('==', supplier);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
            window.location.reload()
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                dispatch(listCategory())
                dispatch(listSupplier())
            } else {
                setPhoto(product.photo)
                setName(product.name)
                // setNameSupllier(product.supplier._id)
                setDescription(product.description)
                setPrice(product.price)
                setNameCategory(product.category.name)
                setQuantity(product.quantity)
                setSold(product.sold)
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, photo, name, supplier, description, price, category, quantity, sold }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h1 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin sản phẩm</h1>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='productimage'>
                                <Form.Label>Hình ảnh sản phẩm</Form.Label>
                                <Form.Control className='mb-3' type='name' placeholder='Đường dẫn file ảnh' value={photo} onChange={(e) => setPhoto(e.target.value)}></Form.Control>
                                <div className='d-flex justify-content-center'>
                                    <Zoom>
                                        <img className='shadow p-3 mb-5 bg-white rounded' style={{ width: '40%' }} src={photo} alt={name} />
                                    </Zoom>
                                </div>
                            </Form.Group>
                            <Form.Group controlId='productname'>
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control className='mb-3' type='name' placeholder='Nhập tên sản phẩm' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='productsupplier'>
                                <Form.Label>Nhà cung cấp</Form.Label>
                                <Form.Select className='mb-3' size="sm" value={nameSupplier} onChange={(e) => setNameSupllier(e.target.value)}>
                                    {suppliers.map(supplier => (
                                        <option>{supplier.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='productdescription'>
                                <Form.Label>Mô tả sản phẩm</Form.Label>
                                <Form.Control className='mb-3' as="textarea" rows={5} placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='productprice'>
                                <Form.Label>Giá sản phẩm</Form.Label>
                                <Form.Control className='mb-3' type='number' placeholder='Nhập giá sản phẩm' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='productcategory'>
                                <Form.Label>Danh mục sản phẩm</Form.Label>
                                <Form.Select className='mb-3' size="sm" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)}>
                                    {categories.map(cate => (
                                        <option>{cate.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='productquatity'>
                                <Form.Label>Số lượng sản phẩm</Form.Label>
                                <Form.Control className='mb-3' type='number' placeholder='Nhập số lượng sản phẩm' value={quantity} onChange={(e) => setQuantity(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='productsold'>
                                <Form.Label>Số lượng sản phẩm đã bán</Form.Label>
                                <Form.Control className='mb-3' type='number' placeholder='Nhập số lượng sản phẩm đã bán' value={sold} onChange={(e) => setSold(e.target.value)}></Form.Control>
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

export default ProductEditScreen