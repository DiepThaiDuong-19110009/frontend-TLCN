import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Card, Row, Col } from 'react-bootstrap'
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
    const [importQuantity, setImportQuantity] = useState('')
    const [importPrice, setImportPrice] = useState('')
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
                setNameSupllier(product.supplier?.id?.name)
                setImportQuantity(product.supplier?.quantityImport)
                setImportPrice(product.supplier?.price)
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
        dispatch(updateProduct({ _id: productId, photo, name, supplier: { id: supplier, quantityImport: importQuantity, price: importPrice }, description, price, category, quantity, sold }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin sản phẩm</h5>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID sản phẩm</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{product._id}</p>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
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
                                    <Form.Group controlId='productamountsupplier'>
                                        <Form.Label>Số lượng nhập</Form.Label>
                                        <Form.Control className='mb-3' type='number' min="1" placeholder='Nhập giá sản phẩm' value={importQuantity} onChange={(e) => setImportQuantity(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='productpricesupplier'>
                                        <Form.Label>Giá nhập</Form.Label>
                                        <Form.Control className='mb-3' type='number' min="1" placeholder='Nhập giá sản phẩm' value={importPrice} onChange={(e) => setImportPrice(e.target.value)}></Form.Control>
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
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen